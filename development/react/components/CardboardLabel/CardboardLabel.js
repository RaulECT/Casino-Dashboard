import React from 'react'

import './CardboardLabel.css'

const cardboardLabel = props => {
  let text = ''
  let figureClass = [ 'cardboard-figure' ]

  switch ( props.type ) {
    case 'singleLine':
      text = 'Sencilla'
      figureClass.push( 'cardboard-figure__single-line')
      break;

    case 'doubleLine':
      text = 'Doble'
      figureClass.push('cardboard-figure__double-line')
      break;
    
      case 'tripleLine':
      text = 'Triple'
      figureClass.push('cardboard-figure__triple-line')
      break;
    
    default:
      text = 'Sencilla'
      figureClass.push('cardboard-figure__single-line')
      break;
  }

  return(
    <div className="cardboard-label__container">
      <div className={ figureClass.join( ' ' ) }></div>
      <p>{text}</p>
    </div>
  )
}

export default cardboardLabel