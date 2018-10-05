import React from 'react'

const panel = ( props ) => {
  
  const styles = {
    background: `rgba(0, 0, 0, ${props.opacity ? props.opacity : 0 })`,
    display: 'grid',
    gridTemplateColumns: props.gridTemplateColumns,
    gridTemplateRows: props.gridTemplateRows,
    rowGap: props.rowGap ? props.rowGap : 0,
    columnGap: props.columnGap ? props.columnGap : 0,
    ...props.style
  }

  return(
    <div style={ styles } className={props.className}>
      { props.children }
    </div>
  )
}

export default panel