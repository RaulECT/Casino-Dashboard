import React,{ Component, Fragment } from "react";
import { connect } from 'react-redux'
import { createCasino } from '../../store/actions/index'

import CasinoForm from '../../components/CasinoForm/CasinoForm'

class CasinoControl extends Component {

  render() {

    return(
      <Fragment>
        <CasinoForm 
          loading={ this.props.loading }
          onCreateCasino={ this.props.onCreateCasino }
        />
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    loading: state.cas.loading,
    error: state.cas.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onCreateCasino: ( { name, address, phone } ) => dispatch( createCasino( { name, phone, address } ) )
  }
}

export default connect( mapStateToProps, mapDispatchToProps )(CasinoControl)