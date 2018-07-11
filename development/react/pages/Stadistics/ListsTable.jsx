/**
 * Componente que representa a la tabla con las listas de correos registradas
 * @namespace EditList
 * @extends Component
 */
import React, {Component} from 'react' 
import {
  Tag,
  Table
} from 'antd'
import EditList from './EditList.jsx'

class ListsTable extends Component {

  /**
   * Crea el componente
   * @param {Object} props 
   */
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

  /**
   * Función que crea los tags de acuerdo a los emails ingresados por el usuario
   * @param {Array} emails Emails ingresados por el usuario
   * @returns {Array} Array de los tags creados con base a los emails ingresados por el usaurio
   */
  createEmailsTags( emails ) {
    const tags = []

    emails.map( (element, index) => tags.push( <Tag color="geekblue" key={index}>{element}</Tag> ) )

    return tags
  }

  /**
   * Función que crea los tags de acuerdo a las gráficas indicadas por el usuario
   * @param {Array} stats Stats de la lista de correo
   * @returns {Array} Array de tags 
   */
  createStatsTags( stats ) {
    const tags = []

    stats.map( (element, index) => tags.push( <Tag color="purple" key={index}>{element.statName}</Tag> ) )

    return tags 
  }

  /**
   * Función que regresa los columnas de la tabla
   * @returns {Object} Columnas de la tabla
   */
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

  /**
   * Función que maneja la presencia del modal para editar listas de correos
   */
  handleEditModal() {
    const { editModal } = this.state

    this.setState( { editModal: !editModal } )
  }

  /**
   * Función que guarda en el estado el elemento seleccionado por el usuario para editar
   * @param {Object} element Elemento seleccionado por el usuario
   */
  selectElementToEdit( element ) {
    this.setState( { listSelcted: element }, this.handleEditModal() )
  }

  /**
   * Función que prepara la información para enviar a la API
   * @param {Array} emails Emails ingresados por el usuario
   * @param {Array} stats Stats seleccionados por el usuario
   * @param {String} subject Cuerpo del email 
   */
  prepareInfo( emails, stats, subject ) {
    const { listSelcted } = this.state
    const { edit } = this.props
    
    edit( listSelcted.subject, { emails, stats, subject } )
    this.handleEditModal()
  }

  /**
   * Randeriza la vista del componente
   * @returns {String} HTML markup del componente
   */
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