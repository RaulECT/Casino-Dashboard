import React from 'react'

import './Background.css'

const background = ( props ) => {
  
  let style

  switch ( props.display ) {
    case 'flexRow':
      style = { display: 'flex', flexDirection: 'row' }
      break;

    case 'flexColumn':
      style = { display: 'flex', flexDirection: 'column' }
      break;

    case 'flex':
      style = { display: 'flex' }
      break
  
    default:
      style = {}
      break;
  } 

  return (
    <div className="bingo-background">
      <div style={style} className={ props.grid ? 'bingo-background__panel' : 'bingo-background__panel--without-grid'}>
        { props.children }
      </div>
    </div>
  )
}

export default background