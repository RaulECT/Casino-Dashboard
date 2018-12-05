import { shallow } from 'enzyme'
import React from 'react'

import GameNotFoundMessage from './GameNotFoundMessage'

describe( '<GameNotFoundMessage />', () => {
  let wrapper 

  beforeEach( () => {
    wrapper = shallow( <GameNotFoundMessage /> )
  } )

  it( 'should render <GameNotFoundMessage /> component', () => {
    expect( wrapper.length ).toEqual( 1 )
  } )
} )