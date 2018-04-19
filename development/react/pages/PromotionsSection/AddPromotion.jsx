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
  InputNumber,
  Button,
  Icon,
  Popconfirm,
  Radio
} from 'antd'

const FormItem = Form.Item
const Option = Select.Option
const { TextArea } = Input

class AddPromotion extends Component {

  constructor( props ) {
    super( props )

    this.dateFormat = "YYYY/MM/DD"
    this.types = [
      { value: 'discount', label: 'Descuento' },
      { value: 'gift', label: 'Regalo' },
      { value: 'giftPercent', label: 'Porcentaje de regalo' },
      { value: 'discountPercent', label: 'Porcentaje de descuento' }
    ]

    this.createPromotion = this.createPromotion.bind( this )
    this.getModalFooter = this.getModalFooter.bind( this )
    this.getPromotionsTypes = this.getPromotionsTypes.bind( this )
  }

  createPromotion() {

  }

  getModalFooter() {
    return [
      <Button key="2" onClick={ ()=>{ this.props.close() } }>Cancelar</Button>,
      <Popconfirm key="1" title="¿Desea crear esta promoción?" onConfirm={ () => { this.createPromotion() }  }>
        <Button type="primary">Crear promoción</Button>
      </Popconfirm>
    ]
  }

  getPromotionsTypes() {
    this.types.map( ( element, index ) => { return ( <Option key={index} value={element.value} > { element.label } </Option> ) } )
  }

  render() {
    const { visible, close } = this.props
    const { getFieldDecorator } = this.props.form

    return(
      <Modal
        title="Agregar promoción"
        visible={visible}
        onCancel={close}
        style={{ top: 20 }}
        okText="Crear promoción"
        onOk={ ()=>{} }
        footer={ this.getModalFooter() }
      >
        <Form layout="horizontal">
          <FormItem
            label="Nombre de la promoción:"
            className="add-prom-form"
          >
            {getFieldDecorator( 'name', { rules: [ {required: true, message: 'Ingrese un valor!'} ] } )(
              <Input placeholder="Ej. Juan Perez" />
            )}
          </FormItem>

          <FormItem
            label="Tipo de Promoción:"
            className="add-prom-form"
          >
            {getFieldDecorator( 'type', { rules: [ {required: true, message: 'Seleccione un tipo!'} ] } )(
              <Select style={{ width: 210 }}>
                <Option value="discount">Descuento</Option>
                <Option value="gift">Regalo</Option>
                <Option value="giftPercent">Porcentaje de regalo</Option>
                <Option value="discountPercent">Porcentaje de descuento</Option>
              </Select>
            )}
          </FormItem>

          <FormItem
            label="Porcentaje de descuento:"
            className="add-prom-form"
          >
            {getFieldDecorator( 'amount', { rules: [ {required: true, message: 'Ingrese un Valor númerico!'} ] } )(
              <InputNumber min={1} placeholder="Ej. 50" />
            )}
   
          </FormItem>

          <FormItem
            label="Recarga minima:"
            className="add-prom-form"
          >
            {getFieldDecorator( 'valueMin', { rules: [ {required: true, message: 'Ingrese un Valor númerico!'} ] } )(
              <InputNumber min={1} placeholder="Ej. 100" />
            )}
   
          </FormItem>

          <FormItem
            label="Recarga máxima:"
            className="add-prom-form"
          >
            {getFieldDecorator( 'valueMax', { rules: [ {required: true, message: 'Ingrese un Valor númerico!'} ] } )(
              <InputNumber min={1} placeholder="Ej. 1000" />
            )}
   
          </FormItem>

          <FormItem
            label="Fecha limite de la promición:"
            className="add-prom-form"
          >
            {getFieldDecorator( 'timeLimit', { rules: [ {required: true, message: 'Ingrese una fecha!'} ] } )(
              <DatePicker placeholder="yyyy/mm/dd" format={this.dateFormat} />
            )}
          </FormItem>

          <FormItem
            label="Descripción:"
          >
            {getFieldDecorator( 'description', { rules: [ {required: true, message: 'Ingrese un Valor!'} ] } )(
              <TextArea placeholder="" autosize={{ minRows: 2, maxRows: 6 }} />
            )}
   
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

const WrappedAddPromotion = Form.create()(AddPromotion);
module.exports = WrappedAddPromotion