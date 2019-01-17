import React, { Component } from 'react'

import { Table } from 'antd'

class CasinosTable extends Component {

  getColumns = () => {
    return [ { 
        title: 'Nombre',
        key: 'name',
        dataIndex: 'name'
      }, 
      {
        title: 'Dirección',
        key: 'address',
        dataIndex: 'address'
      },
      {
        title: 'Teléfono',
        key: 'phone',
        dataIndex: 'phone'
      }  
    ]
  }

  render() {
    return(
      <Table 
        columns={ this.getColumns() }
        dataSource={ this.props.casinos }
      />
    )
  }
}

export default CasinosTable