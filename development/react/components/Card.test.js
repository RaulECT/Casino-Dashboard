import { shallow } from 'enzyme'
import React from 'react'

import Card from './Card'

describe( '<Card />', () => {
  let wrapper
  
  beforeEach(() => {
    wrapper = shallow( <Card /> )
  })

  it( 'should render <Card /> component', () => {
    expect( wrapper.length ).toEqual(1)
  } )

  it( 'should render <Card /> with default style', () => {
    const defaultStyle = {
      width: '200px',
      height: '400px',
      transform: 'scale(1)',
    }
    const cardStyles = shallow(<Card />).get(0).props.style
   
    expect( cardStyles ).toHaveProperty( 'transform', 'scale(1)' )
  } )
} )