import React, {Component} from 'react' 
import moment from 'moment'
import {
  Form,
  Modal,
  Input,
  Row,
  Col,
  DatePicker,
  Divider,
  Select,
  Button,
  Icon,
  Popconfirm,
  Radio,
  notification,
  Avatar,
} from 'antd'
import Api from '../../controllers/Api'
import FingerprintSDKTest from '../../controllers/FingerprintSDKTest'
import ErrorManagment from '../../controllers/ErrorManagment'
import leftHandImage from '../images/left.png'
import rightHandImage from '../images/right.png'
import Webcam from '../ClientsSection/Webcam.jsx'

const FormItem = Form.Item
const Option = Select.Option
const RadioGroup = Radio.Group

class AddUser extends Component {

  constructor( props ) {
    super( props )

    this.state = {
      hand: { left:{}, right: {} },
      fingerSelcted: { hand:'', index: -1 },
      reading: false,
      roles: [],
      photo: null,
      isPhotoTaken: false,
      isWebcamShowing: false,
    }

    this.handleFingerprintErr = this.handleFingerprintErr.bind(this)
    this.test = new FingerprintSDKTest( this.handleFingerprintErr )
    this.errorManagment = new ErrorManagment()
    this.dateFormat = "DD/MM/YYYY"
    this.roles = []
    this.api = new Api()

    this.createUser = this.createUser.bind( this )
    this.checkFinger = this.checkFinger.bind( this )
    this.getCheckIcon = this.getCheckIcon.bind( this )
    this.loadRoles = this.loadRoles.bind( this )
    this.readFinger = this.readFinger.bind( this )
    this.handlePhotoSection = this.handlePhotoSection.bind( this )
    this.getForm = this.getForm.bind( this )
    this.getWebCamSection = this.getWebCamSection.bind( this )
    this.takePhoto = this.takePhoto.bind( this )
    this.resetForm = this.resetForm.bind( this )
  }

  componentWillReceiveProps() {
    //this.loadRoles()
  }

  componentWillMount() {
    this.api.getRoles()
      .then( response => {
  
        let roles = []
        const { rolesArray } = response.data.result

        rolesArray.map( (element => roles.push( { id: element.id, name: element.name } ) ) )
        
        this.setState( {roles} )

      } )
  }

  createUser() {
    const { isPhotoTaken } = this.state

    this.props.form.validateFields( ( err, values ) => {
      if ( !err && isPhotoTaken ) {

        const valuesFormated = this.formatValues( values )
        
        //return false
        this.props.createUser( valuesFormated )
          .then( response => {
            console.log( valuesFormated, response );
            
            if ( response.status === 200 ) {
              this.openNotification( 'success', 'Operación exitosa', 'Se ha creado con éxito al nuevo empleado.' )
              this.resetForm()
            } else {
              this.errorManagment.resolveError( response.data )
            }
          } )
          .catch( err => {
            console.log(err);
            
          } )
        
      }
    } )
  }

  checkFinger() {
    const { hand, fingerSelcted } = this.state
    const handUpdated = hand
    const data = this.test.getData()
    
    if ( data.success ) {
      this.test.stopCapture()
      handUpdated[fingerSelcted.hand][fingerSelcted.index] = data.samples

      this.setState( {
        fingerSelcted,
        hand: handUpdated,
        reading: false
      } )

      this.formatFingersData( handUpdated )
    } else {
      this.test.stopCapture()
      this.setState( { reading: false } )
    }
  }

  formatDate( date ) {
    const fullDate = date.split('T')[0]
    const dateParts = fullDate.split('-')

    return `${dateParts[0]}/${dateParts[1]}/${dateParts[2]}`
  }

  formatFingersData( fingerData ) {
    let dataFormated = { RINDEX: [], LINDEX:[] }
    const left = fingerData.left
    const right = fingerData.right

    for (var key in left) {
      if (left.hasOwnProperty(key)) {
          dataFormated.LINDEX.push( left[key] )
      }
    }

    for (var key in right) {
      if (right.hasOwnProperty(key)) {
          dataFormated.RINDEX.push( right[key] )
      }
    }
  }

  formatValues( values ) {
    const { birthday, email, firstName, genere, name, password, role, secondName, userName } = values
    const {hand, photo} = this.state
    const lIndex = [] 
    const rIndex = []
    const birthdayString = this.formatDate( birthday.format() )

    for (var key in hand.left) {
      if (hand.left.hasOwnProperty(key)) {
          lIndex.push( hand.left[key] )
      }
    }

    for (var key in hand.right) {
      if (hand.right.hasOwnProperty(key)) {
          rIndex.push( hand.right[key] )
      }
    }
    
    
    const valuesFormated = {
      username: userName,
      names: name,
      firstSurname: firstName,
      secondSurname: secondName,
      email: email,
      password: password,
      fingerprints: { 
        RINDEX: rIndex, 
        LINDEX: lIndex 
      },
      roleId: role,
      gender: genere,
      birthday: birthdayString,
      photo,
    }

    return valuesFormated
  }

  getCheckIcon( handSelected, index ) {
    const { hand } = this.state
    const isFingerRead = typeof hand[handSelected][index] !== 'undefined'
    let icon = null

    isFingerRead ? icon = ( <Icon type="check-circle" /> ) : icon = ''
    return icon
  }

  readFinger( handSelected, index ) {
 
    this.setState( {
      fingerSelcted: { hand:handSelected, index: index },
      reading: true
    } )

    this.test.startCapture( res => {
    
      if (res.success) {
        setTimeout( this.checkFinger, 1000 )
      }
    } ) 
  }

