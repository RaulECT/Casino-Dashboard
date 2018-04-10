import React, {Component} from 'react' 
import {
  Form,
  Input,
  Icon,
  Button
} from 'antd'
import Api from '../../controllers/Api'
import UsersTable from './UsersTable.jsx'
import AddUser from './AddUser.jsx'

import '../styles/usersSection.css'

const data = []

for (let index = 0; index < 6; index++) {
  data.push( {
    key: index.toString(),
    id: index.toString(),
    name: `name${index} name${index} name${index}`,
    roleName: `rol_${index}`,
    email: `email_${index}@correo.com`
  } )
}

const FormItem = Form.Item
const Search = Input.Search

class UsersSection extends Component {

  constructor( props ) {
    super( props )

    this.api = new Api()

    this.state = {
      addUserModal: false,
      users: [],
      loading: false,
      usersToDelete: []
    }

    this.addUsersToDelete = this.addUsersToDelete.bind( this )
    this.handleAddUserModal = this.handleAddUserModal.bind( this )
    this.searchUserByName = this.searchUserByName.bind( this )
  }

  addUsersToDelete( usersSelected ) {
    const elementsToDelete = []
    const { addUserModal, users, loading } = this.state

    usersSelected.map( element => elementsToDelete.push( element.userId ) )

    this.setState( {
      addUserModal,
      users,
      loading,
      usersToDelete: elementsToDelete
    } )
  }

  handleAddUserModal() {
    const { addUserModal, users, usersToDelete, loading } = this.state

    this.setState( {
      addUserModal: !addUserModal,
      loading,
      users,
      usersToDelete
    } )
  }

  searchUserByName( name ) {
    const { addUserModal, usersToDelete, users } = this.state

    this.setState( {
      loading: true,
      addUserModal,
      usersToDelete,
      users
    } )

    this.api.getUserByName( name )
      .then( response => {
   
        if ( response.status === 200 ) {
          
          let usersArray = response.data.result.usersArray

          usersArray.map( (element, index) => { 
            element['key'] = index
           } )

          this.setState( {
            users: response.data.result.usersArray,
            loading: false,
            addUserModal,
            usersToDelete
          } )
        } else {
          // TODO: Handle Error
        }
      } )
      .catch( err => {
        console.log( err )
      } )
  }


  render() {
    const { users, loading } = this.state

    return(
      <div className="users-container">

        <Search
          placeholder="Buscar por nombre de usuario"
          size="large"
          onSearch={value => this.searchUserByName( value ) }
          onChange={ value => this.searchUserByName( value.target.value ) }
          style={ {width: '80%'} }
          enterButton
        />

        <UsersTable
          data={users} 
          selectUsersToDelete={this.addUsersToDelete}  
        />

        <div>
          <Button
            icon="user-add"
            type="primary"
            style={ {marginRight: '20px'} }
            onClick={this.handleAddUserModal}
            loading={loading}
          >
            Agregar usuario
          </Button>

          <Button
            icon="delete"
            type="danger"
            loading={loading}
          >
            Eliminar ({`${this.state.usersToDelete.length}`}) seleccionados 
          </Button>
        </div>

        <AddUser
          visible={this.state.addUserModal}
          close={this.handleAddUserModal}
        />
      </div>
    )
  }
}

module.exports = UsersSection