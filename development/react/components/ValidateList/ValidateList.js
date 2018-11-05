import React from 'react'

import {
  Collapse,
  Tag
} from 'antd'

const { Panel } = Collapse

const validateList = props => {
  const cardboardsToValidate = [ ...props.cardboardsToValidate ]
  const cardboardsToValidateTags = cardboardsToValidate.map( ( cardboard, index ) => 
    <Tag key={`${cardboard}_${index}`} closable afterClose={ () => console.log(cardboard) }> { `Cartón No. ${cardboard}` } </Tag> 
  )

  return (
    <Collapse bordered={false} defaultActiveKey={ [ '1' ] }>
      <Panel header={`${cardboardsToValidate.length} cartón(es) para validar.`} key='1'>
        { cardboardsToValidateTags }
      </Panel>
      
      <Panel header='Hey i`am a header 2' key='2'>
        
      </Panel>
    </Collapse>
  )
}

export default validateList