import React, { Component } from 'react'
import { connect } from 'react-redux'

import Card from '../../components/Card'

class WinnerSection extends Component {
  render() {
    console.log( this.props )
    return (
      <div>
        <h1>!FELICIDADES! HAY UN GANADOR</h1>

        <Card 
          img={ `/static/assets/${ this.props.history.location.state.card.image }`}
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    card: state.bng.currentCard,
  }
}

export default connect( mapStateToProps )(WinnerSection)
