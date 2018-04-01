import React, {Component} from 'react'
import { 
  Alert,
  Table, 
  Icon, 
  Input,
  Divider,
  Button,
  Popconfirm,
  Modal,
  Form,
  InputNumber
} from 'antd'

import '../styles/rolesSection.css'

const FormItem = Form.Item

class RolesSection extends Component {

  constructor( props ) {
    super( props )

    this.state = {
      loading: true,
      hasChanged: false,
      success: false,
      revertChangesModal: false,
      addModal: false,
      updateModal: false,
      roles: []
    }

    this.columns = [ {
      title: 'Rol',
      dataIndex: 'rol'
    }, 
    {
      title: 'Operaciones',
      dataIndex: 'operation',
      render: ( text, record ) => {
        console.log(record)
        return(
          <div className="editable-row-operations">
            <span>
              <a onClick={()=> {}}>Editar</a>
              <Divider type="vertical" />
              <Popconfirm title="¿Desea eliminar este elemento?" onConfirm={ () => this.deleteRole( record.key ) }>
                <a>Eliminar</a>
              </Popconfirm>
            </span>
          </div>
        )
        
      }
    } ]

    this.deleteRole = this.deleteRole.bind( this )
  }

  componentWillMount() {
    const roles = []
    for (let index = 0; index < 5; index++) {
      roles.push( { key: index.toString(), rol: `rol ${index}` } )
    }

    this.state = {
      loading: true,
      hasChanged: false,
      success: false,
      revertChangesModal: false,
      addModal: false,
      updateModal: false,
      roles: roles
    }
  }

  deleteRole( roleKey ) {
    let rolesList = this.state.roles
    const rolePosition = rolesList.findIndex( element => element.key === roleKey.toString() )
    rolesList.splice( rolePosition, 1 )

    this.setState( {
      loading: this.state.loading,
      hasChanged: true,
      success: this.state.success,
      revertChangesModal: this.state.revertChangesModal,
      addModal: this.state.addModal,
      updateModal: this.state.updateModal,
      roles: rolesList
    } )
  }

  render() {
    return(
      <div className="roles-container">
        <h4>Porfavor, asigne los valores deseados</h4>

        <Table 
          className="roles-table"
          columns={this.columns}
          dataSource={this.state.roles}
        />
      </div>
    )
  }

}

module.exports = RolesSection