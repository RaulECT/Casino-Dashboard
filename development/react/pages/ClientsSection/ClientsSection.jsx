import React, {Component} from 'react' 
import {
  Form,
  Input,
  Icon,
  Button,
  Modal
} from 'antd'

const FormItem = Form.Item
const Search = Input.Search
const confirm = Modal.confirm

class ClientsSection extends Component {
    constructor( props ) {
        super( props )

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

    deleteSingleUser( userId ) {
        this.api.deleteUser( userId )
          .then( response => {
            if ( response.status === 200 ) {
              const { searchValue } = this.state
              this.searchUserByName( searchValue )
            } else {
              // TODO: Handle Error
            }
          } )
          .catch( err => {
            console.log( err )
          } )
    }
}

module.exports = ClientsSection