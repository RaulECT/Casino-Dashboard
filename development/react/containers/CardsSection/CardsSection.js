import React, {Component} from 'react'
import { connect } from 'react-redux'
import { setGameHistory } from '../../store/actions/index'
import { socket } from '../../../socket'
import { cardList } from '../../store/reducers/cards'

import './CardsSection.css'
import Background from '../../components/Background/Background'
import Card from '../../components/Card'

class CardsSection extends Component {

  componentDidMount() {
    socket.on( 'BINGO_CONECTED', ( data ) => {
      this.props.onSetGameHistory( data.gameHistory )
    } )

    socket.on( 'DRAW_CARD', ( data ) => {
      this.props.onSetGameHistory( data.turn.gameHistory )
    } )

    socket.on( 'USER_WON', () => {
      this.props.onSetGameHistory( [] )
    } )
  }

  renderCards = () => {
    const cards = []
    const { gameHistory } = this.props
    const endIndex = gameHistory.length > 16 ? gameHistory.length - 16 : 0
    
    if ( gameHistory.length > 16 ) {
      for (let index = 0; index < endIndex; index++) {
        const card = gameHistory[index]

        const imageRef = cardList[ card - 1 ].image
        cards.push(
          <Card 
            key={ `card_img_${index}` }
            cover="contain" 
            width='10rem' 
            height='15rem'
            img={ `/static/assets/${imageRef}` }
          />
        )
      }
    }

    console.log( cards )
    return cards
  }

  render() {
    const cards = this.renderCards()
    
    return(
      <Background>
        <div className="cards-section">
          { cards }
        </div>
      </Background>
    )
  }
}

const mapStateToProps = state => {
  return {
    gameHistory: state.bng.history
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSetGameHistory: ( gameHistory ) => dispatch( setGameHistory( gameHistory ) )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardsSection)