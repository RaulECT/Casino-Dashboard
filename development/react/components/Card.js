import React from 'react'

import './Card.css'

const card = ( props ) => {

  const styles = {
    width: props ? props.width : '200px',
    height: props ? props.height : '400px',
   
  }

  return(
    <img 
      src={props.img} 
      alt="Bingo Card"
      style={ styles }
      className="card-item"
    />
  )
}

export default card