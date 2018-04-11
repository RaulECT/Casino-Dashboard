import React, {Component} from 'react' 
import moment from 'moment'
import Api from '../../controllers/Api'
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

    this.state = {
      roles: []
    }
    
    this.roles = []
    this.api = new Api()
    this.dateFormat = "DD/MM/YYYY"    
    
    this.setUserValues = this.setUserValues.bind( this )

  }

  componentDidMount() {
    this.setUserValues()
  }

  formatDate( date ) {
    const fullDate = date.split('T')[0]
    const dateParts = fullDate.split('-')

    return `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`
  }



  setUserValues() {
    const { setFieldsValue } = this.props.form
    const { names, firstSurname, secondSurname, username, email, gender, birthday } = this.props.user
    const date =  this.formatDate( birthday )

    setFieldsValue( {
      nameEdit: names,
      firstNameEdit: firstSurname,
      secondNameEdit: secondSurname,
      userNameEdit: username,
      emailEdit: email,
      birthdayEdit: moment(date, this.dateFormat),
      genereEdit: gender
    } )
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
              <Input 
                placeholder="Ej. Juan Perez" 
              />
            )}
          </FormItem>

          <FormItem
            label="Apellido Paterno:"
            className="edit-user-form"
          >
            {getFieldDecorator( 'firstNameEdit', { rules: [ {required: true, message: 'Ingrese un valor!'} ] } )(
              <Input 
                placeholder="Ej. Gonzales" 
              />
            )}
          </FormItem>

          <FormItem
            label="Apellido Materno:"
            className="edit-user-form"
          >
            {getFieldDecorator( 'secondNameEdit', { rules: [ {required: true, message: 'Ingrese un valor!'} ] } )(
              <Input 
                placeholder="Ej. Gomez" 
              />
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
                {   }
              </Select>
            )}
          </FormItem>

          <FormItem
            label="Genero"
            className="edit-user-form"
          >
            {getFieldDecorator( 'genereEdit', { rules: [ {required: true, message: 'Seleccione una opción!'} ] } )(
              <RadioGroup>
                <Radio value={'H'}>Masculino</Radio>
                <Radio value={'M'}>Femenino</Radio>
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

