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
  constructor( props ) {
    super( props )

    this.state = {
      emails: []
    }

    this.submitList = this.submitList.bind( this )
    this.updateEmails = this.updateEmails.bind( this )
  }

  componentDidMount() {
    const { list } = this.props
    if (list) {
      console.log( list )
    }
    
  }

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

  updateEmails( emails ) {
    this.setState( {emails} )
  }

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