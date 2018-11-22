import React from 'react'

import './CardboardItem.css'

const cardboardItem = props => {
  const classes = [ 'cardboard-item' ]

  switch ( props.type ) {
    case 'single':
      classes.push( 'cardboard-item__single' )
      break;
    
    case 'double':
      classes.push( 'cardboard-item__double' )
      break;
    
    case 'triple':
      classes.push( 'cardboard-item__triple' )
      break;
  
    default:
      classes.push( 'cardboard-item__single' )
      break;
  }

  return(
    <p className={ classes.join( ' ' ) }>{ props.children }</p>
  )
}

export default cardboardItem