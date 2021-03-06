import React, {Component} from 'react' 
import {
  Button,
  Divider,
  Popconfirm,
  Tag,
  Table
} from 'antd'
import ListsForm from './ListsForm.jsx'
import EditList from './EditList.jsx'

class ListsTable extends Component {

  constructor( props ) {
    super( props )

    this.state = {
      editModal: false,
      listSelcted: null
    }

    this.rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => this.props.selectList( selectedRows )
    }

    this.handleEditModal = this.handleEditModal.bind( this )
    this.prepareInfo = this.prepareInfo.bind( this )
    this.selectElementToEdit = this.selectElementToEdit.bind( this )
  }

  createEmailsTags( emails ) {
    const tags = []

    emails.map( (element, index) => tags.push( <Tag color="geekblue" key={index}>{element}</Tag> ) )

    return tags
  }

  createStatsTags( stats ) {
    const tags = []

    stats.map( (element, index) => tags.push( <Tag color="purple" key={index}>{element.statName}</Tag> ) )

    return tags 
  }

  getColumns() {

    return [ {
      title: 'Nombre',
      key: 'name',
      dataIndex: 'name'
    }, {
      title: 'Fecha de creación',
      key: 'createdDate',
      dataIndex: 'createdDate'
    },{
      title: 'Operaciones',
      key: 'operations',
      render: ( text, record ) => {
        return(
          <a onClick={ ()=>{ this.selectElementToEdit( record ) } }>Editar</a>
        )
      }
    } ]
  }

  handleEditModal() {
    const { editModal } = this.state

    this.setState( { editModal: !editModal } )
  }

  selectElementToEdit( element ) {
    this.setState( { listSelcted: element }, this.handleEditModal() )
  }

  prepareInfo( emails, stats, subject ) {
    const { listSelcted } = this.state
    const { edit } = this.props
    
    edit( listSelcted.subject, { emails, stats, subject } )
    this.handleEditModal()
  }

  render() {
    const columns = this.getColumns()
    const {editModal, listSelcted} = this.state
    const { data } = this.props
    const listForm = editModal ? (
      <EditList 
        visible={editModal}
        list={listSelcted}
        close={this.handleEditModal}
      />
    ) : ''

    return(
      <div>
        <Table 
          rowSelection={this.rowSelection}
          columns={columns}
          dataSource={data}
        />

        {listForm}
      </div>
    )
  }
}

module.exports = ListsTable