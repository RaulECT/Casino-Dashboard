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

class UsersSection extends Component {

  constructor( props ) {
    super( props )
  }


  render() {
    return(
      <div className="users-container">

        <Form layout="inline" style={ {width: '100%'} }>
          <FormItem className="search-field" style={ {width: '40%'}}>
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)'}} />} placeholder="Buscar por nombre de usuario..." />
          </FormItem>

          <FormItem>
            <Button type="primary">Buscar</Button>
          </FormItem>
        </Form>

        <UsersTable data={data} />
      </div>
    )
  }
}

module.exports = UsersSection