import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { getAllCasinos } from '../../store/actions/index'

import CasinosTable from '../../components/CasinosTable/CasinosTable'

class CasinoList extends Component {

  componentDidMount() {
    this.props.onGetAllCasinos()
  }

  render() {

    return(
      <Fragment>
        <CasinosTable 
          casinos={this.props.casinos}
        />
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    loading: state.cas.loading,
    error: state.cas.error,
    casinos: state.cas.casinos
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onGetAllCasinos: () => dispatch( getAllCasinos() )
  }
}

export default connect( mapStateToProps, mapDispatchToProps )(CasinoList)