declare class Adapter {
    readonly id: string;
    metadata: any;
    readonly bundle: string | null;
    queries: {
        [name: string]: (...params: any[]) => Promise<number>;
    };
    private cache;
    constructor(id: string, { metadata, cache, bundle }: AdapterProps);
    addQuery(type: string, query: QueryFn): void;
    query(type: string, ...input: any[]): Promise<any>;
    executeQuery(type: string, ...params: any[]): Promise<number>;
    getMetadata(): Promise<any>;
}

declare interface AdapterData {
    id: string;
    queries: any;
    metadata: any;
    bundle?: string | null;
}

declare interface AdapterProps {
    metadata: any;
    cache?: ICache | null;
    bundle?: string | null;
}

declare abstract class BaseCryptoStatsSDK {
    cache: ICache;
    readonly coinGecko: CoinGecko;
    readonly chainData: ChainData;
    readonly date: DateLib;
    readonly ethers: Ethers;
    readonly graph: Graph;
    readonly http: HTTP;
    readonly ipfs: IPFS;
    readonly plugins: Plugins;
    readonly executionTimeout: number;
    private lists;
    constructor({ ipfsGateway, cache, infuraKey, moralisKey, mongoConnectionString, redisConnectionString, executionTimeout, }?: CryptoStatsOptions);
    protected abstract setupCache(params: {
        mongoConnectionString?: string;
        redisConnectionString?: string;
    }): void;
    getList(name: string): List;
    getContext(list: List): Context;
}

declare class ChainData {
    private graph;
    private date;
    private cache;
    private blockNumLoaders;
    private promiseCache;
    constructor({ graph, date, cache }: ChainDataProps);
    getBlockNumber(date: string | number | Date, chain?: string): Promise<number>;
    private getBlockNumberInternal;
    getBlockSubgraphQuery(subgraph: string): (date: string | Date | number) => Promise<number>;
    blockSubgraphQuery(subgraph: string, date: string | Date | number): Promise<number>;
    private dateToTime;
}

declare interface ChainDataProps {
    graph: Graph;
    cache: ICache;
    date: DateLib;
}

declare class CoinGecko {
    private cache;
    private http;
    constructor({ cache, http }: CoinGeckoProps);
    getCurrentPrice(name: string, currency?: string): Promise<any>;
    getHistoricalPrice(name: string, date: string): Promise<any>;
    getHistoricalMarketData(name: string, date: string): Promise<{
        price: any;
        marketCap: any;
    }>;
    cacheMarketData(name: string, date: string, price: number, marketCap: number): Promise<void>;
    queryCoingecko(name: string, date: string, currency?: string): Promise<{
        price: any;
        marketCap: any;
    }>;
}

declare interface CoinGeckoProps {
    cache: ICache;
    http: HTTP;
}

declare class Context {
    readonly coinGecko: CoinGecko;
    readonly chainData: ChainData;
    readonly date: DateLib;
    readonly ethers: Ethers;
    readonly graph: Graph;
    readonly http: HTTP;
    readonly ipfs: IPFS;
    readonly plugins: Plugins;
    private list;
    constructor({ coinGecko, chainData, date, graph, http, ipfs, ethers, plugins, list, }: ContextProps);
    register(registration: RegistrationData): void;
    registerBundle(id: string, metadata?: any): void;
}

declare interface ContextProps {
    coinGecko: CoinGecko;
    chainData: ChainData;
    date: DateLib;
    ethers: Ethers;
    graph: Graph;
    http: HTTP;
    ipfs: IPFS;
    plugins: Plugins;
    list: List;
}

declare interface CryptoStatsOptions {
    ipfsGateway?: string;
    cache?: ICache;
    infuraKey?: string;
    moralisKey?: string;
    mongoConnectionString?: string;
    redisConnectionString?: string;
    executionTimeout?: number;
}

declare class CryptoStatsSDK extends BaseCryptoStatsSDK {
    setupCache({ mongoConnectionString, redisConnectionString }: {
        mongoConnectionString?: string;
        redisConnectionString?: string;
    }): void;
}

