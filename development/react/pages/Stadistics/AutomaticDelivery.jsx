import React,{Component} from 'react'
import {
  Button
} from 'antd'
import ListsForm from './ListsForm.jsx'
import ListsTable from './ListsTable.jsx'

import '../styles/statsSection.css'

class AutomaticDelivery extends Component {

  constructor( props ) {
    super( props )

    this.state = {
      createListModal: false,
      lists: []
    }

    this.createList = this.createList.bind( this )
    this.editList = this.editList.bind( this )
    this.handleCreateListModal = this.handleCreateListModal.bind( this )
  }

  createList( emails, stats, subject ) {
    let { lists } = this.state

    this.setState( {
      lists: lists.concat( { emails, stats, subject } ),
      createListModal: false
    } )
  }

  editList( list, newInfo ) {
    let { lists } = this.state
    
    const idx = lists.map( e => { return e.subject }).indexOf( list )
    lists[idx] = newInfo

    this.setState( { lists } )
  }

  handleCreateListModal() {
    const { createListModal } = this.state

    this.setState( { createListModal: !createListModal } )
  }

  render() {
    const { createListModal, lists } = this.state

    return(
      <div>
        <ListsTable 
          data={lists}
          edit={this.editList}
        />

        <Button
          type="primary"
          icon="push"
          onClick={this.handleCreateListModal}
        >
          Crear nueva lista
        </Button>
        
        <Button
          type="danger"
          icon="delete"
        >
          Eliminar (0) seleccionadas
        </Button>

        <ListsForm
          visible={createListModal}
          type="add"
          confirm={this.createList}
          close={this.handleCreateListModal}
        />
      </div>
     
    )
  }
}

module.exports = AutomaticDelivery