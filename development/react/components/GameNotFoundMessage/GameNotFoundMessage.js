import React from 'react'
import {
  Icon
} from 'antd'

const gameNotFoundMessage = ( props ) => {
  const message = props.message ? props.message : 'No se encontró una siguiente partida, verifique que existe una partida creada.' 

  return(
    <div className="next-game__error-msg">
      <Icon className="next-game__error-icon" type="exclamation-circle" />
      <h1 style={ { color: '#fff' } } className="next-game__error-text">{message}</h1>
    </div>
  )
}

export default gameNotFoundMessage