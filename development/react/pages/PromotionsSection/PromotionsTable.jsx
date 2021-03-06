import React, {Component} from 'react' 
import {
  Button,
  Divider,
  Popconfirm,
  Table
} from 'antd'

class PromotionsTable extends Component {
  constructor( props ) {
    super( props )

    this.activeFilter = [
      { text: 'activo', value: true },
      { text: 'inactivo', value: false }
    ]

    this.state = {
      filteredInfo: null,
      sortedInfo: null
    }

    this.rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => console.log( selectedRows ) 
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
    const { showEditSection, selectPromToEdit } = this.props

    sortedInfo = sortedInfo || {}
    filteredInfo = filteredInfo || {}

    const columns = [ {
      title: 'Nombre',
      key: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => this.sortAlphabetically( a.name, b.name ),
      sortOrder: sortedInfo.columnKey === 'Name' && sortedInfo.order
    }, 
    {
      title: 'Activa',
      key: 'active',
      dataIndex: 'active',
      sorter: (a, b) => this.sortAlphabetically( a.active, b.active ),
      sortOrder: sortedInfo.columnKey === 'active' && sortedInfo.order
    },
    {
      title: 'Monto máx',
      key: 'Max',
      dataIndex: 'valueMax',
      sorter: (a, b) => {return a.valueMax - b.valueMax},
      sortOrder: sortedInfo.columnKey === 'Max' && sortedInfo.order
    },
    {
      title: 'Monto min',
      key: 'Min',
      dataIndex: 'valueMin',
      sorter: ( a, b ) => a.valueMin - b.valueMin,
      sortOrder: sortedInfo.columnKey === 'Min' && sortedInfo.order
    },
    {
      title: 'Vigencia',
      key: 'vigencia',
      dataIndex: 'timeLimit',
      sorter: ( a, b ) => a < b,
      sortOrder: sortedInfo.columnKey === 'vigencia' && sortedInfo.order
    },
    {
      title: 'Opciones',
      dataIndex: 'operation',
      render: (text, record) => {
        return (
          <div className="editable-row-operations">
            <span>
              <a onClick={() => { 
                //showEditSection()  
                selectPromToEdit( record )
              }}>
                Editar
              </a>

              <Divider type="vertical" />
              
              <Popconfirm title="¿Desea desactivar esta promoción?" onConfirm={() => { this.props.deactivePromotion( record.id ) }}> 
                <a>Desactivar</a>
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
      <div style={{ width: '100%' }}>
        <div className="table-operations">
          <Button onClick={ this.clearAll }>Reestrablecer filtros</Button>
        </div>

        <Table 
          rowSelection={this.rowSelection} 
          className="proms-table" 
          dataSource={this.props.data} 
          columns={columns} 
          onChange={this.handleChange}
        />
      </div>
    )
  }
}

module.exports = PromotionsTable