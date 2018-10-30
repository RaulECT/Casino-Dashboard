import React from 'react'

import {
  Card,
  Icon
} from 'antd'

import Aux from '../Aux'

const {Meta} = Card

const cardboardCard = props => {
  const cardboardImg = props.cardboard ? props.cardboard : <img style={ { height: '28rem' } } alt="example" src="/static/assets/placeholder.png" />

  return(
    <Card
      hoverable
      style={{ width: '100%' }}
      cover={ cardboardImg }
      actions={[
        <Aux>
          <Icon style={ { marginRight: '0.5rem' } } type="printer" /> 
          <span>Imprimir</span>
        </Aux>, 
        <Aux>
          <Icon style={ { marginRight: '0.5rem' } } type="delete" /> 
          <span onClick={props.onDelete}>Borrar</span>
        </Aux>, 
      ]}
    >
      <Meta
        title="Carton #123456"
      />
    </Card>
  )
}

export default cardboardCard