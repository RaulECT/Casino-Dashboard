import React,{Component} from 'react'
import {
  Button,
  Form,
  Icon,
  Input,
  Modal,
  Popconfirm,
  Tag,
  Tooltip
} from 'antd'

const FormItem = Form.Item

class ListsForm extends Component {

  constructor( props ) {
    super( props )

    this.input = null
    this.state = {
      emails: [],
      emailInputVisible: false,
      emailInputValue: ''
    }

    this.handleCloseTag = this.handleCloseTag.bind( this )
    this.handelEmailInputChange = this.handelEmailInputChange.bind( this )
    this.handleEmailInputConfirm = this.handleEmailInputConfirm.bind( this ) 
    this.showEmailInput = this.showEmailInput.bind( this )
    this.saveInputRef = this.saveInputRef.bind( this )
  }

  handleCloseTag( removedEmail ) {
    const emails = this.state.emails.filter( email => email !== removedEmail )
    console.log( emails );
    this.setState( {emails} )
  }

  handelEmailInputChange( e ) {
    this.setState( { emailInputValue: e.target.value } )
  }

  handleEmailInputConfirm() {
    const state = this.state
    const inputValue = state.emailInputValue
    let emails = state.emails

    if ( inputValue && emails.indexOf( inputValue ) === -1 ) {
      emails = emails.concat( inputValue )
    }

    console.log( emails );
    this.setState( {
      emails,
      emailInputVisible: false,
      emailInputValue: ''
    } )
    
  }

  showEmailInput() {
    this.setState( { emailInputVisible: true } )
  }

  saveInputRef(input) {
    this.input = input
  }

  getEmailsSection() {
    const { emails, emailInputValue, emailInputVisible } = this.state

    return (
      <div>
        { emails.map( (email, index) => {
          const tagElement = (
            <Tag key={email} closable afterClose={ () => { this.handleCloseTag( email ) } }>
              {email}
            </Tag>
          )

          return <Tooltip title={email} key={email}>{tagElement}</Tooltip>
        } )}

        { emailInputVisible && (
          <Input 
            ref={ (input) => { this.input = input } }
            type="text"
            size="small"
            style={ {width: 78} }
            value={emailInputValue}
            onChange={this.handelEmailInputChange}
            onBlur={this.handleEmailInputConfirm}
            onPressEnter={this.handleEmailInputConfirm}
          />
        ) }
        { !emailInputVisible && (
          <Tag
            onClick={this.showEmailInput}
            style={{ background: '#fff', borderStyle: 'dashed' }}
          >
            <Icon type="plus" /> Agregar Email
          </Tag>
        )
        }
      </div>
    )
  }

  getModalFooter() {
    const { close, confirm, type } = this.props
    const okText = type === 'add' ? 'Crear lista' : 'Editar lista'
    const title = type === 'add' ? '¿Desea crear esta lista?' : '¿Desea editar esta lista?'

    return [
      <Button key="2" onClick={ ()=>{ close() } }>Cancelar</Button>,
      <Popconfirm key="1" title={title} onConfirm={ ()=>{ confirm() } }>
        <Button type="primary"> {okText} </Button>
      </Popconfirm>
    ]
  }

  render() {
    const { close, visible, type } = this.props
    const title = type === 'add' ? 'Crear nueva lista' : 'Editar lista'

    return(
      <Modal
        title={title}
        visible={visible}
        width={800}
        onCancel={close}
        footer={ this.getModalFooter() }
      >
        <Form>
          <FormItem
            label="Emails:"
          >
            {this.getEmailsSection()}
          </FormItem>
        </Form>

      </Modal>
    )
  }
}

const WrappedListsForm = Form.create()(ListsForm);
module.exports = WrappedListsForm