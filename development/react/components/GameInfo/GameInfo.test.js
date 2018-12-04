import { shallow } from 'enzyme'
import React from 'react'

import GameInfo from './GameInfo'

describe( '<GameInfo />', () => {
  let wrapper

  beforeEach( () => {
    wrapper = shallow( <GameInfo /> )
  } )

  it( 'sholud render <GameInfo /> component', () => {
    expect( wrapper.length ).toEqual( 1 )
  } )
} )