import React, {Component} from 'react' 
import {
  Form,
  Input,
  Icon,
  Button,
  Modal
} from 'antd'
import Api from '../../controllers/Api'
import ClientsTable from './ClientsTable.jsx'

const FormItem = Form.Item
const Search = Input.Search
const confirm = Modal.confirm

import '../styles/clientsSection.css'

class ClientsSection extends Component {
    constructor( props ) {
        super( props )

        this.api = new Api()

        this.state = {
            addClientModal: false,
            editClientModal: false,
            clients: [],
            loading: false,
            clientsToDelete: [],
            clientToEdit: {},
            searchValue: ''
        }

        this.addClientsToDelete = this.addClientsToDelete.bind( this )
        this.deleteSingleClient = this.deleteSingleClient.bind( this )
        this.handleAddClientModal = this.handleAddClientModal.bind( this )
        this.handleEditClientModal= this.handleEditClientModal.bind( this )
        this.searchClientByName = this.searchClientByName.bind( this )
        this.selectClientToEdit = this.selectClientToEdit.bind( this )
        this.showDeleteConfirm = this.showDeleteConfirm.bind( this )
    }

    addClientsToDelete( clientsSelected ) {
        const elementsToDelete = []
        const { addClientModal, editClientModal, clients, clientToEdit, loading, searchValue } = this.state
    
        clientsSelected.map( element => elementsToDelete.push( element.id ) )
    
        this.setState( {
          addClientModal,
          editClientModal,
          clients,
          loading,
          clientsToDelete: elementsToDelete,
          clientToEdit,
          searchValue
        } )
    }

    deleteSingleClient( clientId ) {
        this.api.deleteClient( clientId )
          .then( response => {
            if ( response.status === 200 ) {
              const { searchValue } = this.state
              this.searchClientByName( searchValue )
            } else {
              // TODO: Handle Error
            }
          } )
          .catch( err => {
            console.log( err )
          } )
    }

    handleAddClientModal() {
      const { addClientModal, editClientModal, clients, clientsToDelete, clientToEdit, loading, searchValue } = this.state
  
      this.setState( {
        addClientModal: !addClientModal,
        editClientModal,
        loading,
        clients,
        clientsToDelete,
        clientToEdit,
        searchValue
      } )
    }

    handleEditClientModal() {
      const { addClientModal, editClientModal, clients, clientsToDelete, clientToEdit, loading, searchValue } = this.state
  
      this.setState( {
        addClientModal,
        editClientModal: !editClientModal,
        loading,
        clients,
        clientsToDelete,
        clientToEdit,
        searchValue
      } )
    }

    searchClientByName( name ) {
      const { addClientModal, editClientModal, clientsToDelete, clientToEdit, clients } = this.state
  
      this.setState( {
        loading: true,
        addClientModal,
        editClientModal,
        clientsToDelete: [],
        clientToEdit,
        clients,
        searchValue: name
      } )
  
      this.api.getClientByName( name )
        .then( response => {
     
          if ( response.status === 200 ) {
            //return console.log(response)
            let clientsArray = response.data.result.customersArray
  
            clientsArray.map( (element, index) => element['key'] = index  )
  
            this.setState( {
              clients: clientsArray,
              editClientModal,
              loading: false,
              addClientModal,
              clientsToDelete: [],
              clientToEdit,
              searchValue: name
            } )
          } else {
            // TODO: Handle Error
          }
        } )
        .catch( err => {
          console.log( err )
        } )
    }

    selectClientToEdit( client ) {
      const { addClientModal, loading, clientsToDelete, clients, searchValue } = this.state
  
      this.setState( {
        clientToEdit: client,
        addClientModal,
        editClientModal: true,
        loading,
        clientsToDelete,
        clients,
        searchValue
      } )
  
    }
    
    showDeleteConfirm() {
      confirm( {
        title: 'Borrar Clientes',
        content: `¿Desea borrar estos ${this.state.clientsToDelete.length} elementos?`,
        okText: 'Si',
        okType: 'danger',
        cancelText: 'Cancelar',
        onOk() {
          console.log('Ok')
        },
        onCancel() {
          console.log('Cancel')
        }
      } )
    }

    render() {
      const { clients, loading, clientsToDelete, addClientModal, editClientModal, clientToEdit } = this.state
      const deleteDisabled = clientsToDelete.length > 0 ? false : true

      return(
        <div className="clients-container">
          <Search
            placeholder="Buscar por nombre de cliente"
            size="large"
            onSearch={value => this.searchClientByName( value ) }
            onChange={ value => this.searchClientByName( value.target.value ) }
            style={ {width: '60%'} }
            enterButton
          />

          <ClientsTable
            data={clients} 
            deleteSingleClient={this.deleteSingleClient}
            showEditSection={this.handleEditClientModal}
            selectClientToEdit={this.selectClientToEdit}
            selectClientsToDelete={this.addClientsToDelete}  
          />

          <div>
            <Button
              icon="user-add"
              type="primary"
              style={ {marginRight: '20px'} }
              onClick={this.handleAddClientModal}
              loading={loading}
            >
              Agregar cliente
            </Button>

            <Button
              icon="delete"
              type="danger"
              loading={loading}
              disabled={deleteDisabled}
              onClick={this.showDeleteConfirm}
            >
              Eliminar ({`${clientsToDelete.length}`}) seleccionados 
            </Button>
          </div>
        </div>
      )
    }
}

module.exports = ClientsSection