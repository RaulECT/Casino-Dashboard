import React, {Component} from 'react'
import {
  Icon,
  Input,
  message,
  Tag,
  Tooltip
} from 'antd'

class EmailsTags extends Component {
  constructor( props ) {
    super( props )

    this.state = {
      emailInputValue: '',
      emailInputVisible: false
    }

    this.handleCloseTag = this.handleCloseTag.bind( this )
    this.handleEmailInputConfirm = this.handleEmailInputConfirm.bind( this )
    this.handelEmailInputChange = this.handelEmailInputChange.bind( this )
    this.showEmailInput = this.showEmailInput.bind( this )
  }

  handleCloseTag( removedEmail ) {
    const emails = this.props.emails.filter( email => email !== removedEmail )
    
    this.props.onUpdateEmails( emails )
  }

  handleEmailInputConfirm() {
    const state = this.state
    const inputValue = state.emailInputValue
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    let emails = this.props.emails

    if ( inputValue && emails.indexOf( inputValue ) === -1 && re.test( inputValue ) ) {
      emails = emails.concat( inputValue )
    } else {
      message.error( 'Correo repetido o no cumple con el formato de un correo electronico.', 5 )
    }
    
    this.setState( { emailInputVisible: false, emailInputValue: '' }, this.props.onUpdateEmails( emails ) )
    
  }

  handelEmailInputChange( e ) {
    this.setState( { emailInputValue: e.target.value } )
  }

  showEmailInput() {
    this.setState( { emailInputVisible: true } )
  }

  render() {
    const {emails} = this.props
    const { emailInputValue, emailInputVisible } = this.state

    return(
      <div>
        {emails.map( (email, index) => {
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
            style={ {width: 220} }
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
}

module.exports = EmailsTags