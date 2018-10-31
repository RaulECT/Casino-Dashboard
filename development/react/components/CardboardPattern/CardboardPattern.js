import React, { Component } from 'react'

import './CardboardPattern.css'

class CardboardPattern extends Component {

  state = {
    positions: [
      [ 0, 1, 2, 3],
      [ 4, 5, 6, 7 ],
      [ 8, 9, 10, 11 ],
      [ 12, 13, 14, 15 ],
      [ 0, 4, 8, 12 ],
      [ 1, 5, 9, 13 ],
      [ 2, 6, 10, 14 ],
      [ 3, 7, 11, 15 ],
      [ 0, 5, 10, 15 ],
      [ 3, 6, 9, 12 ],

    ],
    currentPosition: [ 0, 1, 2, 3 ],
    currentIndex: 0
  }
  interval = null

  componentDidMount() {
    const { positions } = this.state
    let patterns = [...positions]

    switch ( this.props.gameType ) {
      case 'DOBLE LINEA', 'LINEA':
        patterns = [
          ...positions,
          [ 0, 1, 2, 3, 4, 8, 12 ],
          [ 0, 1, 2, 3, 5, 9, 13 ],
          [ 0, 1, 2, 3, 6, 10, 14 ],
          [ 0, 1, 2, 3, 7, 11, 15 ],
          [ 4, 5, 6, 7, 0, 8, 12 ],
          [ 4, 5, 6, 7, 1, 9, 13 ],
          [ 4, 5, 6, 7, 2, 10, 14 ],
          [ 4, 5, 6, 7, 3, 11, 15 ],
          [ 8, 9, 10, 11, 0, 4, 12 ],
          [ 8, 9, 10, 11, 1, 5, 13 ],
          [ 8, 9, 10, 11, 2, 6, 14 ],
          [ 8, 9, 10, 11, 3, 7, 15 ],
          [ 12, 13, 14, 15, 0, 4, 8 ],
          [ 12, 13, 14, 15, 1, 5, 9 ],
          [ 12, 13, 14, 15, 2, 6, 10 ],
          [ 12, 13, 14, 15, 3, 7, 11 ],
          [ 0, 1, 2, 3, 4, 5, 6, 7 ],
          [ 8, 9, 10, 11, 12, 13, 14, 15 ],
          [ 0, 4, 8, 12, 1, 5, 9, 13 ],
          [ 2, 6, 10, 14, 3, 7, 11, 15 ],
          [ 0, 4, 8, 12, 2, 6, 10, 14 ],
          [ 0, 4, 8, 12, 3, 7, 11, 15 ],
          [ 1, 5, 9, 13, 2, 6, 10, 14 ],
          [ 1, 5, 9, 13, 3, 7, 11, 15 ],
          [ 0, 1, 2, 3, 8, 9, 10, 11 ],
          [ 0, 1, 2, 3, 12, 13, 14, 15 ],
          [ 4, 5, 6, 7, 8, 9 , 10, 11 ],
          [ 4, 5, 6, 7, 12, 13, 14, 15 ]
        ]
        break;
    
      default:
        break;
    }

    this.setState( { positions: patterns } )
    this.interval = setInterval( this.changePattern, 2500 )
  }

  componentWillUnmount() {
    clearInterval( this.interval )
  }

  changePattern = () => {
    const randomNumber = Math.floor(Math.random() * this.state.positions.length);
    this.setState( prevState => {
      const newIndex = (prevState.currentIndex + 1) < prevState.positions.length ? ( prevState.currentIndex + 1 ) : 0
      const newPosition = prevState.positions[prevState.currentIndex]

      return {
        currentPosition: newPosition,
        currentIndex: newIndex
      }
    } )
    // this.setState( { currentPosition: this.state.positions[randomNumber] } )
  }

  render() {
    const { currentPosition } = this.state

    return (
      <div style={ { height: '100%' } }>
        <svg width="100%" height="100%">
  
          <g id="Capa_2" data-name="Capa 2">
            <rect className={ currentPosition.indexOf( 0 ) !== -1 ? 'cls-1' : 'cls-2' } x="0" y="0" width="25%" height="25%"/>
            <rect className={ currentPosition.indexOf( 1 ) !== -1 ? 'cls-1' : 'cls-2' } x="25%" y="0" width="25%" height="25%"/>
            <rect className={ currentPosition.indexOf( 2 ) !== -1 ? 'cls-1' : 'cls-2' } x="50%" y="0" width="25%" height="25%"/>
            <rect className={ currentPosition.indexOf( 3 ) !== -1 ? 'cls-1' : 'cls-2' } x="75%" y="0" width="25%" height="25%"/>

            <rect className={ currentPosition.indexOf( 4 ) !== -1 ? 'cls-1' : 'cls-2' } x="0" y="25%" width="25%" height="25%"/>
            <rect className={ currentPosition.indexOf( 5 ) !== -1 ? 'cls-1' : 'cls-2' } x="25%" y="25%" width="25%" height="25%"/>
            <rect className={ currentPosition.indexOf( 6 ) !== -1 ? 'cls-1' : 'cls-2' } x="50%" y="25%" width="25%" height="25%"/>
            <rect className={ currentPosition.indexOf( 7 ) !== -1 ? 'cls-1' : 'cls-2' } x="75%" y="25%" width="25%" height="25%"/>

            <rect className={ currentPosition.indexOf( 8 ) !== -1 ? 'cls-1' : 'cls-2' } x="0" y="50%" width="25%" height="25%"/>
            <rect className={ currentPosition.indexOf( 9 ) !== -1 ? 'cls-1' : 'cls-2' } x="25%" y="50%" width="25%" height="25%"/>
            <rect className={ currentPosition.indexOf( 10 ) !== -1 ? 'cls-1' : 'cls-2' } x="50%" y="50%" width="25%" height="25%"/>
            <rect className={ currentPosition.indexOf( 11 ) !== -1 ? 'cls-1' : 'cls-2' } x="75%" y="50%" width="25%" height="25%"/>
            
            <rect className={ currentPosition.indexOf( 12 ) !== -1 ? 'cls-1' : 'cls-2' } x="0" y="75%" width="25%" height="25%"/>
            <rect className={ currentPosition.indexOf( 13 ) !== -1 ? 'cls-1' : 'cls-2' } x="25%" y="75%" width="25%" height="25%"/>
            <rect className={ currentPosition.indexOf( 14 ) !== -1 ? 'cls-1' : 'cls-2' } x="50%" y="75%" width="25%" height="25%"/>
            <rect className={ currentPosition.indexOf( 15 ) !== -1 ? 'cls-1' : 'cls-2' } x="75%" y="75%" width="25%" height="25%"/>
          </g>
        </svg>
      </div>
    )
  }

}

export default CardboardPattern