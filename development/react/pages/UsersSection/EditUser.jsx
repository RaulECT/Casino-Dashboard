import React, {Component} from 'react' 
import moment from 'moment'
import Api from '../../controllers/Api'
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
  Radio
} from 'antd'

const FormItem = Form.Item
const Option = Select.Option
const RadioGroup = Radio.Group

import FingerprintSDKTest from '../../controllers/FingerprintSDKTest'
import leftHandImage from '../images/left.png'
import rightHandImage from '../images/right.png'

class EditUser extends Component {
  
  constructor( props ) {
    super( props )
    
    this.roles = []
    this.api = new Api()
    this.dateFormat = "DD/MM/YYYY"  
    
    this.state = {
      hand: { left:{}, right: {} },
      fingerSelcted: { hand:'', index: -1 },
      reading: false
    }

    this.test = new FingerprintSDKTest()
    
    this.checkFinger = this.checkFinger.bind( this )
    this.getCheckIcon = this.getCheckIcon.bind( this )
    this.readFinger = this.readFinger.bind( this )
    this.setUserValues = this.setUserValues.bind( this )
    this.loadRoles = this.loadRoles.bind( this )

    this.loadRoles()
  }

  componentDidMount() {
    this.setUserValues()
  }

  checkFinger() {
    const { hand, fingerSelcted } = this.state
    const handUpdated = hand
    const data = this.test.getData()

    console.log(data);
    
    if ( data.success ) {
      this.test.stopCapture()
      console.log(data)
      handUpdated[fingerSelcted.hand][fingerSelcted.index] = data.samples

      this.setState( {
        fingerSelcted,
        hand: handUpdated,
        reading: false
      } )
    }
  }

  formatDate( date ) {
    const fullDate = date.split('T')[0]
    const dateParts = fullDate.split('-')

    return `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`
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

    console.log( dataFormated )
  }

  getCheckIcon( handSelected, index ) {
    const { hand } = this.state
    const isFingerRead = typeof hand[handSelected][index] !== 'undefined'
    let icon = null

    isFingerRead ? icon = ( <Icon type="check-circle" /> ) : icon = ''
    return icon
  }

  readFinger( handSelected, index ) {
    const { hand } = this.state
    
    this.setState( {
      hand,
      fingerSelcted: { hand:handSelected, index: index },
      reading: true
    } )

    this.test.startCapture( res => {
      console.log(res)
    
      if (res.success) {
        setTimeout( this.checkFinger, 1000 )
      }
    } ) 
  }

  setUserValues() {
    const { setFieldsValue } = this.props.form
    const { names, firstSurname, secondSurname, username, email, gender, birthday, roleId } = this.props.user
    const date =  this.formatDate( birthday )

    setFieldsValue( {
      nameEdit: names,
      firstNameEdit: firstSurname,
      secondNameEdit: secondSurname,
      userNameEdit: username,
      emailEdit: email,
      birthdayEdit: moment(date, this.dateFormat),
      genereEdit: gender,
      roleEdit: roleId
    } )
  }

  loadRoles() {
    const { roles } = this.props

    roles.map( ( element, index ) => {
      console.log(element)
      this.roles.push( <Option key={index} value={element.id}>{element.name}</Option> )
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
          <Divider orientation="left">Información General</Divider>

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
                { this.roles.map( element => { return element } ) }
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

          <Col span={12}> 
            <Button disabled={reading} onClick={ () => { this.readFinger('left', 1) } } >Escanear 1era huella</Button>
            {this.getCheckIcon( 'left', 1 )}
          </Col>

          <Col span={12}> 
            <Button disabled={reading} onClick={ () => { this.readFinger('right', 1) } }>Escanear 1era huella</Button>
            {this.getCheckIcon( 'right', 1 )}
          </Col>

          <Col span={12}> 
            <Button disabled={reading} onClick={ () => { this.readFinger('left', 2) } }>Escanear 2da huella</Button>
            {this.getCheckIcon( 'left', 2 )}
          </Col>

          <Col span={12}> 
            <Button disabled={reading} onClick={ () => { this.readFinger('right', 2) } }>Escanear 2da huella</Button>
            {this.getCheckIcon( 'right', 2 )}
          </Col>

          <Col span={12}> 
            <Button disabled={reading} onClick={ () => { this.readFinger('left', 3) } }>Escanear 3era huella</Button>
            {this.getCheckIcon( 'left', 3 )}
          </Col>

          <Col span={12}> 
            <Button disabled={reading} onClick={ () => { this.readFinger('right', 3) } }>Escanear 3era huella</Button>
            {this.getCheckIcon( 'right', 3 )}
          </Col>

          <Col span={12}> 
            <Button disabled={reading} onClick={ () => { this.readFinger('left', 4) } }>Escanear 4ta huella</Button>
            {this.getCheckIcon( 'left', 4 )}
          </Col>

          <Col span={12}> 
            <Button disabled={reading} onClick={ () => { this.readFinger('right', 4) } }>Escanear 4ta huella</Button>
            {this.getCheckIcon( 'right', 4 )}
          </Col>
        </Row>
      </Modal>
    )
  }
}

const WrappedEditUser = Form.create()(EditUser);
module.exports = WrappedEditUser