  getModalFooter() {
    return [
      <Button key="2" onClick={ ()=>{ this.props.close() } }>Cancelar</Button>,
      <Popconfirm key="1" title="¿Desea crear este usuario?" onConfirm={ () => { this.createUser() }  }>
        <Button type="primary">Crear usuario</Button>
      </Popconfirm>
    ]
  }

  handleFingerprintErr( err ) {
    console.log(err)
    this.setState({reading: false})
    notification['warning']({
      message: 'Error en el lector de huellas',
      description: 'Verifique que se tiene conetado el lector de huellas.'
    })
  }

  openNotification( type, message, description ) {
    notification[type]({
      message,
      description
    } )
  }

  loadRoles() {
    const { roles } = this.state
    let options = []

    roles.map( ( element, index ) => options.push( (<Option key={index} value={element.id}>{element.name}</Option>) ) )
    
    return options
  }

  handlePhotoSection() {
    const { isWebcamShowing } = this.state

    this.setState( { isWebcamShowing: !isWebcamShowing } )
  }

  resetForm() {
    const { setFieldsValue } = this.props.form

    setFieldsValue( {
      name: '',
      firstName: '',
      secondName: '',
      email: '',
      birthday: moment( '', this.dateFormat ),
      genere: '',
      confirmPassword: '',
      password: '',
      userName: '',
      role: ''
    } )

    this.setState( {
      hand: { left:{}, right: {} },
      fingerSelcted: { hand:'', index: -1 },
      reading: false,
      photo: null,
      isPhotoTaken: false,
      isWebcamShowing: false,
    } )
  }

  getForm() {
    const { getFieldDecorator } = this.props.form
    const { reading, hand, photo,isPhotoTaken } = this.state
    const leftHandFingersScanned = Object.keys( hand.left ).length
    const rightHandFingersScanned = Object.keys( hand.right ).length
    const userImg = isPhotoTaken ? ( <img src={photo} className="photo-client" /> ) : ( <Avatar className="photo-client" size="large" icon="user" /> )

    return (
      <div>
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
                { this.loadRoles() }
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

        <Divider orientation="left">Escaneo de Huellas</Divider>
        <Row>
          <Col span={12}> <img className="hand-image" src={leftHandImage} alt=""/> </Col>

          <Col span={12}> <img className="hand-image" src={rightHandImage} alt=""/> </Col>

          <Col span={12}>
            <p>{`Huellas escaneadas del dedo indice izquiedo: ${leftHandFingersScanned} de 4`}</p> 
          </Col>
          
          <Col span={12}> 
           <p>{`Huellas escaneadas del dedo indice derecho: ${rightHandFingersScanned} de 4`}</p> 
          </Col>

          <Col span={12} className="scann-container"> 
            {this.getCheckIcon('left', 1)}
            <Button className="scann-finger-button" disabled={reading} onClick={ () => { this.readFinger('left', 1) } } >Escanear 1era huella</Button>
          </Col>

          <Col span={12} className="scann-container"> 
            {this.getCheckIcon('right', 1)}
            <Button className="scann-finger-button" disabled={reading} onClick={ () => { this.readFinger('right', 1) } }>Escanear 1era huella</Button>
            
          </Col>

          <Col span={12} className="scann-container"> 
            {this.getCheckIcon('left', 2)}
            <Button className="scann-finger-button" disabled={reading} onClick={ () => { this.readFinger('left', 2) } }>Escanear 2da huella</Button>
          </Col>

          <Col span={12} className="scann-container"> 
            {this.getCheckIcon('right', 2)}
            <Button className="scann-finger-button" disabled={reading} onClick={ () => { this.readFinger('right', 2) } }>Escanear 2da huella</Button>
          </Col>

          <Col span={12} className="scann-container"> 
            {this.getCheckIcon('left', 3)}
            <Button className="scann-finger-button" disabled={reading} onClick={ () => {this.readFinger('left', 3)  } }>Escanear 3era huella</Button>
          </Col>

          <Col span={12} className="scann-container"> 
            {this.getCheckIcon('right', 3)}
            <Button className="scann-finger-button" disabled={reading} onClick={ () => { this.readFinger('right', 3) } }>Escanear 3era huella</Button>
          </Col>

          <Col span={12} className="scann-container"> 
            {this.getCheckIcon('left', 4)}
            <Button className="scann-finger-button" disabled={reading} onClick={ () => { this.readFinger('left', 4) } }>Escanear 4ta huella</Button>
          </Col>

          <Col span={12} className="scann-container"> 
            {this.getCheckIcon('right', 4)}
            <Button className="scann-finger-button" disabled={reading} onClick={ () => { this.readFinger('right', 4) } }>Escanear 4ta huella</Button>
          </Col>
        </Row>
      </div>
    )
  }

  getWebCamSection() {
    return(
      <Webcam 
        close={ this.handlePhotoSection }
        take={ this.takePhoto }
      />
    )
  }

  takePhoto( photo ) {
    this.setState( { photo, isPhotoTaken: true, isWebcamShowing: false } )
  }

  render() {
    const { visible, close } = this.props
    const { isWebcamShowing } = this.state
    const section = isWebcamShowing ? this.getWebCamSection() : this.getForm()

    return(
      <Modal
        title="Agregar usuario"
        visible={visible}
        width={800}
        style={{top: 20}}
        onCancel={close}
        okText="Crear rol"
        onOk={ ()=>{} }
        footer={ this.getModalFooter() }
      >
        { section }
      </Modal>
    )
  }
}

const WrappedAddUser = Form.create()(AddUser);
module.exports = WrappedAddUser