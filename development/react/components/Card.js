import React from 'react'

const card = ( props ) => {
  const width = props ? props.width : '200px'
  const height = props ? props.height : '400px'

  return(
    <img 
      src={props.img} 
      alt="Bingo Card"
      style={ { width, height } }
    />
  )
}

export default card