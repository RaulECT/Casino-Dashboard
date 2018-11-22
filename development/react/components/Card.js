import React from 'react'

import './Card.css'

const card = ( props ) => {

  const classes = [ 'card-item' ]
  const styles = {
    width: props ? props.width : '200px',
    height: props ? props.height : '400px',
  }

  props.isResponsive ? classes.push( 'card-item-responsive' ) : null
  props.isRecentCard ? classes.push( 'card-item--recent-card' ) : null

  return(
    <img 
      src={props.img} 
      alt="Bingo Card"
      style={ styles }
      className={ classes.join( ' ' ) }
    />
  )
}

export default card