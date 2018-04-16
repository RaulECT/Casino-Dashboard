import React, {Component} from 'react' 
import {
  Form,
  Input,
  Icon,
  Button,
  Modal
} from 'antd'
import Api from '../../controllers/Api'
import UsersTable from './UsersTable.jsx'
import AddUser from './AddUser.jsx'
import EditUser from './EditUser.jsx'

import '../styles/usersSection.css'

const FormItem = Form.Item
const Search = Input.Search
const confirm = Modal.confirm

class UsersSection extends Component {

  constructor( props ) {
    super( props )

    this.api = new Api()

    this.state = {
      addUserModal: false,
      editUserModal: false,
      users: [],
      loading: false,
      usersToDelete: [],
      userToEdit: {},
      searchValue: '',
      roles: []
    }

    this.roles = []

    this.addUsersToDelete = this.addUsersToDelete.bind( this )
    this.deleteSingleUser = this.deleteSingleUser.bind( this )
    this.handleAddUserModal = this.handleAddUserModal.bind( this )
    this.handleEditUserModal = this.handleEditUserModal.bind( this )
    this.searchUserByName = this.searchUserByName.bind( this )
    this.selectUserToEdit = this.selectUserToEdit.bind( this )
    this.showDeleteConfirm = this.showDeleteConfirm.bind( this )
  }

  componentWillMount() {
    this.getRoles()
  }

  addUsersToDelete( usersSelected ) {
    const elementsToDelete = []
    const { addUserModal, editUserModal, users, userToEdit, loading, searchValue, roles } = this.state

    usersSelected.map( element => elementsToDelete.push( element.userId ) )

    this.setState( {
      addUserModal,
      editUserModal,
      users,
      loading,
      usersToDelete: elementsToDelete,
      userToEdit,
      searchValue,
      roles
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

  getRoles() {
    this.api.getRoles()
      .then( response => {
      
        if ( response.status === 200 ) {
          const { addUserModal, editUserModal, users, loading, usersToDelete, userToEdit, searchValue } = this.state
          this.roles = response.data.result.rolesArray
          this.setState( {
            roles: response.data.result.rolesArray,
            addUserModal,
            editUserModal,
            users,
            loading,
            usersToDelete,
            userToEdit,
            searchValue
          } )
        } else {
    
        }
      } )
      .catch( err => {
        console.log(err)

      } )
  }

  handleAddUserModal() {
    const { addUserModal, editUserModal, users, usersToDelete, userToEdit, loading, searchValue, roles } = this.state

    this.setState( {
      addUserModal: !addUserModal,
      editUserModal,
      loading,
      users,
      usersToDelete,
      userToEdit,
      searchValue,
      roles
    } )
  }

  handleEditUserModal() {
    const { addUserModal, editUserModal, users, usersToDelete, userToEdit, loading, searchValue, roles } = this.state

    this.setState( {
      addUserModal,
      editUserModal: !editUserModal,
      users,
      usersToDelete,
      userToEdit,
      loading,
      searchValue,
      roles
    } )
  }

  searchUserByName( name ) {
    const { addUserModal, editUserModal, usersToDelete, userToEdit, users, roles } = this.state

    this.setState( {
      loading: true,
      addUserModal,
      editUserModal,
      usersToDelete: [],
      userToEdit,
      users,
      searchValue: name,
      roles
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
            editUserModal,
            loading: false,
            addUserModal,
            usersToDelete: [],
            userToEdit,
            searchValue: name,
            roles
          } )
        } else {
          // TODO: Handle Error
        }
      } )
      .catch( err => {
        console.log( err )
      } )
  }

  selectUserToEdit( user ) {
    const { addUserModal, loading, usersToDelete, users, searchValue, roles } = this.state

    this.setState( {
      userToEdit: user,
      addUserModal,
      editUserModal: true,
      loading,
      usersToDelete,
      users,
      searchValue,
      roles
    } )

  }

  showDeleteConfirm() {
    confirm( {
      title: 'Borrar Usuarios',
      content: `¿Desea borrar estos ${this.state.usersToDelete.length} elementos?`,
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
    const { users, loading, usersToDelete, addUserModal, editUserModal, userToEdit, roles } = this.state
    const deleteDisabled = usersToDelete.length > 0 ? false : true

    const editUser = editUserModal ? (
      <EditUser
        visible={editUserModal}
        user={userToEdit}
        roles={roles}
        close={this.handleEditUserModal}
      /> ) : ''
  
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
          deleteSingleUser={this.deleteSingleUser}
          showEditSection={this.handleEditUserModal}
          selectUserToEdit={this.selectUserToEdit}
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
            disabled={deleteDisabled}
            onClick={this.showDeleteConfirm}
          >
            Eliminar ({`${usersToDelete.length}`}) seleccionados 
          </Button>
        </div>

        <AddUser
          visible={addUserModal}
          roles={roles}
          close={this.handleAddUserModal}
        />

        {editUser}
      </div>
    )
  }
}

module.exports = UsersSection