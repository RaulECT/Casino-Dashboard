import React, {Fragment} from 'react'

import './CardboardsRegisteredHeader.css'
import CardboardLabel from '../CardboardLabel/CardboardLabel'

const cardboardsRegisteredHeader = props => {

  return(
    <div className="cardboards-registered__header">
      <h1>¡Lotería Bingo!</h1>

      <div className="cardboards-registered__description">
        <h2>Cartones Registrados</h2>
        
        <div className="cardboards-registered__info">
          <CardboardLabel type="singleLine" />
          <CardboardLabel type="doubleLine" />
          <CardboardLabel type="tripleLine" />
        </div>
      </div>
    </div>
  )
}

export default cardboardsRegisteredHeader