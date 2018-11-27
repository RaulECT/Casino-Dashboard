import React, { Fragment, Component } from 'react'

import {
  Card,
  Icon
} from 'antd'

const {Meta} = Card

class CardboardCard extends Component {

  shouldComponentUpdate( nextProps ) {
    if ( nextProps.cardboard !== null && this.props.cardboard !== null ) {
      return nextProps.cardboard.barcode !== this.props.cardboard.barcode   
    } else {
      return true
    }
  }

  render() {
    const cardboardImg = this.props.cardboardImg ?  this.props.cardboardImg : <img style={ { height: '28rem' } } alt="example" src="/static/assets/placeholder.png" />
    const actions = this.props.cardboard ? [
      <Fragment>
        <Icon style={ { marginRight: '0.5rem' } } type="printer" /> 
        <span onClick={this.props.onPrint}>Imprimir</span>
      </Fragment>, 
      <Fragment>
        <Icon style={ { marginRight: '0.5rem' } } type="delete" /> 
        <span onClick={this.props.onDelete}>Borrar</span>
      </Fragment>, 
    ] : null
  
    return(
      <Card
        hoverable
        style={{ width: '100%' }}
        cover={ cardboardImg }
        actions={ actions }
      >
        <Meta
          title={`Cartón #${this.props.cardboard ? this.props.cardboard.numcode : '0'}`}
        />
      </Card>
    )
  }
}

export default CardboardCard