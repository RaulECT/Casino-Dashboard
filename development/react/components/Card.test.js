import { shallow } from 'enzyme'
import React from 'react'

import Card from './Card'

describe( '<Card />', () => {
  it( 'should render <Card /> component', () => {
    const wrapper = shallow( <Card /> )

    expect( wrapper.length ).toEqual(1)
  } )
} )