import React, {Component} from 'react' 
import {
  Form,
  Input,
  Icon,
  Button
} from 'antd'
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

    this.state = {
      addUserModal: false,
      usersToDelete: []
    }

    this.addUsersToDelete = this.addUsersToDelete.bind( this )
    this.handleAddUserModal = this.handleAddUserModal.bind( this )
  }

  addUsersToDelete( users ) {
    const elementsToDelete = []
    const { addUserModal } = this.state

    users.map( element => elementsToDelete.push( element.id ) )

    this.setState( {
      addUserModal,
      usersToDelete: elementsToDelete
    } )
  }

  handleAddUserModal() {
    const { addUserModal, usersToDelete } = this.state

    this.setState( {
      addUserModal: !addUserModal,
      usersToDelete
    } )
  }


  render() {
    return(
      <div className="users-container">

        <Search
          placeholder="Buscar por nombre de usuario"
          size="large"
          onSearch={value => console.log(value)}
          onChange={ value => console.log(value.target.value) }
          style={ {width: '80%'} }
          enterButton
        />

        <UsersTable
          data={data} 
          selectUsersToDelete={this.addUsersToDelete}  
        />

        <div>
          <Button
            icon="user-add"
            type="primary"
            style={ {marginRight: '20px'} }
            onClick={this.handleAddUserModal}
          >
            Agregar usuario
          </Button>

          <Button
            icon="delete"
            type="danger"
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