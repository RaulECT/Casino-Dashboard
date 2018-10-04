import React from 'react'

import Background from '../components/Background/Background'
import Panel from '../components/Panel/Panel'
import GridItem from '../components/GridItem/GridItem'
import GameLabel from '../components/GameLabel/GameLabel'

const style = {
  imageBakcground: { 
    width: '100vw', 
    height: '100vh', 
    background: `url('/static/assets/background.svg')`, 
    backgroundSize: 'cover', 
    padding: '2rem 4.5rem',
    display: 'flex'
  },
  panel: {
    background: 'rgba(0, 0, 0, .20)',
    borderRadius: '9px',
    flex: '1',
    display: 'grid',
    gridAutoColumns: '1fr',
    gridTemplateColumns: '1fr 1fr',
  }
}

const t = ( props ) => (

  <Background>
    <Panel 
      opacity={.15}
      gridTemplateColumns='repeat(4, minmax(min-content, 1fr))'
      gridTemplateRows='repeat(5,min-content)'
    >
      <GridItem
        gridRow="1/2"
        gridColumn="1/-1"
        styles={ { textAlign: 'center', color: '#ffffff', fontSize: '5rem', fontWeight: 300 } }
      >
        Loteria Bingo!
      </GridItem>
      
      <GameLabel 
        gridRow="2/3"
        gridColumn="1/3"
        label="Acomulado:"
        text="$3,789"
        type="important"
      />

      <GridItem
        gridRow="2/3"
        gridColumn="3/-1"
        styles={ { textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', } }
      >
        <p style={ { marginBottom: '-0.5rem', color: '#fff', fontWeight: 300, fontSize: '2.6rem', } }>Juego #67</p>
        <p style={ { marginBottom: '-0.5rem', color: '#F1DB4B', fontWeight: 'bold', fontSize: '3rem', } }>Doble Linea</p>
        <p style={ { marginBottom: '-0.5rem', color: '#fff', fontWeight: 300, fontSize: '2.6rem', } }>200 cartones</p>
      </GridItem>

      <GameLabel 
        gridRow="3/4"
        gridColumn="1/3"
        label="Premio:"
        text="$158"
        type="regular-salmon"
      />

      <GameLabel 
        gridRow="3/4"
        gridColumn="3/-1"
        label="Turno:"
        text="17"
        type="regular-pink"
      />
      <GameLabel 
        gridRow="4/5"
        gridColumn="1/3"
        label="Bingo:"
        text="$278"
        type="regular-green"
      />

      <GameLabel 
        gridRow="5/6"
        gridColumn="1/3"
        label="Patron ganador:"
        customContent={ ( <div style={ { width: '16rem', height: '19rem', background: 'rgba(0, 0, 0, .26)' } }></div> ) }
      />

      <GameLabel 
        gridRow="4/-1"
        gridColumn="3/-1"
        label="Carta actual:"
        customContent={ ( <div style={ { width: '16rem', height: '25rem', background: `url('static/assets/cartas/Nuevas Figuras_21.svg')`, backgroundSize: 'cover' } }></div> ) }
      />
      
    </Panel>
  </Background>
)

export default t
  {/*<div style={ style.imageBakcground }>
    <div style={ style.panel}>
      <div style={{ color: 'white', fontSize: '10rem' }}>Wea 1</div>
      <div style={{ color: 'white', fontSize: '10rem' }}>Wea 2</div>
    </div>
</div>*/}

/**
 * <div style={ { fontSize: '10rem',  color: '#fff' } }>1</div>
      <div style={ { fontSize: '10rem',  color: '#fff' } }>2</div>
      <div style={ { fontSize: '10rem',  color: '#fff' } }>3</div>
      <div style={ { fontSize: '10rem',  color: '#fff' } }>4</div>
      <div style={ { fontSize: '10rem',  color: '#fff' } }>5</div>
      <div style={ { fontSize: '10rem',  color: '#fff' } }>6</div>
      <div style={ { fontSize: '10rem',  color: '#fff' } }>7</div>
      <div style={ { fontSize: '10rem',  color: '#fff' } }>8</div>
 */