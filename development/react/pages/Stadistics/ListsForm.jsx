import React,{Component} from 'react'
import EmailListForm from './EmailListForm.jsx'
import ConfigurationForm from './ConfigurationForm.jsx'
import FinishMessage from './FinishMessage.jsx'
import Api from '../../controllers/Api'
import {
  Card,
  Collapse,
  DatePicker,
  Divider,
  Button,
  Form,
  Icon,
  Input,
  List,
  message,
  Modal,
  Popconfirm,
  Select,
  Steps,
  Switch,
  Tag,
  TimePicker,
  Tooltip
} from 'antd'

const { RangePicker, MonthPicker, WeekPicker } = DatePicker
const { Step } = Steps
const FormItem = Form.Item
const Option = Select.Option
const Panel = Collapse.Panel

class ListsForm extends Component {

  constructor( props ) {
    super( props )

    this.input = null
    this.api = new Api()
    this.state = {
      currentStep: 1,
      listId: "d990c1f4-60e9-45cf-ad96-ffdc70914853",
    }

    this.configEmailList = this.configEmailList.bind( this )
    this.creatEmaiList = this.creatEmaiList.bind( this )
    this.getStepSection = this.getStepSection.bind( this )
    this.nextStep = this.nextStep.bind( this )

  }

  componentDidMount() {
   
    if ( this.props.list ) {
      const { emails, stats, subject } = this.props.list

      this.props.form.setFieldsValue( {subject} )
      this.setState( { emails, stats } )
    }
  }

  creatEmaiList( emailList ) {
    
    //this.nextStep()

    //return false
    this.api.createEmailList( emailList )
      .then( response => {
        console.log( response );
        
        if ( response.status === 200 ) {
          const listId = response.data.result.items[0].id

          this.setState({ listId }, this.nextStep())
        }
      } )
      .catch( err => {
        console.log( err );
        
      } )
  }

  configEmailList( configList ) {
    const { listId } = this.state

    configList['emailListId'] = listId

    console.log( configList );
    this.api.configEmailList( configList )
      .then( response => {
        console.log( response );
        
        if ( response.status === 200 ) {
          this.nextStep()
        }
      } )
      .catch( err => {
        console.log( response );
        
      } )
  }

  getStepSection() {
    const { currentStep } = this.state
    let section = null

    switch ( currentStep ) {
      case 0:
        section = (
          <EmailListForm
            type="add"
            onSubmitList={this.creatEmaiList}
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
          <FinishMessage />
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

  nextStep() {
    let {currentStep} = this.state
    currentStep++

    this.setState( { currentStep } )
  }


  getModalFooter() {
    const { close, confirm, type } = this.props
    const okText = type === 'add' ? 'Crear lista' : 'Editar lista'
    const title = type === 'add' ? '¿Desea crear esta lista?' : '¿Desea editar esta lista?'

    return [
      <Button key="2" onClick={ ()=>{ close() } }>Cancelar</Button>,

    ]
  }


  render() {
    const { close, visible, type } = this.props
    const { getFieldDecorator } = this.props.form
    const {isRecurrent, rangePickerMode, currentStep} = this.state
    const periodicityStyle = isRecurrent ? { display: 'inline-flex' } :  { display: 'none' }
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