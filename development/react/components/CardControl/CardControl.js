import React from 'react'
import {Card} from 'antd'

const {Meta} = Card

const cardControl = props => {

  return (
    <Card
      style={ { width: '25rem' } }
      cover={ props.card }
      actions={ props.actions }
    >
      <Meta 
        title={ `Turno No. ${props.turn}`}
      />
    </Card>
  )
}

export default cardControl