import React, {Component} from 'react'
import EmailsTags from './EmailsTags.jsx'
import {
  Divider,
  Form, 
  Input
} from 'antd'

const FormItem = Form.Item

class EmailListForm extends Component {
  constructor( props ) {
    super( props )

    this.state = {
      emails: []
    }

    this.updateEmails = this.updateEmails.bind( this )
  }

  updateEmails( emails ) {
    this.setState( {emails} )
  }

  render() {
    const {getFieldDecorator} = this.props.form
    const {emails} = this.state

    return(
      <Form>
        <FormItem
          label="Asunto del correo:"
          className="subject-field"
        >
          {
            getFieldDecorator( 'subject', { rules: [{required: true, message: 'Ingrese un valor!'}] } )(
              <Input placeholder="" style={ {width: 500} } />
            ) }
        </FormItem>

        <Divider orientation="left">Emails</Divider>
        <EmailsTags 
          onUpdateEmails={this.updateEmails}
          emails={emails}
        />

      </Form>
    )
  }
}

const WrappedEmailListForm = Form.create()(EmailListForm);
module.exports = WrappedEmailListForm