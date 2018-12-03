import { shallow } from 'enzyme'
import React from 'react'

import NextGameInfo from './NextGameInfo'

describe( '<NextGameInfo />', () => {
  let wrapper

  beforeEach( () => {
    wrapper = shallow( <NextGameInfo /> )
  } )

  it( 'should render <NextGameInfo /> component', () => {
    expect( wrapper.length ).toEqual( 1 )
  } )
} )