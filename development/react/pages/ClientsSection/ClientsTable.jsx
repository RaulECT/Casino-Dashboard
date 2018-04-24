import React, {Component} from 'react' 
import {
  Button,
  Divider,
  Popconfirm,
  Table
} from 'antd'

class ClientsTable extends Component {
    constructor( props ) {
        super( props )

        this.state = {
            sortedInfo: null
        }
    
        this.rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => this.props.selectClientsToDelete( selectedRows )
        }

        this.handleChange = this.handleChange.bind( this )
    }

    handleChange( pagination, filters, sorter ) {
        this.setState({
          sortedInfo: sorter
        })
    }

    getColumns() {
        let { sortedInfo } = this.state
        const { showEditSection, selectClientToEdit } = this.props

        sortedInfo = sortedInfo || {}

        const columns = [ {
            title: 'Nombre',
            key: 'name',
            dataIndex: 'name',
            sorter: (a, b) => this.sortAlphabetically( a.name, b.name ),
            sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order
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
                      selectClientToEdit( record )
                    }}>
                      Editar
                    </a>
      
                    <Divider type="vertical" />
                    
                    <Popconfirm title="¿Desea eliminar este cliente?" onConfirm={() => { /*TODO: UNCOMMENT TO TEST this.props.deleteSingleUser( record.id )*/ }}> 
                      <a>Eliminar</a>
                    </Popconfirm>
                  </span> 
                </div>
              )
            }
          } ]

          return columns
    }

    sortAlphabetically( a, b ) {
        return (a < b) ? -1 : (a > b) ? 1 : 0
    }

    render() {
        const columns = this.getColumns()

        return(
            <div>
                <Table 
                    rowSelection={this.rowSelection} 
                    className="clients-table" 
                    dataSource={this.props.data} 
                    columns={columns} 
                    onChange={this.handleChange}
                />
            </div>
        )
    }
}

module.exports = ClientsTable