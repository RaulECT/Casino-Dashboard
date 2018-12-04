import { shallow } from 'enzyme'
import React from 'react'

import NextGameInfo from './NextGameInfo'
import GameInfo from '../../components/GameInfo/GameInfo'

describe( '<NextGameInfo />', () => {
  let wrapper

  beforeEach( () => {
    wrapper = shallow( <NextGameInfo /> )
  } )

  it( 'should render <NextGameInfo /> component', () => {
    expect( wrapper.length ).toEqual( 1 )
  } )

  it( 'should render game not fount message when game is not passed as a prop', () => {
    expect( wrapper.find( '.next-game__error-msg' ) ).toHaveLength( 1 )
  } )

  it( 'should render <GameInfo /> component when current game prop is setted', () => {
    const gameFake = {
      active: true,
      createdBy: "85d556ca-096c-4283-8644-9db13d183c47",
      createdOn: "2018-12-04T17:53:37.060Z",
      doublePrice: 1500,
      electronicPrice: 1000,
      gameDate: "2018-12-04T20:52:14-06:00",
      gameName: "Test_espera",
      id: "fead1fdb-cfda-4578-8964-0fe0b15924aa",
      lineConsPrize: 1200,
      linePattern: "LINEA",
      linePrize: 5000,
      lotteryConsoPrize: 3400,
      lotteryPattern: "DOBLE LINEA",
      lotteryPrize: 15000,
      singlePrice: 1000,  
      triplePrice: 2000,
    }

    wrapper.setProps( { game: gameFake } )
    expect( wrapper.find( GameInfo ) ).toHaveLength( 1 )
  } )

} )