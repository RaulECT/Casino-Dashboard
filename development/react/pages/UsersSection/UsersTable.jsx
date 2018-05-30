import React, {Component} from 'react' 
import {
  Button,
  Divider,
  Popconfirm,
  Table
} from 'antd'

class UserTable extends Component {
  constructor( props ) {
    super( props )

    this.filters = [
      { text: 'admin', value: 'admin' },
      { text: 'cashier', value: 'cashier' },
      { text: 'dealer', value: 'dealer' },
      { text: 'hostess', value: 'hostess' },
      { text: 'pitboss', value: 'pitboss' },
      { text: 'superAdmin', value: 'superAdmin' }
    ]

    this.state = {
      filteredInfo: null,
      sortedInfo: null
    }

    this.rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => this.props.selectUsersToDelete( selectedRows )
    }

    this.clearAll = this.clearAll.bind( this )
    this.handleChange = this.handleChange.bind( this )
    this.getColumns = this.getColumns.bind( this )
    this.setRolSort = this.setRolSort.bind( this )
  }

  clearAll() {
    this.setState( {
      filteredInfo: null,
      sortedInfo: null
    } )
  }

  handleChange( pagination, filters, sorter ) {
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    })
  }

  getColumns() {
    let { filteredInfo, sortedInfo } = this.state
    const { showEditSection, selectUserToEdit } = this.props
    
    sortedInfo = sortedInfo || {}
    filteredInfo = filteredInfo || {}

    const columns = [ {
      title: 'Nombre',
      key: 'name',
      dataIndex: 'name',
      sorter: (a, b) => this.sortAlphabetically( a.name, b.name ),
      sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order
    }, 
    {
      title: 'Rol',
      key: 'roleName',
      dataIndex: 'roleName',
      filters: this.filters,
      filteredValue: filteredInfo.roleName,
      onFilter: ( value, record ) => record.roleName.includes(value),
      sorter: (a, b) => this.sortAlphabetically( a.roleName, b.roleName ),
      sortOrder: sortedInfo.columnKey === 'roleName' && sortedInfo.order
    }, 
    {
      title: 'Email',
      key: 'email',
      dataIndex: 'email',
      sorter: (a, b) => this.sortAlphabetically( a.email, b.email ),
      sortOrder: sortedInfo.columnKey === 'email' && sortedInfo.order
    },
    {
      title: 'Opciones',
      dataIndex: 'operation',
      render: (text, record) => {
        return (
          <div className="editable-row-operations">
            <span>
              <a onClick={() => { 
                showEditSection()  
                selectUserToEdit( record )
              }}>
                Editar
              </a>

              <Divider type="vertical" />
              
              <Popconfirm title="¿Desea eliminar este usuario?" onConfirm={() => { this.props.deleteSingleUser( record.userId ) }}> 
                <a>Eliminar</a>
              </Popconfirm>
            </span> 
          </div>
        )
      }
    } ]

    return columns
  }

  setRolSort() {
    const { filteredInfo } = this.state

    this.setState( {
      sortedInfo: {
        order: 'descend',
        columnKey: 'roleName'
      },
      filteredInfo
    } )
  }

  sortAlphabetically( a, b ) {
    return (a < b) ? -1 : (a > b) ? 1 : 0
  }

  render() {
    const columns = this.getColumns()

    return(
      <div style={ {width: '100%'} }>
        <div className="table-operations">
          <Button onClick={ this.setRolSort }>Ordenar por rol</Button>
          <Button onClick={ this.clearAll }>Reestrablecer filtros</Button>
        </div>

        <Table 
          rowSelection={this.rowSelection} 
          className="users-table" 
          dataSource={this.props.data} 
          columns={columns} 
          onChange={this.handleChange}
        />
      </div>
     
    )
  }
}

module.exports = UserTable