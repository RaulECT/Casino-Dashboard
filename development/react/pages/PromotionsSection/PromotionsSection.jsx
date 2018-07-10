/**
 * Componente que representa a la sección de manejo de promociones
 */
import React, {Component} from 'react' 
import {
  Form,
  Input,
  Icon,
  Button,
  Modal,
  notification
} from 'antd'
import ErrorManagment from '../../controllers/ErrorManagment'

import Api from '../../controllers/Api'
import PromotionsTable from './PromotionsTable.jsx'
import AddPromotion from './AddPromotion.jsx'
import EditPromotion from './EditPromotion.jsx'

import '../styles/promsSection.css'

class PromotionsSection extends Component {

  /**
   * Crea el componente
   * @param {*} props 
   */
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
    this.errorManagment = new ErrorManagment()

    this.createPromotion = this.createPromotion.bind( this )
    this.deactivePromotion = this.deactivePromotion.bind( this )
    this.editPromotion = this.editPromotion.bind( this )
    this.loadPromotions = this.loadPromotions.bind( this )
    this.handleAddPromotionModal = this.handleAddPromotionModal.bind( this )
    this.handleEditPromotionModal = this.handleEditPromotionModal.bind( this )
    this.selectPromToEdit = this.selectPromToEdit.bind( this )
  }

  /**
   * Función que se ejecuta antes de randerizar la vista
   */
  componentWillMount() {
    this.loadPromotions()
  }

  /**
   * Función que desactiva una promoción
   * @param {String} promotion ID de la promoión a desactivar
   */
  deactivePromotion( promotion ) {
    
    this.api.deactivePromo( promotion )
      .then( response => {
        console.log( response );
        if ( response.status === 200 ) {
          this.openNotificationWithIcon( 'Se ha desactivado con éxito la promoción.', 'Desactivar promoión' )
          this.loadPromotions()
        } else {
          this.errorManagment.resolveError( response.data )
        }
      } )
      .catch( err => {
        console.log( err );
        
      } )
  }

  /**
   * Función que le solicita a la API crear una nueva promoción
   * @param {object} data Información de la promoción a crear
   */
  createPromotion( data ) {
    const { addPromotionModal, editPromotionModal, success, promotionsToDelete, promotionToEdit, proms, loading } = this.state

    this.api.createPromo( data )
      .then( response => {
        if ( response.status === 200 ) {
          this.setState( {
            addPromotionModal: false,
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
        console.log( err );
        
      } )
  }

  /**
   * Función que le envia a la API la información para editar una promoción
   * @param {*} data 
   */
  editPromotion( data ) {
    const { addPromotionModal, editPromotionModal, success, promotionsToDelete, promotionToEdit, proms, loading } = this.state
    console.log(data);
    
    this.api.editPromo( data )
      .then( response => {
        console.log(response);
        
        if( response.status === 200 ) {

          this.setState( {
            addPromotionModal,
            editPromotionModal: false,
            success: true,
            promotionsToDelete,
            promotionToEdit: {},
            proms,
            loading
          } )

          this.openNotificationWithIcon( 'Se ha actualizado con éxito la promoción.', 'Editar promoión' )
          this.loadPromotions()
        }
      } ) 
  }

  /**
   * Función que carga las promociones guardadas en la API
   */
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
          console.log(proms)
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
        } else {
          console.log(response);
          this.errorManagment.resolveError( response.data )
        }
        
      } )
      .catch( err => {
        console.log(err)
      } )
  }

  /**
   * Función que maneja la presencia del modal para agrega nuevas promociones
   */
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

  /**
   * Función que maneja la presencia del modal para editar las promociones
   */
  handleEditPromotionModal() {
    const { proms, addPromotionModal, editPromotionModal, promotionsToDelete, promotionToEdit, loading, success } = this.state

    this.setState( {
      addPromotionModal,
      editPromotionModal: !editPromotionModal,
      promotionsToDelete,
      promotionToEdit,
      success,
      loading,
      proms
    } )
  }

  /**
   * Función que le muestra al usuario una notificación de éxito
   * @param {String} description Título de la notificación 
   * @param {String} message Mensaje de la notificación
   */
  openNotificationWithIcon( description, message ) {
    notification['success']( {
      message: message,
      description: description
    } )
  }

  /**
   * Función que guarda en el estado la promoción para editar
   * @param {object} promSelcted 
   */
  selectPromToEdit( promSelcted ) {
    
    const { proms, addPromotionModal, editPromotionModal, promotionsToDelete, loading, success } = this.state

    this.setState( {
      promotionToEdit: promSelcted,
      proms,
      addPromotionModal,
      editPromotionModal: true,
      promotionsToDelete,
      loading,
      success
    } )
  }

  /**
   * Randeriza la vista del componente
   * @returns {string} HTML markup del componente
   */
  render() {
    const { proms, addPromotionModal, editPromotionModal, promotionToEdit, promotionsToDelete, success, loading } = this.state
    const deleteDisabled = promotionsToDelete.length > 0 ? false : true
    const editPromotion = editPromotionModal ? (
      <EditPromotion
        visible={editPromotionModal}
        editPromo={this.editPromotion}
        close={this.handleEditPromotionModal}
        prom={promotionToEdit}
      />
    ) : ''

    return(
      
      <div>
        <PromotionsTable 
          data={proms}
          deactivePromotion={this.deactivePromotion}
          selectPromToEdit={this.selectPromToEdit}
          showEditSection={this.handleEditPromotionModal}
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

        {editPromotion}
      </div>
    )
  }
}

module.exports = PromotionsSection