declare class DateLib {
    dateToTimestamp(date: string | Date): number;
    formatDate(date: Date, connector?: string): string;
    getYesterdayDate(): string;
    last7Days(date?: Date): string[];
    isBefore(date?: string, comparrison?: string): boolean;
    getDateRange(dateStart: string | Date, dateEnd: string | Date): string[];
    offsetDaysFormatted(date: string, numDays: number): string;
}

declare class Ethers {
    utils: typeof utils;
    BigNumber: typeof BigNumber;
    FixedNumber: typeof FixedNumber;
    private chainData;
    private providersByNetwork;
    constructor({ chainData }: {
        chainData: ChainData;
    });
    addProvider(name: string, url: string, { archive, }?: {
        archive?: boolean;
    }): void;
    getContract(address: string, abi: any, network?: string): ethers.Contract;
    getERC20Contract(address: string, network?: string): ethers.Contract;
    getProvider(network: string): ethers.providers.JsonRpcProvider;
}

declare class Graph {
    private http;
    constructor({ http }: GraphProps);
    query(subgraph: string, query: string, { variables, operationName, node, }?: Options): Promise<any>;
}

declare interface GraphProps {
    http: HTTP;
}

declare class HTTP {
    get(url: string, options?: any): Promise<any>;
    post(url: string, body: any, options?: any): Promise<any>;
}

declare interface ICache {
    getValue(name: string, type: string, date: string): Promise<any>;
    setValue(name: string, type: string, date: string, value: string | number): Promise<void>;
}

declare class IPFS {
    private client;
    constructor({ gateway, }?: IPFSOptions);
    getFile(cid: string | CID): Promise<string>;
    getDataURI(cid: string | CID, mimeType: string): Promise<string>;
    getDataURILoader(cid: string | CID, mimeType: string): IPFSLoader;
}

declare interface IPFSLoader {
    (): Promise<string>;
    cid: string;
    mimeType: string;
}

declare interface IPFSOptions {
    gateway?: string;
}

declare class List {
    readonly name: string;
    readonly adapters: Adapter[];
    readonly bundleIds: string[];
    private adaptersById;
    private sdk?;
    private adaptersFetched;
    getBundle(id: string): Promise<{
        [x: string]: any;
    }>;
    getBundles(): Promise<{
        [x: string]: any;
    }[]>;
    constructor(name: string, sdk?: BaseCryptoStatsSDK);
    addAdapter({ id, queries, metadata, bundle }: AdapterData): Adapter;
    addBundle(id: string, metadata?: any): void;
    getAdapters(): Adapter[];
    getAdapter(id: string): Adapter;
    getIDs(): string[];
    executeQuery(type: string, ...params: any[]): Promise<{
        id: string;
        bundle: string | null;
        result: any;
    }[]>;
    executeQueryWithMetadata(type: string, ...params: any[]): Promise<{
        id: string;
        bundle: string | null;
        result: any;
        metadata: any;
    }[]>;
    executeQueriesWithMetadata(types: string[], ...params: any[]): Promise<{
        id: string;
        results: {
            [type: string]: any;
        };
        metadata: any;
        bundle: string | null;
    }[]>;
    fetchAdapters(): Promise<Module[] | undefined>;
    addAdaptersWithCode(code: string): Module;
    addAdaptersWithSetupFunction(setupFn: SetupFn): Module;
}

declare class Module {
    name: string | null;
    version: string | null;
    license: string | null;
    sourceFile: string | null;
    private code;
    private setupFn;
    private context;
    private executionTimeout;
    constructor({ code, setupFn, context, name, version, license, sourceFile, executionTimeout }: ModuleProps);
    evaluate(): void;
    setup(): void;
}

declare interface ModuleProps {
    code?: string;
    setupFn?: SetupFn;
    context: Context;
    name?: string;
    version?: string;
    license?: string;
    sourceFile?: string;
    executionTimeout?: number;
}

declare interface Options {
    variables?: any;
    operationName?: string;
    node?: string;
}

declare class Plugins {
    private _plugins;
    addPlugin(name: string, plugin: any): void;
    getPlugin<T = any>(name: string): T;
}

declare type QueryFn<Output = any, Input = any> = (...params: Input[]) => Promise<Output>;

declare interface RegistrationData {
    id: string;
    bundle?: string;
    queries: {
        [name: string]: (date: string) => Promise<any>;
    };
    metadata: any;
}
