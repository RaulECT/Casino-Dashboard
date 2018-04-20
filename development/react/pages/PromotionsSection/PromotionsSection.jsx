import React, {Component} from 'react' 
import {
  Form,
  Input,
  Icon,
  Button,
  Modal,
  notification
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
      success: false,
      promotionsToDelete: [],
      promotionToEdit: {},
      proms: []
    }

    this.api = new Api()

    this.createPromotion = this.createPromotion.bind( this )
    this.deactivePromotion = this.deactivePromotion.bind( this )
    this.loadPromotions = this.loadPromotions.bind( this )
    this.handleAddPromotionModal = this.handleAddPromotionModal.bind( this )
  }

  componentWillMount() {
    this.loadPromotions()
  }

  deactivePromotion( promotion ) {
    console.log( promotion );
    this.api.deactivePromo( promotion )
      .then( response => {
        console.log( response );
        
      } )
      .catch( err => {
        console.log( err );
        
      } )
  }

  createPromotion( data ) {
    const { addPromotionModal, editPromotionModal, success, promotionsToDelete, promotionToEdit, proms, loading } = this.state

    this.api.createPromo( data )
      .then( response => {
        if ( response.status === 200 ) {
          this.setState( {
            addPromotionModal,
            editPromotionModal,
            promotionsToDelete,
            promotionToEdit,
            proms,
            loading,
            success: true
          } )

          this.openNotificationWithIcon( 'Se ha creado con éxito la promoción.', 'Crear promoión' )
          this.loadPromotions()
        } else {
          
        }
      } )
      .catch( err => {

      } )
  }

  loadPromotions() {
    const { addPromotionModal, editPromotionModal, promotionsToDelete, promotionToEdit, success } = this.state

    this.setState( {
      addPromotionModal,
      editPromotionModal,
      promotionsToDelete,
      promotionToEdit,
      success: false,
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
            success: false,
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
    const { proms, addPromotionModal, editPromotionModal, promotionsToDelete, promotionToEdit, loading, success } = this.state

    this.setState( {
      addPromotionModal: !addPromotionModal,
      editPromotionModal,
      promotionsToDelete,
      promotionToEdit,
      success,
      loading,
      proms
    } )
  }

  openNotificationWithIcon( message, description ) {
    notification['success']( {
      message: message,
      description: description
    } )
  }

  render() {
    const { proms, addPromotionModal, editPromotionModal, promotionsToDelete, success, loading } = this.state
    const deleteDisabled = promotionsToDelete.length > 0 ? false : true

    return(
      
      <div>
        <PromotionsTable 
          data={proms}
          deactivePromotion={this.deactivePromotion}
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
          createPromotion={this.createPromotion}
        />
      </div>
    )
  }
}

module.exports = PromotionsSection