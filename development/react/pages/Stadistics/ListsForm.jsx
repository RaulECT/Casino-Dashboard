/**
 * Función que representa al modal para crear y configurar listas de correos
 * @namespace ListsForm
 * @extends Component
 */
import React,{Component} from 'react'
import EmailListForm from './EmailListForm.jsx'
import ConfigurationForm from './ConfigurationForm.jsx'
import FinishMessage from './FinishMessage.jsx'
import Api from '../../controllers/Api'
import ErrorManagment from '../../controllers/ErrorManagment'
import {
  Button,
  Form,
  Modal,
  Steps,
} from 'antd'

const { Step } = Steps

class ListsForm extends Component {

  /**
   * Crea el componente
   * @param {object} props 
   */
  constructor( props ) {
    super( props )

    this.input = null
    this.api = new Api()
    this.errorManagment = new ErrorManagment()
    this.state = {
      currentStep: 0,
      listId: null,
    }

    this.configEmailList = this.configEmailList.bind( this )
    this.creatEmaiList = this.creatEmaiList.bind( this )
    this.getStepSection = this.getStepSection.bind( this )
    this.nextStep = this.nextStep.bind( this )
    this.reset = this.reset.bind( this )
  }

  /**
   * Función que le envia a la API la información para crear la lista de corro
   * @param {Array} emailList Listas de correos ingresados por el usuario 
   */
  creatEmaiList( emailList ) {
    
    this.api.createEmailList( emailList )
      .then( response => {

        
        if ( response.status === 200 ) {
          const listId = response.data.result.items[0].id

          this.setState({ listId }, this.nextStep())
        }
      } )
      .catch( err => {
        console.log( err );
        
      } )
  }

  /**
   * Función que envia a la API la información para configurar las listas de correos
   * @param {Object} configList Configuración de la lista de corro 
   */
  configEmailList( configList ) {
    const { listId } = this.state
    const { updateLists } = this.props

    configList['emailListId'] = listId

    this.api.configEmailList( configList )
      .then( response => {
        console.log( response )
        if ( response.status === 200 ) {
          updateLists()
          this.nextStep()
        } else {
          this.errorManagment.resolveError( response.data )
        }
      } )
      .catch( err => {
        console.log( err );
        
      } )
  }

  /**
   * Función que regresa la sección de acuerdo al paso en que el usaurio se encuentre
   * @returns {JSX} Sección a mostrar al usuario
   */
  getStepSection() {
    const { currentStep } = this.state
    const { close, list } = this.props
    let section = null

    switch ( currentStep ) {
      case 0:
        section = (
          <EmailListForm
            type="add"
            onSubmitList={this.creatEmaiList}
            list={list}
          />)
        break;

      case 1:
        section = ( 
          <ConfigurationForm 
            onConfig={this.configEmailList}
          /> 
        )
        break;
      
      case 2: 
        section = (
          <FinishMessage
            onClose={close}
            onReset={this.reset}
          />
        )
        break;

      default:
        section = ( 
          <ConfigurationForm 
            onConfig={this.configEmailList}
          /> 
        )
        break;
    }

    return section
  }

  /**
   * Función que cambia a la siguiente sección
   */
  nextStep() {
    let {currentStep} = this.state
    currentStep++

    this.setState( { currentStep } )
  }

  /**
   * Función que regresa el footer del modal
   * @returns {Array} Opciones del modal
   */
  getModalFooter() {
    const { close,} = this.props
   
    return [
      <Button key="2" onClick={ ()=>{ close() } }>Cancelar</Button>,

    ]
  }

  /**
   * Función que resetea los pasos
   */
  reset() {
    this.setState( { currentStep: 0 } )
  }

  /**
   * Randeriza la vista del componente
   * @returns {String} HTML markup del componente
   */
  render() {
    const { close, visible, type } = this.props
    const { currentStep} = this.state
    const title = type === 'add' ? 'Crear nueva lista' : 'Editar lista'
    const section = this.getStepSection()

    return(
      <Modal
        title={title}
        visible={visible}
        style={{ top: 20 }}
        width={1000}
        onCancel={close}
        footer={ this.getModalFooter() }
      >
        <Steps current={currentStep}>
          <Step title="Crear Lista de Correo" description="" />
          <Step title="Configurar Lista de Correo" description="" />
          <Step title="Listo!" description="" />
        </Steps>


        {section}


      </Modal>
    )
  }
}

const WrappedListsForm = Form.create()(ListsForm);
module.exports = WrappedListsForm