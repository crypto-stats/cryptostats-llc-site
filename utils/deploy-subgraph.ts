import { ContractEvent, DEFAULT_MAPPING, SubgraphData } from 'hooks/local-subgraphs'
import { generateLibrariesForSubgraph } from './graph-file-generator'
import Hash from 'ipfs-only-hash'
import { templates as templateContracts } from 'resources/subgraph-templates'

export enum STATUS {
  INITIALIZING,
  COMPILING,
  IPFS_UPLOAD,
  DEPLOYING,
  COMPLETE,
  ERROR,
}

async function uploadToIPFS(file: string | Uint8Array, name: string) {
  const body =
    file instanceof Uint8Array
      ? {
          file: Buffer.from(file).toString('base64'),
          encoding: 'base64',
          name,
        }
      : { file, name }

  const req = await fetch('/api/graph/upload-file', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const json = await req.json()

  if (!json.success) {
    throw new Error(json.error)
  }
  return json.cid
}

export async function compileAs(file: string, libraries: { [name: string]: string }) {
  const req = await fetch('/api/graph/compile-as', {
    method: 'POST',
    body: JSON.stringify({ file, libraries }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const json = await req.json()

  if (!json.success) {
    throw new Error(json.error)
  }

  const bytecode = Buffer.from(json.bytecode, 'base64')

  return bytecode
}

async function deployHosted(
  node: string,
  name: string,
  cid: string,
  deployKey: string,
  version_label?: string | null
) {
  const params: any = { name, ipfs_hash: cid }
  if (version_label) {
    params.version_label = version_label
  }

  const req = await fetch(node, {
    method: 'POST',
    body: JSON.stringify({
      jsonrpc: '2.0',
      method: 'subgraph_deploy',
      params,
      id: 2,
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + deployKey,
    },
  })

  const json = await req.json()
  if (json.error) {
    throw new Error(`Subgraph deploy failed: ${json.error.message || JSON.stringify(json.error)}`)
  }
  return json.result
}

export interface DeployStatus {
  status: STATUS
  file?: string
  url?: string
  errorMessage?: string
}

interface DeployOptions {
  node: string
  subgraphName: string
  deployKey: string
  hideVersion?: boolean
}

export interface DeployFile {
  title: string
  filename: string
  value: string | Uint8Array
  cid: string
}

const getCID = (value: string | Buffer): Promise<string> => {
  const buffer: Buffer = typeof value === 'string' ? Buffer.from(value) : value
  return Hash.of(buffer)
}

export async function prepareSubgraphDeploymentFiles(subgraph: SubgraphData) {
  const files: DeployFile[] = []

  const yaml = await import('js-yaml')
  // @ts-ignore
  const { default: ABI } = await import('@graphprotocol/graph-cli/src/protocols/ethereum/abi')
  const immutable = await import('immutable')

  const getGraphEvent = (abi: any[], signature: string) => {
    for (const item of abi) {
      if (item.type === 'event') {
        const params = item.inputs.map(
          (ei: any) => `${ei.indexed ? 'indexed ' : ''}${ei.type} ${ei.name}`
        )
        const longSignature = `${item.name}(${params.join(', ')})`

        if (longSignature === signature) {
          return ABI.eventSignature(immutable.fromJS(item))
        }
      }
    }
    throw new Error(`Couldn't find event ${signature} in ABI`)
  }

  const libraries = await generateLibrariesForSubgraph(subgraph)

  const compiled = await compileAs(subgraph.mappings[DEFAULT_MAPPING], libraries)

  const mappingCid = await getCID(compiled)

  files.push({
    title: 'Mapping',
    filename: 'mapping.wasm',
    value: compiled,
    cid: mappingCid,
  })

  const sourceCid = await getCID(subgraph.mappings[DEFAULT_MAPPING])

  files.push({
    title: 'Mapping - mapping.ts',
    filename: 'mapping.ts',
    value: subgraph.mappings[DEFAULT_MAPPING],
    cid: sourceCid,
  })

  const dataSources: any[] = []
  const templates: any[] = []

  // Currently, all ABIs are available to all data sources, so we generate
  // one single array that's added to all sources
  const abis: { name: string; file: { '/': string } }[] = []

  const allContracts = [
    ...subgraph.contracts,
    ...(subgraph.templates || [])
      .map(templateId => templateContracts.find(contract => contract.id === templateId))
      .filter(contract => !!contract)
      .map(template => ({
        abi: template!.abi,
        name: template!.name || template!.id,
        isTemplate: true,
        events: [],
        addresses: {} as { [chainId: string]: string },
        startBlocks: {} as { [chainId: string]: string },
      })),
  ]

  for (const contract of allContracts) {
    const abiString = JSON.stringify(contract.abi)
    const cid = await getCID(abiString)

    abis.push({
      file: {
        '/': `/ipfs/${cid}`,
      },
      name: contract.name,
    })

    files.push({
      title: contract.name,
      filename: `${contract.name}.json`,
      value: abiString,
      cid,
    })

    const contractManifest: any = {
      kind: 'ethereum/contract',
      name: contract.name,
      network: 'mainnet',
      source: {
        abi: contract.name,
      },
      mapping: {
        abis,
        apiVersion: '0.0.7',
        entities: ['Pair'],
        eventHandlers: contract.events.map((event: ContractEvent) => ({
          event: getGraphEvent(contract.abi, event.signature),
          handler: event.handler,
          receipt: !!event.receipt,
        })),
        file: {
          '/': `/ipfs/${mappingCid}`,
        },
        kind: 'ethereum/events',
        language: 'wasm/assemblyscript',
      },
    }

    if (contract.isTemplate) {
      templates.push(contractManifest)
    } else {
      contractManifest.source.address = contract.addresses['1']
      contractManifest.source.startBlock = contract.startBlocks['1']
      dataSources.push(contractManifest)
    }
  }

  const schemaCid = await getCID(subgraph.schema)

  files.push({
    title: 'Schema',
    filename: 'schema.graphql',
    value: subgraph.schema,
    cid: schemaCid,
  })

  const manifestString = yaml.dump(
    {
      specVersion: '0.0.5',
      description: 'Test description',
      dataSources,
      templates,
      schema: {
        file: {
          '/': `/ipfs/${schemaCid}`,
        },
      },
      sourceCode: [
        {
          name: 'mapping.ts',
          file: `/ipfs/${mappingCid}`,
          source: `/ipfs/${sourceCid}`,
        },
      ],
    },
    {
      noRefs: true,
    }
  )

  files.push({
    title: 'Manifest',
    filename: 'manifest.yaml',
    value: manifestString,
    cid: await getCID(manifestString),
  })

  return files
}

export async function deployPreparedSubgraph(
  subgraph: SubgraphData,
  files: DeployFile[],
  options: DeployOptions
) {
  let manifestCid: string | null = null
  for (const file of files) {
    const cid = await uploadToIPFS(file.value, file.filename)
    if (cid !== file.cid) {
      throw new Error(
        `Uploaded CID ${cid} didn't match expected CID ${file.cid} for ${file.filename}`
      )
    }
    if (file.filename === 'manifest.yaml') {
      manifestCid = cid
    }
  }

  if (!manifestCid) {
    throw new Error('No manifest found in files')
  }

  const deployResult = await deployHosted(
    options.node,
    options.subgraphName,
    manifestCid,
    options.deployKey,
    options.hideVersion ? null : subgraph.version
  )
  return { version: subgraph.version, manifestCid, result: deployResult }
}
