import React, { Component } from 'react'
import { connect } from 'react-redux'

import Card from '../../components/Card'

class WinnerSection extends Component {
  render() {
    return (
      <div>
        <h1>!FELICIDADES! HAY UN GANADOR</h1>

        <Card 
          img={ `/static/assets/${this.props.card.image}`}
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
