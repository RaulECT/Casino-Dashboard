import React, {Component} from 'react'
import {
  Modal,
  Button,
  notification,
} from 'antd'
import EmailListForm from './EmailListForm.jsx'
import Api from '../../controllers/Api'
import ErrorManagment from '../../controllers/ErrorManagment'

class EditList extends Component {
  constructor( props ) {
    super( props )

    this.api = new Api()
    this.errorManagment = new ErrorManagment()
    this.state = {
      visible: true,
    }

    this.closeModal = this.closeModal.bind( this )
    this.getModalFooter = this.getModalFooter.bind( this )
    this.editList = this.editList.bind( this )
  }

  closeModal() {
    this.setState( { visible: false } )
  }

  getModalFooter() {
    const { close } = this.props

    return[
      <Button key="1" onClick={ () => { close() } }>Cancelar</Button>
    ]
  }

  editList( listInfo ) {
    const { list, close } = this.props
    listInfo.id = list.id

    this.api.editEmailList( listInfo )
      .then( response =>{

        if ( response.status === 200 ) {
          notification['success']({
            message: 'Operación éxitosa',
            description: 'Se ha actualizado con éxito la lista de correos.',
          })

          close()
        } else {
          this.errorManagment.resolveError( response.data )
        }
      } )
      .catch( err => console.log( err ) )
  }

  render() {
    const { visible } = this.state
    const { list, close } = this.props

    return(
      <Modal
        title="Editar lista"
        visible={ visible }
        style={ { top: 20 } }
        width={1000}
        onCancel={ () => close() }
        footer={ this.getModalFooter() }
      >
        <EmailListForm 
          type="edit"
          onSubmitList={this.editList}
          list={ [] }
          name={ list.name }
        />
      </Modal>
    )
  }
}

module.exports = EditList