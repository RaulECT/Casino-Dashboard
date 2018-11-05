import React from 'react'

import {
  Collapse,
  Tag,
  Button
} from 'antd'

const { Panel } = Collapse

const validateList = props => {
  const isDissabled = props.cardboardsToValidate.length === 0
  const cardboardsToValidateTags = props.cardboardsToValidate.map( ( cardboard, index ) => 
    <Tag key={`${cardboard}_${index}_toV`} closable afterClose={ () => props.onRemoveCardboard( cardboard ) }> { `Cartón No. ${cardboard}` } </Tag> 
  )
  const cardboardsValidatedTags = props.cardboardsValidated.map( ( cardboard, index ) => 
    <Tag key={`${cardboard}_${index}_V`} color="green">{`Cartón No. ${cardboard}`}</Tag>
  )

  return (
    <Collapse bordered={false} defaultActiveKey={ [ '1' ] }>
      <Panel header={`${props.cardboardsToValidate.length} cartón(es) para validar.`} key='1'>
        { cardboardsToValidateTags }
        <Button disabled={isDissabled} type='primary' ghost>Validar {`(${props.cardboardsToValidate.length})`} cartón(es)</Button>
      </Panel>
      
      <Panel header={`Hay ${props.cardboardsValidated.length} cartón(es) ganador(es).`} key='2'>
        { cardboardsValidatedTags }
      </Panel>
    </Collapse>
  )
}

export default validateList