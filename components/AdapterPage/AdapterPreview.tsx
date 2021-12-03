import React, { useState } from 'react'
import styled from 'styled-components'
import type { Adapter } from '@cryptostats/sdk'
import QueryForm from './QueryForm'


const AttributeContainer = styled.div`
  margin: 2px 0;
`

const Name = styled.div`
  font-size: 12px;
  color: #7b7b7b;
`

const Value = styled.div`
  font-size: 16px;
  color: #000000;
`;

// TODO: use existing Attribute component with dark/bright colors
const Attribute: React.FC<{ name: string }> = ({ name, children }) => {
  return (
    <AttributeContainer>
      <Name>{name}</Name>
      <Value>{children}</Value>
    </AttributeContainer>
  )
}

const AdapterTitle = styled.div`
  border: solid 1px #ddd;
  background: white;
  height: 42px;
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    background: #eee;
  }
`

const AdapterIcon = styled.div`
  width: 30px;
  height: 30px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  margin: 0 4px;
`

const Row = styled.div`
  display: flex;
  border: solid 1px #ddd;
  background: #ffffff;
  border-top: none;
`

const Col = styled.div`
  flex: 1 0 0;
  overflow: hidden;
  border-left: solid 1px #dddddd;
  padding: 24px;

  &:first-child {
    border-left: none;
  }
`

const Icon = styled.img`
  max-width: 50px;
  max-height: 50px;
`

const Pre = styled.pre`
  white-space: pre-wrap;
  font-size: 14px;
  margin: 4px 0 10px;
`

interface AdapterPreviewProps {
  details: any
  adapter: Adapter | null
  openByDefault?: boolean
}

const AdapterPreview: React.FC<AdapterPreviewProps> = ({ details, adapter, openByDefault }) => {
  const [open, setOpen] = useState(!!openByDefault)

  const title = details.metadata.name
    ? `${details.metadata.name}${details.metadata.subtitle ? ' - ' + details.metadata.subtitle : ''} (${details.id})`
    : details.id

  return (
    <div>
      <AdapterTitle onClick={() => setOpen(!open)}>
        <AdapterIcon style={{ backgroundImage: `url('${details.metadata.icon}')` }} />
        <div>{title}</div>
      </AdapterTitle>
      {open && (
        <Row>
          <Col>
            <div>Metadata</div>

            {Object.entries(details.metadata).map(([key, val]: [string, any]) => (
              <Attribute name={key} key={key}>
                {val.indexOf('data:') === 0 ? (
                  <div>
                    <Icon src={val} />
                  </div>
                ) : (
                  <Pre>{JSON.stringify(val, null, 2)}</Pre>
                )}
              </Attribute>
            ))}
          </Col>

          <Col>
            <div>Queries</div>
            {adapter && Object.entries(adapter.queries).map(([id, fn]: [string, any], _id: number, list: any[]) => {
              return (
                <QueryForm key={id} id={id} fn={fn} openByDefault={list.length === 1}/>
              )
            })}
          </Col>
        </Row>
      )}
    </div>
  )
}

export default AdapterPreview