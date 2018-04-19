import React, {Component} from 'react' 
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
  Radio
} from 'antd'

const FormItem = Form.Item
const Option = Select.Option

class AddClient extends Component {
    constructor( props ) {
        super( props )

        this.dateFormat = "YYYY/MM/DD"

        this.createClient= this.createClient.bind( this )
    }

    createClient() {

    }

    getModalFooter() {
        return [
          <Button key="2" onClick={ ()=>{ this.props.close() } }>Cancelar</Button>,
          <Popconfirm key="1" title="¿Desea crear este cliente?" onConfirm={ () => { this.createClient() }  }>
            <Button type="primary">Crear cliente</Button>
          </Popconfirm>
        ]
    }

    render() {
        const { visible, close } = this.props
        const { getFieldDecorator } = this.props.form

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
                <Form layout="inline">
                    
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
                            <Input />
                        )}
                    </FormItem>

                    <FormItem
                        label="Foto"
                    >
                        <Button>Tomar foto</Button>
                    </FormItem>
                </Form>
            </Modal>
        )
    }
}

const WrappedAddClient = Form.create()(AddClient);
module.exports = WrappedAddClient