import React from 'react'

import './Background.css'

const background = ( props ) => (
  <div className="bingo-background">
    <div className={ props.grid ? 'bingo-background__panel' : 'bingo-background__panel--without-grid'}>
      { props.children }
    </div>
  </div>
)

export default background