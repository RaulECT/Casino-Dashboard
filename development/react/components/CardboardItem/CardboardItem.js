import React from 'react'

import './CardboardItem.css'

const cardboardItem = props => {
  const classes = [ 'cardboard-item' ]

  switch ( props.type ) {
    case 'SINGLE':
      classes.push( 'cardboard-item__single' )
      break;
    
    case 'DOUBLE':
      classes.push( 'cardboard-item__double' )
      break;
    
    case 'TRIPLE':
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