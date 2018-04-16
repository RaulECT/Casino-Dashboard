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

class AddUser extends Component {

  constructor( props ) {
    super( props )

    this.dateFormat = "DD/MM/YYYY"
    this.roles = []

    this.createUser = this.createUser.bind( this )
    this.loadRoles = this.loadRoles.bind( this )
  }

  componentWillReceiveProps() {
    this.loadRoles()
  }

  createUser() {
    this.props.form.validateFields( ( err, values ) => {
      if ( !err ) {

        const valuesFormated = this.formatValues( values )
        console.log(valuesFormated);
        
        //return false
        this.props.createUser( valuesFormated )
          .then( response => {
            console.log(response);
            
          } )
          .catch( err => {
            console.log(err);
            
          } )
        
      }
    } )
  }

  formatDate( date ) {
    const fullDate = date.split('T')[0]
    const dateParts = fullDate.split('-')

    return `${dateParts[0]}/${dateParts[1]}/${dateParts[2]}`
  }

  formatValues( values ) {
    const { birthday, email, firstName, genere, name, password, role, secondName, userName } = values
    
    const birthdayString = this.formatDate( birthday.format() )
    console.log(birthday.format());
    
    const valuesFormated = {
      username: userName,
      names: name,
      firstSurname: firstName,
      secondSurname: secondName,
      email: email,
      password: password,
      fingerprints: { RINDEX:["/6D/qAB8TklTVF...", "/6D/qAB8TklTVF...", "/6D/qAB8TklTVF...", "/6D/qAB8TklTVF..."], LINDEX:["/6D/qAB4TklTVF...", "/6D/qAB4TklTVF...", "/6D/qAB4TklTVF...", "/6D/qAB4TklTVF..."] },
      roleId: role,
      gender: genere,
      birthday: birthdayString
    }

    return valuesFormated
  }

  getModalFooter() {
    return [
      <Button key="2" onClick={ ()=>{ this.props.close() } }>Cancelar</Button>,
      <Popconfirm key="1" title="¿Desea crear este usuario?" onConfirm={ () => { this.createUser() }  }>
        <Button type="primary">Crear usuario</Button>
      </Popconfirm>
    ]
  }

  loadRoles() {
    const { roles } = this.props

    roles.map( ( element, index ) => this.roles.push( <Option key={index} value={element.id}>{element.name}</Option> ) )
  }

  render() {
    const { visible, close } = this.props
    const { getFieldDecorator } = this.props.form
    

    return(
      <Modal
        title="Agregar usuario"
        visible={visible}
        width={800}
        onCancel={close}
        okText="Crear rol"
        onOk={ ()=>{} }
        footer={ this.getModalFooter() }
      >
        <Form layout="inline">
          
          <FormItem
            label="Nombre(s):"
            className="add-user-form"
            style={ {width: '70%'} }
          >
            {getFieldDecorator( 'name', { rules: [ {required: true, message: 'Ingrese un valor!'} ] } )(
              <Input placeholder="Ej. Juan Perez" />
            )}
          </FormItem>

          <FormItem
            label="Apellido Paterno:"
            className="add-user-form"
          >
            {getFieldDecorator( 'firstName', { rules: [ {required: true, message: 'Ingrese un valor!'} ] } )(
              <Input placeholder="Ej. Gonzales" />
            )}
          </FormItem>

          <FormItem
            label="Apellido Materno:"
            className="add-user-form"
          >
            {getFieldDecorator( 'secondName', { rules: [ {required: true, message: 'Ingrese un valor!'} ] } )(
              <Input placeholder="Ej. Gomez" />
            )}
          </FormItem>

          <FormItem
            label="Nombre de usuario:"
            className="add-user-form"
          >
            {getFieldDecorator( 'userName', { rules: [ {required: true, message: 'Ingrese un valor!'} ] } )(
              <Input />
            )}
          </FormItem>

          <FormItem
            label="E-mail:"
            className="add-user-form"
          >
            {getFieldDecorator( 'email', { rules: [ { type: 'email', message: 'No es un E-mail correcto!' }, {required: true, message: 'Ingrese un valor!'} ] } )(
               <Input placeholder="correo@correo.com" />
            )}
          </FormItem>

          <FormItem
            label="Contraseña:"
            className="add-user-form"
          >
            {getFieldDecorator( 'password', { rules: [ {required: true, message: 'Ingrese un Valor!'} ]} )(
              <Input/>
            )}
          </FormItem>

          <FormItem
            label="Repetir Contraseña:"
            className="add-user-form"
          >
            {getFieldDecorator( 'confirmPassword', { rules: [ {required: true, message: 'Ingrese un Valor!'} ] } )(
              <Input />
            )}
   
          </FormItem>

          <FormItem
            label="Fecha Nacimiento:"
            className="add-user-form"
          >
            {getFieldDecorator( 'birthday', { rules: [ {required: true, message: 'Ingrese un valor!'} ] } )(
              <DatePicker placeholder="dd/mm/yyyy" format={this.dateFormat} />
            )}
          </FormItem>

          <FormItem
            label="Rol:"
            className="add-user-form"
          >
            {getFieldDecorator( 'role', { rules: [ {required: true, message: 'Seleccione un rol!'} ] } )(
              <Select style={{ width: 120 }}>
                { this.roles.map( element => { return element } ) }
              </Select>
            )}
          </FormItem>

          <FormItem
            label="Genero"
            className="add-user-form"
          >
            {getFieldDecorator( 'genere', { rules: [ {required: true, message: 'Seleccione una opción!'} ] } )(
              <RadioGroup>
                <Radio value={'M'}>Masculino</Radio>
                <Radio value={'F'}>Femenino</Radio>
              </RadioGroup>
            )}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

const WrappedAddUser = Form.create()(AddUser);
module.exports = WrappedAddUser