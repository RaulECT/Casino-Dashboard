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
import AddPromotion from './AddPromotion.jsx'

import '../styles/promsSection.css'

class PromotionsSection extends Component {
  constructor( props ) {
    super( props )

    this.state = {
      addPromotionModal: false,
      editPromotionModal: false,
      loading: false,
      promotionsToDelete: [],
      promotionToEdit: {},
      proms: []
    }

    this.api = new Api()

    this.handleAddPromotionModal = this.handleAddPromotionModal.bind( this )
  }

  componentWillMount() {
    const { addPromotionModal, editPromotionModal, promotionsToDelete, promotionToEdit } = this.state

    this.setState( {
      addPromotionModal,
      editPromotionModal,
      promotionsToDelete,
      promotionToEdit,
      proms: [],
      loading: true
    } )

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
            loading: false,
            addPromotionModal,
            editPromotionModal,
            promotionsToDelete,
            promotionToEdit,
            proms,
          } )
        }
        
      } )
      .catch( err => {
        console.log(err)
      } )
  }

  handleAddPromotionModal() {
    const { proms, addPromotionModal, editPromotionModal, promotionsToDelete, promotionToEdit, loading } = this.state

    this.setState( {
      addPromotionModal: !addPromotionModal,
      editPromotionModal,
      promotionsToDelete,
      promotionToEdit,
      loading,
      proms
    } )
  }

  render() {
    const { proms, addPromotionModal, editPromotionModal, promotionsToDelete, loading } = this.state
    const deleteDisabled = promotionsToDelete.length > 0 ? false : true

    return(
      
      <div>
        <PromotionsTable 
          data={proms}
        />

        <div>
          <Button
            icon="star-o"
            type="primary"
            style={ {marginRight: '20px'} }
            onClick={this.handleAddPromotionModal}
            loading={loading}
          >
            Agregar promoción
          </Button>

          <Button
            icon="delete"
            type="danger"
            loading={loading}
            disabled={deleteDisabled}
            onClick={this.showDeleteConfirm}
          >
            Eliminar ({`${promotionsToDelete.length}`}) seleccionados 
          </Button>
        </div>

        <AddPromotion 
          visible={addPromotionModal}
          close={this.handleAddPromotionModal}
        />
      </div>
    )
  }
}

module.exports = PromotionsSection