import React from 'react'

const panel = ( props ) => {
  
  const styles = {
    background: `rgba(0, 0, 0, ${props.opacity ? props.opacity : 0 })`,
    display: 'grid',
    gridTemplateColumns: props.gridTemplateColumns,
    gridTemplateRows: props.gridTemplateRows
  }

  return(
    <div style={ styles }>
      { props.children }
    </div>
  )
}

export default panel