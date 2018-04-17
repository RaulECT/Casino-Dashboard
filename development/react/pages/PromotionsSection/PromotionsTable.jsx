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

    sortedInfo = sortedInfo || {}
    filteredInfo = filteredInfo || {}

    const columns = [ {
      title: 'Nombre',
      key: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => this.sortAlphabetically( a.name, b.name ),
      sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order
    }, 
    {
      tile: 'Activa',
      key: 'active',
      dataIndex: 'active',
      filteredValue: filteredInfo.active,
      onFilter: ( value, record ) => record.roleName.includes(value),
      sorter: (a, b) => this.sortAlphabetically( a.active, b.active ),
      sortOrder: sortedInfo.columnKey === 'active' && sortedInfo.order
    } ]

    return columns
  }

  sortAlphabetically( a, b ) {
    return (a < b) ? -1 : (a > b) ? 1 : 0
  }
}

module.exports = PromotionsTable