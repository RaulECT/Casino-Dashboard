import React, {Component} from 'react' 
import {
  Form,
  Input,
  Icon,
  Button
} from 'antd'
import UsersTable from './UsersTable.jsx'

import '../styles/usersSection.css'

const data = []

for (let index = 0; index < 6; index++) {
  data.push( {
    key: index.toString(),
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

        <UsersTable data={data} />

        <div>
          <Button
            icon="user-add"
            type="primary"
            style={ {marginRight: '20px'} }
          >
            Agregar usuario
          </Button>

          <Button
            icon="delete"
            type="danger"
          >
            Eliminar (0) seleccionados 
          </Button>
        </div>
      </div>
    )
  }
}

module.exports = UsersSection