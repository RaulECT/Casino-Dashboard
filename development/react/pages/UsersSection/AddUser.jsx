import React, {Component} from 'react' 
import {
  Form,
  Modal,
  Input,
  Row,
  Col,
  DatePicker,
  Select,
  Button,
  Icon,
  Popconfirm,
  Radio
} from 'antd'
import FingerprintSDKTest from '../../controllers/FingerprintSDKTest'

const FormItem = Form.Item
const Option = Select.Option
const RadioGroup = Radio.Group

class AddUser extends Component {

  constructor( props ) {
    super( props )

    this.state = {
      hand: { left:{}, right: {} },
      fingerSelcted: { hand:'', index: -1 },
      reading: false
    }

    this.test = new FingerprintSDKTest()
    this.dateFormat = "DD/MM/YYYY"
    this.roles = []

    this.createUser = this.createUser.bind( this )
    this.checkFinger = this.checkFinger.bind( this )
    this.getCheckIcon = this.getCheckIcon.bind( this )
    this.loadRoles = this.loadRoles.bind( this )
    this.readFinger = this.readFinger.bind( this )
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

      this.formatFingersData( handUpdated )
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

    console.log( dataFormated )
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
    const { reading, hand } = this.state
    const leftHandFingersScanned = Object.keys( hand.left ).length
    const rightHandFingersScanned = Object.keys( hand.right ).length

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

        <Row>
          <Col span={12}> {`Huellas escaneadas del dedo indice izquiedo: ${leftHandFingersScanned} de 4`}</Col>
          <Col span={12}> {`Huellas escaneadas del dedo indice derecho: ${rightHandFingersScanned} de 4`}</Col>

          <Col span={12}> 
            <Button disabled={reading} onClick={ () => { this.readFinger('left', 1) } } >Izquierda 1</Button>
            {this.getCheckIcon( 'left', 1 )}
          </Col>

          <Col span={12}> 
            <Button disabled={reading} onClick={ () => { this.readFinger('right', 1) } }>Derecha 1</Button>
            {this.getCheckIcon( 'right', 1 )}
          </Col>

          <Col span={12}> 
            <Button disabled={reading} onClick={ () => { this.readFinger('left', 2) } }>Izquierda 2</Button>
            {this.getCheckIcon( 'left', 2 )}
          </Col>

          <Col span={12}> 
            <Button disabled={reading} onClick={ () => { this.readFinger('right', 2) } }>Derecha 2</Button>
            {this.getCheckIcon( 'right', 2 )}
          </Col>

          <Col span={12}> 
            <Button disabled={reading} onClick={ () => { this.readFinger('left', 3) } }>Izquierda 3</Button>
            {this.getCheckIcon( 'left', 3 )}
          </Col>

          <Col span={12}> 
            <Button disabled={reading} onClick={ () => { this.readFinger('right', 3) } }>Derecha 3</Button>
            {this.getCheckIcon( 'right', 3 )}
          </Col>

          <Col span={12}> 
            <Button disabled={reading} onClick={ () => { this.readFinger('left', 4) } }>Izquierda 4</Button>
            {this.getCheckIcon( 'left', 4 )}
          </Col>

          <Col span={12}> 
            <Button disabled={reading} onClick={ () => { this.readFinger('right', 4) } }>Derecha 4</Button>
            {this.getCheckIcon( 'right', 4 )}
          </Col>
        </Row>
      </Modal>
    )
  }
}

const WrappedAddUser = Form.create()(AddUser);
module.exports = WrappedAddUser