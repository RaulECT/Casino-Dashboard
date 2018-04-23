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
  InputNumber,
  Button,
  Icon,
  Popconfirm,
  Radio
} from 'antd'

const FormItem = Form.Item
const Option = Select.Option
const { TextArea } = Input

class EditPromotion extends Component {
  constructor( props ) {
    super( props )

    this.dateFormat = "YYYY/MM/DD"
    this.types = [
      { value: 'discount', label: 'Descuento' },
      { value: 'gift', label: 'Regalo' },
      { value: 'giftPercent', label: 'Porcentaje de regalo' },
      { value: 'discountPercent', label: 'Porcentaje de descuento' }
    ]

    this.editPromotion = this.editPromotion.bind( this )
    this.getModalFooter = this.getModalFooter.bind( this )
    this.getPromotionsTypes = this.getPromotionsTypes.bind( this )
    this.setPromValues = this.setPromValues.bind( this )
  }

  componentDidMount() {
    this.setPromValues()
  }

  editPromotion() {
    this.props.form.validateFields( ( err, values ) => {
      if ( !err ) {
        values.promoId = this.props.prom.id
        values.timeLimit = this.formatDate(values.timeLimit.format().split('T')[0]) 
        values.valueMax = values.valueMax * 100
        values.valueMin = values.valueMin * 100
        
        this.props.editPromo( values )
      }
    } )
  }

  formatDate( date ) {
    return date.replace( /-/g , '/' )
  }

  getModalFooter() {
    return [
      <Button key="2" onClick={ ()=>{ this.props.close() } }>Cancelar</Button>,
      <Popconfirm key="1" title="¿Desea editar esta promoción?" onConfirm={ () => { this.editPromotion() }  }>
        <Button icon="edit" type="primary">Editar promoción</Button>
      </Popconfirm>
    ]
  }

  getPromotionsTypes() {
    this.types.map( ( element, index ) => { return ( <Option key={index} value={element.value} > { element.label } </Option> ) } )
  }

  setPromValues() {
    const { setFieldsValue } = this.props.form
    const { active, amount, description, name, timeLimit, type, valueMax, valueMin } = this.props.prom
    const timeLimitFormated = this.formatDate( timeLimit )

    setFieldsValue( {
      amount,
      description,
      name,
      timeLimit: moment(timeLimitFormated, this.dateFormat),
      type,
      valueMax,
      valueMin
    } )
  }

  render() {
    const { visible, close } = this.props
    const { getFieldDecorator } = this.props.form

    return(
      <Modal
        title="Editar promoción"
        visible={visible}
        onCancel={close}
        style={{ top: 20 }}
        okText="Editar promoción"
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

const WrappedEditPromotion = Form.create()(EditPromotion);
module.exports = WrappedEditPromotion