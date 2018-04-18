import React, {Component} from 'react' 
import {
  Form,
  Input,
  Icon,
  Button,
  Modal
} from 'antd'

import Api from '../../controllers/Api'

class PromotionsSection extends Component {
  constructor( props ) {
    super( props )

    this.state = {
      proms: []
    }

    this.api = new Api()
  }

  componentWillMount() {
    this.api.getProms()
      .then( response => {
        if (response.status === 200) {
          this.setState( {
            proms: response.data.result.promosArray
          } )
        }
        
      } )
      .catch( err => {
        console.log(err)
      } )
  }

  render() {
    return(
      <div>
        
      </div>
    )
  }
}

module.exports = PromotionsSection