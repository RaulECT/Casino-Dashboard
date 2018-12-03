import { shallow } from 'enzyme'
import React from 'react'

import RandomGame from './RandomGame'

describe( '<RandomGame />', () => {
  let wrapper

  beforeEach( () => {
    wrapper = shallow( <RandomGame /> )
  } )

  it( 'should render <RandomGame /> component', () => {
    expect( wrapper.length ).toEqual(1)
  } )
} )