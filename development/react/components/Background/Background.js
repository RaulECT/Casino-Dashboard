import React from 'react'

import './Background.css'

const background = ( props ) => (
  <div className="bingo-background">
    <div className="bingo-background__panel">
      { props.children }
    </div>
  </div>
)

export default background