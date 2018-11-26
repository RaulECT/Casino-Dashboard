import React, { Component } from 'react'

import './Card.css'

class Card extends Component {
  shouldComponentUpdate( nextProps, nextState ) {

    return nextProps.img !== this.props.img
  }

  render() {
    const classes = [ 'card-item' ]
    const styles = {
      width: this.props ? this.props.width : '200px',
      height: this.props ? this.props.height : '400px',
      transform: this.props.scale ? `scale(${this.props.scale})` :  'scale(1)',
      transform: this.props.scale ? `scale(${this.props.scale})` :  'scale(1)'
    }
  
    this.props.isResponsive ? classes.push( 'card-item-responsive' ) : null
    this.props.isRecentCard ? classes.push( 'card-item--recent-card' ) : null
  
    return(
      <img 
        src={this.props.img} 
        alt="Bingo Card"
        style={ styles }
        className={ classes.join( ' ' ) }
      />
    )
  }
}

export default Card