import React from 'react'

import {
  Card,
  Icon
} from 'antd'

import Aux from '../Aux'

const {Meta} = Card

const cardboardCard = props => {
  const cardboardImg = props.cardboardImg ? props.cardboardImg : <img style={ { height: '28rem' } } alt="example" src="/static/assets/placeholder.png" />
  const actions = props.cardboard ? [
    <Aux>
      <Icon style={ { marginRight: '0.5rem' } } type="printer" /> 
      <span>Imprimir</span>
    </Aux>, 
    <Aux>
      <Icon style={ { marginRight: '0.5rem' } } type="delete" /> 
      <span onClick={props.onDelete}>Borrar</span>
    </Aux>, 
  ] : null

  return(
    <Card
      hoverable
      style={{ width: '100%' }}
      cover={ cardboardImg }
      actions={ actions }
    >
      <Meta
        title={`Cartón #${props.cardboard ? props.cardboard.numcode : '0'}`}
      />
    </Card>
  )
}

export default cardboardCard