/**
 * Componente que representa a la sección de emails ingresados para crear la lista de correo
 */
import React, {Component} from 'react'
import EmailsTags from './EmailsTags.jsx'
import {
  Button,
  Divider,
  Form, 
  Input,
  message,
  Popconfirm,
} from 'antd'

const FormItem = Form.Item

class EmailListForm extends Component {

  /**
   * Crea el componente
   * @param {Object} props 
   */
  constructor( props ) {
    super( props )

    this.state = {
      emails: []
    }

    this.submitList = this.submitList.bind( this )
    this.updateEmails = this.updateEmails.bind( this )
  }

  /**
   * Función que se ejecuta antes de randerizar la vista
   */
  componentDidMount() {
    const { name } = this.props
    const { setFieldsValue } = this.props.form

    if ( name ) {
      setFieldsValue( { name } )
    }
    
  }

  /**
   * Función que forza el formulario
   */
  submitList() {
    const {validateFields} = this.props.form
    const {emails} = this.state
    const {onSubmitList} = this.props

    validateFields( ( err, values ) => {
      if ( !err ) {
        if ( emails.length > 0 ) {
          onSubmitList( {name: values.name, emails} )
        } else {
          message.error( 'No se ha ingresado ningún correo.' )
        }
      }
    } )
  }

  /**
   * Función que actualiza los emails 
   * @param {Array} emails 
   */
  updateEmails( emails ) {
    this.setState( {emails} )
  }

  /**
   * Randeriza la vista del componente
   * @returns {string} HTML markup
   */
  render() {
    const {getFieldDecorator} = this.props.form
    const {type} = this.props
    const {emails} = this.state
    const okText = type === 'add' ? 'Crear lista' : 'Editar lista'
    const title = type === 'add' ? '¿Desea crear esta lista?' : '¿Desea editar esta lista?'

    return(
      <Form style={ {marginTop: 30} }>
        <FormItem
          label="Nombre de la lista:"
          className="subject-field"
        >
          {
            getFieldDecorator( 'name', { rules: [{required: true, message: 'Ingrese un valor!'}] } )(
              <Input placeholder="" style={ {width: 500} } />
            ) }
        </FormItem>

        <Divider orientation="left">Emails</Divider>
        <EmailsTags 
          onUpdateEmails={this.updateEmails}
          emails={emails}
        />

        <FormItem style={ {marginBottom: -10} }>
          <Popconfirm key="1" title={title} onConfirm={ ()=>{ this.submitList() } }>
            <Button 
              type="primary"
              style={ {marginTop: 70} }
              icon="plus"
            >
              {okText}
            </Button>
          </Popconfirm>

        </FormItem>

      </Form>
    )
  }
}

const WrappedEmailListForm = Form.create()(EmailListForm);
module.exports = WrappedEmailListForm