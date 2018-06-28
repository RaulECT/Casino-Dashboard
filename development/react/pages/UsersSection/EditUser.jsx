import React, {Component} from 'react' 
import moment from 'moment'
import {
  Form,
  Modal,
  Input,
  DatePicker,
  Divider,
  Select,
  Row,
  Col,
  Button,
  Icon,
  Popconfirm,
  notification,
  Radio,
  Avatar,
} from 'antd'
import Api from '../../controllers/Api'
import ErrorManagment from '../../controllers/ErrorManagment'
import leftHandImage from '../images/left.png'
import rightHandImage from '../images/right.png'
import Webcam from '../ClientsSection/Webcam.jsx'

const FormItem = Form.Item
const Option = Select.Option
const RadioGroup = Radio.Group

class EditUser extends Component {
  
  constructor( props ) {
    super( props )
    
    this.state = {
      fields: {},
      photo: null,
      isPhotoTaken: false,
      isWebcamShowing: false,
    }

    this.roles = []
    this.api = new Api()
    this.errorManagment = new ErrorManagment()
    this.dateFormat = "YYYY/MM/DD"  
    
    this.editUser = this.editUser.bind(this)
    this.formatValues = this.formatValues.bind( this )
    this.getModalFooter = this.getModalFooter.bind( this )
    this.handleInputChange = this.handleInputChange.bind( this )
    this.setUserValues = this.setUserValues.bind( this )
    this.loadRoles = this.loadRoles.bind( this )
    this.handlePhotoSection = this.handlePhotoSection.bind( this )
    this.getForm = this.getForm.bind( this )
    this.takePhoto = this.takePhoto.bind( this )
    this.getWebcamSection = this.getWebcamSection.bind( this )

    this.loadRoles()
  }

  componentDidMount() {
    this.setUserValues()
  }

