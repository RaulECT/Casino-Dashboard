/**
 * Componente que representa a la sección envios automaticos
 */
import React,{Component} from 'react'
import {
  Button,
  Modal
} from 'antd'
import ListsForm from './ListsForm.jsx'
import ListsTable from './ListsTable.jsx'
import Api from '../../controllers/Api'

const confirm = Modal.confirm

import '../styles/statsSection.css'

class AutomaticDelivery extends Component {

  /**
   * Crea el componente
   * @param {object} props 
   */
  constructor( props ) {
    super( props )

    this.state = {
      createListModal: false,
      listsToDelete: [],
      lists: []
    }

    this.api = new Api()

    this.addListToDelete = this.addListToDelete.bind( this )
    this.createList = this.createList.bind( this )
    this.deleteLists = this.deleteLists.bind( this )
    this.editList = this.editList.bind( this )
    this.getEmailLists = this.getEmailLists.bind( this )
    this.handleCreateListModal = this.handleCreateListModal.bind( this )
    this.showDeleteConfirm = this.showDeleteConfirm.bind( this )
  }

  /**
   * Función que se ejecuta antes de randerizar la vista
   */
  componentWillMount() {
    this.getEmailLists()
  }

  /**
   * Función que guarda los elementos seleccionados para eliminar
   * @param {Array} elementesSelected Elementos seleccionados para eliminar 
   */
  addListToDelete( elementesSelected ) {
    let listsToDelete = []

    elementesSelected.map( element => listsToDelete.push( element.subject ) )

    this.setState( { listsToDelete } )
  }

  /**
   * 
   * @param {*} emails 
   * @param {*} stats 
   * @param {*} subject 
   * @param {*} periodicityConfig 
   */
  createList( emails, stats, subject, periodicityConfig = {} ) {
    let { lists } = this.state

    this.setState( {
      lists: lists.concat( { emails, stats, subject } ),
      createListModal: false
    } )
  }

  deleteLists() {
    let { lists, listsToDelete } = this.state

    const listsUpdated = lists.filter( list => listsToDelete.indexOf( list.subject ) === -1 )   

    this.setState( { lists: listsUpdated } )
  }

  editList( list, newInfo ) {
    let { lists } = this.state
    
    const idx = lists.map( e => { return e.subject }).indexOf( list )
    lists[idx] = newInfo

    this.setState( { lists } )
  }

  /**
   * Función que obtiene las listas guardadas en la API
   */
  getEmailLists() {
    this.api.getEmailsList()
      .then( response => {

        if ( response.status === 200 ) {
          const {items} = response.data.result

          items.map( ( element => {
            element['key'] = element.id

            const date = new Date( element['createdOn'] )
            element['createdDate'] = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
          } ) )

          this.setState( { lists: items } )
        }
      } )
      .catch( err => {
        console.log( err );
        
      } )
  }

  /**
   * Función que maneja la presencia del modal para crear una nueva lista de correo
   */
  handleCreateListModal() {
    const { createListModal } = this.state

    this.setState( { createListModal: !createListModal } )
  }

  /**
   * Función que maneja la presencia del modal para confirmar la eliminación de un elemento
   */
  showDeleteConfirm() {
    let { lists, listsToDelete } = this.state
    const _this = this

    confirm( {
      title: 'Borrar lista(s) seleccionadas',
      content: '¿Desea borrar estos elementos?',
      onOk() {
        _this.deleteLists()
      },
      onCancel() {
        console.log('Cancel');
      },
    } )
  }

  /**
   * Randeriza la vista del componente
   * @returns {string} HTML markup del componente
   */
  render() {
    const { createListModal, lists, listsToDelete } = this.state
    const deleteDisabled = listsToDelete.length > 0 ? false : true

    return(
      <div>
        <ListsTable 
          data={lists}
          edit={this.editList}
          selectList={this.addListToDelete}
        />

        <div className="button-group">
          <Button
            type="primary"
            icon="push"
            onClick={this.handleCreateListModal}
          >
            Crear nueva lista
          </Button>
        
          <Button
            type="danger"
            icon="delete"
            disabled={deleteDisabled}
            onClick={this.showDeleteConfirm}
          >
            Eliminar ({listsToDelete.length}) seleccionadas
          </Button>
        </div>



        <ListsForm
          visible={createListModal}
          type="add"
          confirm={this.createList}
          close={this.handleCreateListModal}
          updateLists={this.getEmailLists}
        />
      </div>
     
    )
  }
}

module.exports = AutomaticDelivery