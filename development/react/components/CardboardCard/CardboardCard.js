import React from 'react'

import {
  Card,
  Icon
} from 'antd'

import Aux from '../Aux'

const {Meta} = Card

const cardboardCard = props => {

  return(
    <Card
      hoverable
      style={{ width: '100%' }}
      cover={<img style={ { height: '30rem' } } alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
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