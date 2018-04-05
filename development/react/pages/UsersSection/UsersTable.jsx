import React, {Component} from 'react' 
import {
  Divider,
  Popconfirm,
  Table
} from 'antd'

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
    this.rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
      }
    }
  }

  render() {
    return(
      <Table rowSelection={this.rowSelection} className="users-table" dataSource={this.props.data} columns={this.columns} />
    )
  }
}

module.exports = UserTable