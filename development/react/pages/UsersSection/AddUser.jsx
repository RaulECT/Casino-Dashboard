import React, {Component} from 'react' 
import {
  Form,
  Modal
} from 'antd'

class AddUser extends Component {

  render() {
    const { visible, close } = this.props

    return(
      <Modal
        title="Agregar usuario"
        visible={visible}
        onCancel={close}
      >

      </Modal>
    )
  }
}

const WrappedAddUser = Form.create()(AddUser);
module.exports = WrappedAddUser