import { shallow } from 'enzyme'
import React from 'react'

import WaitingGameSection from './WaitingGameSection'
import NextGame from '../NextGameInfo/NextGameInfo'
import RandomGame from '../RandomGame/RandomGame'

describe( '<WaitingGameSection />', () => {
  let wrapper

  beforeEach( () => {
    wrapper = shallow( <WaitingGameSection /> )
  } )

  it( 'should render <WaitingGameSection /> component', () => {
    expect( wrapper.length ).toEqual( 1 )
  } )

  it( 'should render <NextGame /> as child component', () => {
    expect( wrapper.find( NextGame ) ).toHaveLength( 1 )
  } )
  
  it( 'should render <RandomGame /> as child component', () => {
    expect( wrapper.find( RandomGame ) ).toHaveLength( 1 )
  } )
} )