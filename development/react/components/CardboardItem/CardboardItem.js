import React, {Component} from 'react'

import './CardboardItem.css'

class CardboardItem extends Component {

  shouldComponentUpdate( nextProps ) {
    const currentNumcode = this.props.children[1]
    const nextNumcode = nextProps.children[1]

    return currentNumcode !== nextNumcode
  }
  
  getItemClasses = () => {
    const classes = [ 'cardboard-item' ]

    switch ( this.props.type ) {
      case 'SINGLE':
        classes.push( 'cardboard-item__single' )
        break;
      
      case 'DOUBLE':
        classes.push( 'cardboard-item__double' )
        break;
      
      case 'TRIPLE':
        classes.push( 'cardboard-item__triple' )
        break;
    
      default:
        classes.push( 'cardboard-item__single' )
        break;
    }

    return classes.join( ' ' )
  }
  
  render() {
    const itemClasses = this.getItemClasses()

    return ( 
      <p className={ itemClasses }>{ this.props.children }</p>
    )
  }
}

export default CardboardItem