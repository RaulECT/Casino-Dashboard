import React, {Component} from 'react'

import { cardList } from '../../store/reducers/cards'
import Panel from '../../components/Panel/Panel'
import Card from '../../components/Card'

class RecentCardsSection extends Component {

  renderCardsImages = () => {
    const { cards } = this.props
    const cardsImages = []

    const startIndex = cards.length < 17 ? 0 : cards.length - 17

    for (let index = startIndex; index < cards.length - 1; index++) {
      const card = cards[index]

      const imageRef = cardList[ card ].image
      cardsImages.push(
        <Card 
          key={ `card_img_${index}` }
          cover="contain" 
          width='10rem' 
          height='15rem'
          img={ `/static/assets/${imageRef}` }
        />
      )
    }

    return cardsImages
  }

  render() {
    const cardsImgs = this.renderCardsImages()

    return(
      <Panel
        opacity={0}
        gridTemplateColumns='repeat(4, minmax(min-content, max-content))'
        gridTemplateRows='repeat(5,min-content)'
        rowGap='1.1rem'
        columnGap="3rem"
        className="bingo-game__panel"
        style={ { margin: 'auto' } }
      >
        { cardsImgs }
      </Panel>
    )
  }
} 

export default RecentCardsSection

//width='13rem' 
//height='20rem'

//width='10rem' 
//height='15rem'