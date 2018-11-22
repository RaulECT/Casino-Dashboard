import React,{Component} from 'react'

import './CardboardsRegisteredMainPage.css'
import Bakcground from '../../components/Background/Background'
import CardboardsRegisteredHeader from '../../components/CardboardsRegisteredHeader/CardboardsRegisteredHeader'
import CardItem from '../../components/CardboardItem/CardboardItem'

let fakeData = []
const types = [ 'single', 'double', 'triple' ]

for (let index = 0; index < 100; index++) {
  const randomNumber = Math.floor(Math.random() * (types.length - 0)) + 0;
  fakeData.push( { numcode: 323232, type: types[randomNumber] } )
}

class CardboardsRegisteredMainPage extends Component {

  state = {
    cardboards: fakeData
  }

  render() {
    const cardboardItems = this.state.cardboards.length !== 0 ? 
      this.state.cardboards.map( ( item, index ) => {
        return <CardItem key={index} type={item.type}> { item.numcode } </CardItem>
      } ) : <p>No hay un juego actualmente</p>

    return (
      <Bakcground >
        <CardboardsRegisteredHeader />

        <div className="cardboards-list">
          {cardboardItems}
        </div>
      </Bakcground>
    )
  }
}

export default CardboardsRegisteredMainPage