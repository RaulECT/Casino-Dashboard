import React from 'react'

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
    />
  )
}

/**
 * <img 
      src={props.img} 
      alt="Bingo Card"
      style={ { width, height } }
    />
    <div style={ styles }></div>
     background: `url('${props.img}')`,
    backgroundSize: props ? props.cover : 'contain',
 */
export default card