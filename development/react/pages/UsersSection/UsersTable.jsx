import React, {Component} from 'react' 
import {
  Divider,
  Popconfirm,
  Table
} from 'antd'

const data = []

for (let index = 0; index < 6; index++) {
  data.push( {
    key: index.toString(),
    name: `name${index} name${index} name${index}`,
    roleName: `rol_${index}`,
    email: `email_${index}@correo.com`
  } )
}

class UserTable extends Component {
  constructor( props ) {
    super( props )

    this.columns = [ {
      title: 'Nombre',
      dataIndex: 'name'
    }, 
    {
      title: 'Rol',
      dataIndex: 'roleName'
    },
    {
      title: 'Email',
      dataIndex: 'email'
    },
    {
      title: 'Opciones',
      dataIndex: 'operation',
      render: (text, record) => {
        return (
          <div className="editable-row-operations">
            <span>
              <a onClick={() => {}}>Editar</a>
              <Divider type="vertical" />
              <Popconfirm title="¿Desea eliminar este usuario?" onConfirm={() => {}}>
                <a>Eliminar</a>
              </Popconfirm>
            </span> 
          </div>
        )
      }
    } ]
  }

  render() {
    return(
      <Table className="users-table" dataSource={data} columns={this.columns} />
    )
  }
}

module.exports = UserTable