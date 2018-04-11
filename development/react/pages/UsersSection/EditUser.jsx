import React, {Component} from 'react' 
import {
  Form,
  Modal,
  Input,
  DatePicker,
  Select,
  Button,
  Popconfirm,
  Radio
} from 'antd'

const FormItem = Form.Item
const Option = Select.Option
const RadioGroup = Radio.Group

class EditUser extends Component {
  
  constructor( props ) {
    super( props )

    this.dateFormat = "DD/MM/YYYY"    
  }

  render() {
    const { visible, close } = this.props
    const { getFieldDecorator } = this.props.form

    return(
      <Modal
        title="Editar usuario"
        visible={visible}
        width={800}
        onCancel={close}
        okText="Editar usuario"
        onOk={ ()=>{} }
      >
        <Form layout="inline">
          
          <FormItem
            label="Nombre(s):"
            className="edit-user-form"
            style={ {width: '70%'} }
          >
            {getFieldDecorator( 'nameEdit', { rules: [ {required: true, message: 'Ingrese un valor!'} ] } )(
              <Input placeholder="Ej. Juan Perez" />
            )}
          </FormItem>

          <FormItem
            label="Apellido Paterno:"
            className="edit-user-form"
          >
            {getFieldDecorator( 'firstNameEdit', { rules: [ {required: true, message: 'Ingrese un valor!'} ] } )(
              <Input placeholder="Ej. Gonzales" />
            )}
          </FormItem>

          <FormItem
            label="Apellido Materno:"
            className="edit-user-form"
          >
            {getFieldDecorator( 'secondNameEdit', { rules: [ {required: true, message: 'Ingrese un valor!'} ] } )(
              <Input placeholder="Ej. Gomez" />
            )}
          </FormItem>

          <FormItem
            label="Nombre de usuario:"
            className="edit-user-form"
          >
            {getFieldDecorator( 'userNameEdit', { rules: [ {required: true, message: 'Ingrese un valor!'} ] } )(
              <Input />
            )}
          </FormItem>

          <FormItem
            label="E-mail:"
            className="edit-user-form"
          >
            {getFieldDecorator( 'emailEdit', { rules: [ { type: 'email', message: 'No es un E-mail correcto!' }, {required: true, message: 'Ingrese un valor!'} ] } )(
               <Input placeholder="correo@correo.com" />
            )}
          </FormItem>

          <FormItem
            label="Contraseña:"
            className="edit-user-form"
          >
            {getFieldDecorator( 'passwordEdit', { rules: [ {required: true, message: 'Ingrese un Valor!'} ]} )(
              <Input/>
            )}
          </FormItem>

          <FormItem
            label="Repetir Contraseña:"
            className="edit-user-form"
          >
            {getFieldDecorator( 'confirmPasswordEdit', { rules: [ {required: true, message: 'Ingrese un Valor!'} ] } )(
              <Input />
            )}
   
          </FormItem>

          <FormItem
            label="Fecha Nacimiento:"
            className="edit-user-form"
          >
            {getFieldDecorator( 'birthdayEdit', { rules: [ {required: true, message: 'Ingrese un valor!'} ] } )(
              <DatePicker placeholder="dd/mm/yyyy" format={this.dateFormat} />
            )}
          </FormItem>

          <FormItem
            label="Rol:"
            className="edit-user-form"
          >
            {getFieldDecorator( 'roleEdit', { rules: [ {required: true, message: 'Seleccione un rol!'} ] } )(
              <Select style={{ width: 120 }}>
                <Option value="rol-1">Rol 1</Option>
              </Select>
            )}
          </FormItem>

          <FormItem
            label="Genero"
            className="edit-user-form"
          >
            {getFieldDecorator( 'genereEdit', { rules: [ {required: true, message: 'Seleccione una opción!'} ] } )(
              <RadioGroup>
                <Radio value={1}>Masculino</Radio>
                <Radio value={2}>Femenino</Radio>
              </RadioGroup>
            )}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

const WrappedEditUser = Form.create()(EditUser);
module.exports = WrappedEditUser

