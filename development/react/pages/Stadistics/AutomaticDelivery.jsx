import React,{Component} from 'react'
import {
  Button
} from 'antd'
import ListsForm from './ListsForm.jsx'

import '../styles/statsSection.css'

class AutomaticDelivery extends Component {

  constructor( props ) {
    super( props )

    this.state = {
      createListModal: false
    }

    this.createList = this.createList.bind( this )
    this.handleCreateListModal = this.handleCreateListModal.bind( this )
  }

  createList() {

  }

  handleCreateListModal() {
    const { createListModal } = this.state

    this.setState( { createListModal: !createListModal } )
  }

  render() {
    const { createListModal } = this.state

    return(
      <div>
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