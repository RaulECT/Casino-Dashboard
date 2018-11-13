import React from 'react'

import {
  Collapse,
  Tag,
  Button, 
  Row,
  Col
} from 'antd'

const { Panel } = Collapse
const styles = {
  marginTop: '10px'
}

const validateList = props => {
  const isDissabled = props.cardboardsToValidate.length === 0
  const cardboardsToValidateTags = props.cardboardsToValidate.map( ( cardboard, index ) => 
    <Tag key={`${cardboard}_${index}_toV`} closable afterClose={ () => props.onRemoveCardboard( cardboard ) }> { `Cartón No. ${cardboard}` } </Tag> 
  )
  const cardboardsValidatedTags = props.cardboardsValidated.map( ( cardboard, index ) => 
    <Tag key={`${cardboard}_${index}_V`} color="green">{`Cartón No. ${cardboard}`}</Tag>
  )

  return (
    <Row gutter={30}>
      <Col span={12}>
        <Collapse style={styles} defaultActiveKey={ [ '1' ] }>
          <Panel header={`${props.cardboardsToValidate.length} cartón(es) para validar.`} key='1'>
            { cardboardsToValidateTags }
            <Button onClick={props.onValidateCardboards} disabled={isDissabled} type='primary' ghost>Validar {`(${props.cardboardsToValidate.length})`} cartón(es)</Button>
          </Panel>
        </Collapse>      
      </Col>
      
      <Col span={12}>
        <Collapse style={styles} defaultActiveKey={ [ '2' ] }>
          <Panel header={`Hay ${props.cardboardsValidated.length} cartón(es) ganador(es) de línea simple.`} key='2'>
            { cardboardsValidatedTags }
          </Panel>
        </Collapse>
      </Col>

    </Row>
  )
}

export default validateList