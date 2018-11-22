import React,{Component} from 'react'
import { openConnection } from '../../../socket'

import './CardboardsRegisteredMainPage.css'
import Bakcground from '../../components/Background/Background'
import CardboardsRegisteredHeader from '../../components/CardboardsRegisteredHeader/CardboardsRegisteredHeader'
import CardItem from '../../components/CardboardItem/CardboardItem'

let socket = null
let fakeData = []
const types = [ 'single', 'double', 'triple' ]

for (let index = 0; index < 100; index++) {
  const randomNumber = Math.floor(Math.random() * (types.length - 0)) + 0;
  fakeData.push( { numcode: 323232, type: types[randomNumber] } )
}

class CardboardsRegisteredMainPage extends Component {

  state = {
    cardboards: [] //fakeData
  }

  componentDidMount() {
    socket = openConnection()

    socket.on( 'REGISTER_CARDBOARD', cardboard => {
      this.setState( prevState => {
        return { cardboards: prevState.cardboards.concat( cardboard ) }
      } )
    } )
  }

  componentWillUnmount() {
    socket.close()
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