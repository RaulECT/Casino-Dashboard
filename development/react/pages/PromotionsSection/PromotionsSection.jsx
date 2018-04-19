import React, {Component} from 'react' 
import {
  Form,
  Input,
  Icon,
  Button,
  Modal
} from 'antd'

import Api from '../../controllers/Api'
import PromotionsTable from './PromotionsTable.jsx'

import '../styles/promsSection.css'

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
          let proms = response.data.result.promosArray

          proms.map( ( element, index ) => {
            element['key'] = index
            element.valueMax = element.valueMax / 100
            element.valueMin = element.valueMin / 100
            element.timeLimit = element.timeLimit.split('T')[0]
            element.active = `${element.active}`
          }  )

          this.setState( {
            proms
          } )
        }
        
      } )
      .catch( err => {
        console.log(err)
      } )
  }

  render() {
    const { proms } = this.state

    return(
      <div>
        <PromotionsTable 
          data={proms}
        />
      </div>
    )
  }
}

module.exports = PromotionsSection