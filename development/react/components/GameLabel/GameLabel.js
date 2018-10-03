import React from 'react'
import GridItem from '../GridItem/GridItem'

import './GameLabel.css'

const gameLabel = props => {
  const textClasses = [ 'game-label__text' ]

  switch ( props.type ) {
    case 'important':
      textClasses.push( 'game-label__text--important' )
      break;

    case 'regular-green':
      textClasses.push( 'game-label__text--regular-green' )
      break;

    case 'regular-salmon':
      textClasses.push( 'game-label__text--regular-salmon' )
      break;

    case 'regular-pink':
      textClasses.push( 'game-label__text--regular-pink' )
      break;
  
    default:
      break;
  }

  const content = props.customContent ? props.customContent : ( <div className={ textClasses.join(' ') }>{ props.text }</div> )

  return(
    <GridItem {...props}>
      <p className="game-label__label">{ props.label }</p>
      { content }
    </GridItem>
  )
}

export default gameLabel