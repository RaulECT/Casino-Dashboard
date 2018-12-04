import { shallow } from 'enzyme'
import React from 'react'

import Chronometer from './Chronometer'

describe( '<Chronometer />', () => {
  let wrapper

  beforeEach( () => {
    wrapper = shallow( <Chronometer /> )
  } )

  it( 'should render <Chronometer /> component', () => {
    expect( wrapper.length ).toEqual( 1 )
  } )
} )