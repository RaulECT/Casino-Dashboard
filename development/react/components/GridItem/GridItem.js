import React from 'react'

const gridItem = ( props ) => {
  const styles = {
    gridRow: props.gridRow,
    gridColumn: props.gridColumn,
    ...props.styles
  }

  return (
    <div style={ styles } {...props}>
      { props.children }
    </div>
  )
}

export default gridItem