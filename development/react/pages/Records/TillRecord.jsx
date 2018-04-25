import React, {Component} from 'react' 
import {
  Button,
  Divider,
  Popconfirm,
  Table
} from 'antd'
import Api from '../../controllers/Api'

class TillRecord extends Component {
  constructor( props ) {
    super( props )

    this.state = {
      sortedInfo: null,
      records: []
    }

    this.api = new Api()

    this.getColumns = this.getColumns.bind( this )
    this.loadTillLog = this.loadTillLog.bind( this )
    this.handleChange = this.handleChange.bind( this )
  }

  componentWillMount() {
    this.loadTillLog()
  }

  handleChange( pagination, filters, sorter ) {
    const { records } = this.state

    this.setState({
      sortedInfo: sorter,
      records
    })
  }

  getColumns() {
    let { sortedInfo } = this.state

    sortedInfo = sortedInfo || {}

    const columns = [ {
      title: 'Operación',
      key: 'type',
      dataIndex: 'type',
      sorter: (a, b) => this.sortAlphabetically( a.type, b.type ),
      sortOrder: sortedInfo.columnKey === 'type' && sortedInfo.order
    },
    {
      title: 'Método de pago',
      key: 'paymentMethod',
      dataIndex: 'paymentMethod',
      sorter: (a, b) => this.sortAlphabetically( a.paymentMethod, b.paymentMethod ),
      sortOrder: sortedInfo.columnKey === 'paymentMethod' && sortedInfo.order
    },
    {
      title: 'Cantidad',
      key: 'amount',
      dataIndex: 'amount',
      sorter: (a, b) => this.sortAlphabetically( a.amount, b.amount ),
      sortOrder: sortedInfo.columnKey === 'amount' && sortedInfo.order
    },
    {
      title: 'Fecha',
      key: 'createdOn',
      dataIndex: 'createdOn',
      sorter: (a, b) => this.sortAlphabetically( a.createdOn, b.createdOn ),
      sortOrder: sortedInfo.columnKey === 'createdOn' && sortedInfo.order
    },
    {
      title: 'Caja',
      key: 'till',
      dataIndex: 'till',
      sorter: (a, b) => this.sortAlphabetically( a.till, b.till ),
      sortOrder: sortedInfo.columnKey === 'till' && sortedInfo.order
    },
    {
      title: 'Cajero',
      key: 'cashier',
      dataIndex: 'cashier',
      sorter: (a, b) => this.sortAlphabetically( a.cashier, b.cashier ),
      sortOrder: sortedInfo.columnKey === 'cashier' && sortedInfo.order
    },
    {
      title: 'Cliente',
      key: 'from',
      dataIndex: 'from',
      sorter: (a, b) => this.sortAlphabetically( a.from, b.from ),
      sortOrder: sortedInfo.columnKey === 'from' && sortedInfo.order
    } ]

    return columns
  }

  sortAlphabetically( a, b ) {
    return (a < b) ? -1 : (a > b) ? 1 : 0
  }

  loadTillLog() {
    const { sortedInfo } = this.state

    this.api.getTillLog()
      .then( response => {

        if ( response.status === 200 ) {
          const records = response.data.result.items 

          records.map( ( element, index ) => {
            element.key = index
            element.createdOn = element.createdOn.format().split('T')[0]
          } )

          this.setState( {
            records: records,
            sortedInfo
          } )
        }
      } )
      .catch( err => {

      } )
  }

  render() {
    const columns = this.getColumns()

    return(
      <div style={{width: '100%'}}>
        <Table
          columns={columns}
          dataSource={this.state.records}
        />
      </div>
    )
  }
}

module.exports = TillRecord