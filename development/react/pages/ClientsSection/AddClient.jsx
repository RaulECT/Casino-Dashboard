import React, {Component} from 'react' 
import {
  Avatar,
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
  Radio
} from 'antd'
import Webcam from './Webcam.jsx'

const FormItem = Form.Item
const Option = Select.Option

class AddClient extends Component {
    constructor( props ) {
        super( props )

        this.state = {
            photo: null,
            isPhotoTaken: false,
            isWebcamShowing: false
        }

        this.dateFormat = "YYYY/MM/DD"

        this.createClient= this.createClient.bind( this )
        this.getForm = this.getForm.bind( this )
        this.getModalFooter = this.getModalFooter.bind( this )
        this.getWebcamSection = this.getWebcamSection.bind( this )
        this.handleWebcamSection = this.handleWebcamSection.bind( this )
        this.takePhoto = this.takePhoto.bind( this )
    }

    createClient() {
        const { isPhotoTaken, photo } = this.state

        this.props.form.validateFields( ( err, values ) => {
            if ( !err && isPhotoTaken ) {
                
                values.birthday = this.formatDate( values.birthday.format().split('T')[0] )
                values.photo = photo.split(',')[1]
                console.log( values );
            } else {
                console.log( 'No se ha tomado la foto o uno de los campos es incorrecto.' );
                
            }
        } )
    }

    formatDate( date ) {
        return date.replace( /-/g , '/' )
    }

    getModalFooter() {
        const { isWebcamShowing } = this.state

        return [
          <Button key="2" onClick={ ()=>{ this.props.close() } }>Cancelar</Button>,
          <Popconfirm key="1" title="¿Desea crear este cliente?" onConfirm={ () => { this.createClient() }  }>
            <Button disabled={isWebcamShowing} type="primary" icon="user-add">Crear cliente</Button>
          </Popconfirm>
        ]
    }

    getClientWebCam() {
        return(
            <Webcam 
                close={ this.handleWebcamSection }
                take={ this.takePhoto }
            />
        )
    }

    getForm() {
        const { getFieldDecorator } = this.props.form
        const { photo, isPhotoTaken } = this.state
        const clientImg = isPhotoTaken ? ( <img src={photo} className="photo-client" /> ) : ( <Avatar className="photo-client" size="large" icon="user" /> )

        return(
            <Form layout="inline">
                <FormItem style={ { display: 'block' } } >
                    <div className="photo-section">
                        {clientImg}
                        <Button onClick={this.handleWebcamSection} icon="picture"> Tomar foto </Button> 
                    </div>
                </FormItem>
                    
                <FormItem
                    label="Nombre(s):"
                    className="add-client-form"
                    style={ {width: '70%'} }
                >
                    {getFieldDecorator( 'names', { rules: [ {required: true, message: 'Ingrese un valor!'} ] } )(
                        <Input placeholder="Ej. Juan Perez" />
                    )}
                </FormItem>

                <FormItem
                    label="Apellido Paterno:"
                    className="add-client-form"
                >
                    {getFieldDecorator( 'firstSurname', { rules: [ {required: true, message: 'Ingrese un valor!'} ] } )(
                        <Input placeholder="Ej. Gonzales" />
                    )}
                </FormItem>

                <FormItem
                    label="Apellido Materno:"
                    className="add-client-form"
                >
                    {getFieldDecorator( 'secondSurname', { rules: [ {required: true, message: 'Ingrese un valor!'} ] } )(
                        <Input placeholder="Ej. Gomez" />
                    )}
                </FormItem>

                <FormItem
                    label="Tipo de identificación:"
                    className="add-client-form"
                >
                    {getFieldDecorator( 'identificationType', { rules: [ {required: true, message: 'Seleccione un rol!'} ] } )(
                        <Select style={{ width: 120 }}>
                            <Option value="Credencial de Elector">Credencial de Elector</Option>
                            <Option value="Licencia">Licencia</Option>
                            <Option value="Cartilla Militar">Cartilla Militar</Option>
                            <Option value="Cedula Profesional">Cedula Profesional</Option>
                            <Option value="Pasaporte">Pasaporte</Option>
                        </Select>
                    )}
                </FormItem>

                <FormItem
                    label="Fecha Nacimiento:"
                    className="add-client-form"
                >
                    {getFieldDecorator( 'birthday', { rules: [ {required: true, message: 'Ingrese una fecha!'} ] } )(
                        <DatePicker placeholder="yyyy/mm/dd" format={this.dateFormat} />
                    )}
                </FormItem>

                <FormItem
                    label="Dirección:"
                    className="add-client-form"
                >
                    {getFieldDecorator( 'address', { rules: [ {required: true, message: 'Ingrese un Valor!'} ]} )(
                        <Input/>
                    )}
                </FormItem>

                <FormItem
                    label="E-mail:"
                    className="add-client-form"
                >
                    {getFieldDecorator( 'email', { rules: [ { type: 'email', message: 'No es un E-mail correcto!' }, {required: true, message: 'Ingrese un valor!'} ] } )(
                        <Input placeholder="correo@correo.com" />
                    )}
                </FormItem>

                <FormItem
                    label="Telefono:"
                    className="add-client-form"
                >
                    {getFieldDecorator( 'phone', { rules: [ {required: true, message: 'Ingrese un valor!'} ] } )(
                        <Input min={10} />
                    )}
                </FormItem>

            </Form>
        )
    }

    getWebcamSection() {
        return(
            <Webcam 
                close={ this.handleWebcamSection }
                take={ this.takePhoto }
            />
        )
    }

    handleWebcamSection() {
        const { photo, isPhotoTaken, isWebcamShowing } = this.state

        this.setState( {
            isWebcamShowing: !isWebcamShowing,
            photo,
            isPhotoTaken
        } )
    }

    takePhoto( photo ) {
        const { isPhotoTaken, isWebcamShowing } = this.state

        this.setState( {
            isWebcamShowing: false,
            isPhotoTaken: true,
            photo: photo
        } )
    }

    render() {
        const { isWebcamShowing } = this.state
        const { visible, close } = this.props
        const section = isWebcamShowing ? this.getWebcamSection() : this.getForm()

        return(
            <Modal
                title="Agregar cliente"
                visible={visible}
                width={800}
                onCancel={close}
                okText="Crear cliente"
                onOk={ ()=>{} }
                footer={ this.getModalFooter() }
                style={ {top:20} }
            >
             { section }   
            </Modal>
        )
    }
}

const WrappedAddClient = Form.create()(AddClient);
module.exports = WrappedAddClient