  editUser() {
    this.props.form.validateFields( ( err, values ) => {
      if ( !err ) {
        const valuesFormated = this.formatValues( values )
        
        this.api.editUser( valuesFormated )
          .then( response => {
            if ( response.status === 200 ) {
              this.openNotification( 'success', 'Operación exitosa', 'Se ha editado con éxito al empleado.' )
              this.props.close()
            } else {
              this.errorManagment.resolveError(response.data)
            }
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
    const { birthday, role, } = values
    const { fields, isPhotoTaken, photo } = this.state
    const { user } = this.props
    const birthdayString = this.formatDate( birthday.format() )
    const valuesFormated = {
      userId: this.props.user.userId,
      birthday: birthdayString,
      roleId: role
    }

    if ( isPhotoTaken ) {
      valuesFormated['photo'] = photo
    }

    for (const key in fields) {
      if (fields.hasOwnProperty(key) && key !== "" ) {
        if ( fields[key] !== user[key] ) {
          valuesFormated[key] = fields[key]
        }
        
      }
    }

    return valuesFormated
  }

  getModalFooter() {
    return [
      <Button key="2" onClick={ ()=>{ this.props.close() } }>Cancelar</Button>,
      <Popconfirm key="1" title="¿Desea editar este usuario?" onConfirm={ () => { this.editUser() }  }>
        <Button type="primary">Editar usuario</Button>
      </Popconfirm>
    ]
  }

  openNotification( type, message, description ) {
    notification[type]({
      message,
      description
    } )
  }

  setUserValues() {
    const { setFieldsValue } = this.props.form
    const { names, firstSurname, secondSurname, username, email, gender, birthday, roleId } = this.props.user
    const date =  this.formatDate( birthday )

    setFieldsValue( {
      name: names,
      firstName: firstSurname,
      secondName: secondSurname,
      userName: username,
      email: email,
      birthday: moment(date, this.dateFormat),
      genere: gender,
      role: roleId
    } )
  }

  loadRoles() {
    const { roles } = this.props

    roles.map( ( element, index ) => {
      this.roles.push( <Option key={index} value={element.id}>{element.name}</Option> )
    } )
  }

  handleInputChange( e ) {
    let { fields } = this.state

    fields[ e.target.name ] = e.target.value
    this.setState( {fields} )
  }

  handlePhotoSection() {
    const { isWebcamShowing } = this.state

    this.setState( { isWebcamShowing: !isWebcamShowing } )
  }

  getForm() {
    const { getFieldDecorator } = this.props.form
    const { isPhotoTaken, photo, isWebcamShowing } = this.state
    const userImg = isPhotoTaken ? ( <img src={photo} className="photo-client" /> ) : ( <Avatar className="photo-client" size="large" icon="user" /> )
    const style = isWebcamShowing ? { display: 'none' } : {}

    return(
      <div style={ style }>
        <Form layout="inline">
        <Divider orientation="left">Información General</Divider>

        <FormItem style={ { display: 'block' } } >
          <div className="photo-section">
            {userImg}
            <Button onClick={this.handlePhotoSection} icon="picture"> Tomar foto </Button> 
          </div>
        </FormItem>

        <FormItem
          label="Nombre(s):"
          className="edit-user-form"
          style={ {width: '70%'} }
        >
          {getFieldDecorator( 'name', { rules: [ {required: true, message: 'Ingrese un valor!'} ] } )(
            <Input 
              name="names"
              placeholder="Ej. Juan Perez"
              onChange={this.handleInputChange} 
            />
          )}
        </FormItem>

        <FormItem
          label="Apellido Paterno:"
          className="edit-user-form"
        >
          {getFieldDecorator( 'firstName', { rules: [ {required: true, message: 'Ingrese un valor!'} ] } )(
            <Input 
              name="firstSurname"
              placeholder="Ej. Gonzales"
              onChange={this.handleInputChange}  
            />
          )}
        </FormItem>

        <FormItem
          label="Apellido Materno:"
          className="edit-user-form"
        >
          {getFieldDecorator( 'secondName', { rules: [ {required: true, message: 'Ingrese un valor!'} ] } )(
            <Input 
              name="secondSurname"
              placeholder="Ej. Gomez" 
              onChange={this.handleInputChange} 
            />
          )}
        </FormItem>

        <FormItem
          label="Nombre de usuario:"
          className="edit-user-form"
        >
          {getFieldDecorator( 'userName', { rules: [ {required: true, message: 'Ingrese un valor!'} ] } )(
            <Input 
              onChange={this.handleInputChange}  
              name="username"
            />
          )}
        </FormItem>

        <FormItem
          label="E-mail:"
          className="edit-user-form"
        >
          {getFieldDecorator( 'email', { rules: [ { type: 'email', message: 'No es un E-mail correcto!' }, {required: true, message: 'Ingrese un valor!'} ] } )(
             <Input 
              placeholder="correo@correo.com" 
              onChange={this.handleInputChange}  
              name="email"
            />
           
          )}
        </FormItem>

        <FormItem
          label="Contraseña:"
          className="edit-user-form"
        >
          {getFieldDecorator( 'password', { rules: [ {required: false, message: 'Ingrese un Valor!'} ]} )(
            <Input 
              onChange={this.handleInputChange} 
              name="password"
            />
          )}
        </FormItem>

        <FormItem
          label="Repetir Contraseña:"
          className="edit-user-form"
        >
          {getFieldDecorator( 'confirmPassword', { rules: [ {required: false, message: 'Ingrese un Valor!'} ] } )(
            <Input onChange={this.handleInputChange}  />
          )}

        </FormItem>

        <FormItem
          label="Fecha Nacimiento:"
          className="edit-user-form"
        >
          {getFieldDecorator( 'birthday', { rules: [ {required: true, message: 'Ingrese un valor!'} ] } )(
            <DatePicker  placeholder="yyyy/mm/dd" format={this.dateFormat} />
        )}
        </FormItem>

        <FormItem
          label="Rol:"
          className="edit-user-form"
        >
          {getFieldDecorator( 'role', { rules: [ {required: true, message: 'Seleccione un rol!'} ] } )(
            <Select style={{ width: 120 }} >
              { this.roles.map( element => { return element } ) }
            </Select>
          )}
        </FormItem>

        <FormItem
          label="Genero"
          className="edit-user-form"
        >
          {getFieldDecorator( 'genere', { rules: [ {required: true, message: 'Seleccione una opción!'} ] } )(
            <RadioGroup onChange={this.handleInputChange} name="gender" >
              <Radio value={'M'}>Masculino</Radio>
              <Radio value={'F'}>Femenino</Radio>
            </RadioGroup>
          )}
        </FormItem>
      </Form>
    </div>
    )
  }

  getWebcamSection() {
    const { isWebcamShowing } = this.state
    const style = isWebcamShowing ? {} : { display: 'none' }

    return(
      <div style={ style }>
        <Webcam 
          close={ this.handlePhotoSection }
          take={ this.takePhoto }
        />
      </div>
      
    )
  }

  takePhoto( photo ) {
    this.setState( { photo, isPhotoTaken: true, isWebcamShowing: false } )
  }

  render() {
    const { visible, close } = this.props
    const { isWebcamShowing } = this.state
   
    return(
      <Modal
        title="Editar usuario"
        visible={visible}
        width={800}
        style={{ top: 20 }}
        onCancel={close}
        okText="Editar usuario"
        onOk={ ()=>{} }
        footer={ this.getModalFooter() }
      >
        { this.getForm() }
        { this.getWebcamSection() }

      </Modal>
    )
  }
}

const WrappedEditUser = Form.create()(EditUser);
module.exports = WrappedEditUser

