import React, {Component} from 'react'
import ChipItem from './ChipItem.jsx'
import {
  Form,
  Row,
  Col,
  Button,
  Alert
} from 'antd'
import Api from '../controllers/Api'

import aquaChip from './images/poker-chip-aqua.png'
import blackChip from './images/poker-chip-black.png'
import blueChip from './images/poker-chip-blue.png'
import greenChip from './images/poker-chip-green.png'
import orangeChip from './images/poker-chip-orange.png'
import pinkChip from './images/poker-chip-pink.png'
import purpleChip from './images/poker-chip-purple.png'
import redChip from './images/poker-chip-red.png'
import grayChip from './images/poker-chip-gray.png'

const FormItem = Form.Item

class ChipsSection extends Component {
  constructor( props ) {
    super( props )

    this.state = {
      valueChange: false
    }

    this.api = new Api()
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleValueChange = this.handleValueChange.bind( this )
    
  }

  componentDidMount() {
    this.api.getChips()
      .then( response => {
        console.log( response )
      } )
      .catch( err => {
        console.log(err)
      } )

    this.props.form.setFieldsValue( { aqua: 1 } )
    this.props.form.setFieldsValue( { black: 2 } )
    this.props.form.setFieldsValue( { blue: 5 } )
    this.props.form.setFieldsValue( { gray: 500 } )
    this.props.form.setFieldsValue( { green: 10 } )
    this.props.form.setFieldsValue( { orange: 20 } )
    this.props.form.setFieldsValue( { pink: 50 } )
    this.props.form.setFieldsValue( { purple: 100 } )
    this.props.form.setFieldsValue( { red: 200 } )
  }

  handleSubmit( event ) {
    event.preventDefault()

    //console.log( this.props.form.getFieldsValue() )
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values)
      }
    })

  }

  handleValueChange( newValue ) {
    if ( !this.state.valueChange ) {
      this.setState( {
        valueChange: !this.state.valueChange
      } )
    }

    console.log(newValue)
  }

  render() {
    //(<Alert style={{width: 'max-content'}} message="Se han guardado los cambios con éxito." type="success" showIcon />)
    
    //(<Alert style={{width: 'max-content'}} message="Error" type="error" showIcon />)
    const { getFieldDecorator } = this.props.form
    const { setFieldsValue } = this.props.form
    const changeMessage = this.state.valueChange ? (<Alert style={{width: 'max-content'}} message="Se han detectado cambios, favor de guardarlos para que tengan efecto." type="warning" showIcon />) : ''
    
    return(
      <Form onSubmit={this.handleSubmit}>
        {changeMessage}

        <Row style={{marginTop: '40px', marginBottom: '70px'}}>
          <Col span={4}>
            <ChipItem 
              img={aquaChip}
              valueChange={this.handleValueChange}
              chip = "aqua"
              fieldDecorator = {getFieldDecorator}
            />         
          </Col>

          <Col span={4} offset={1}>
            <ChipItem 
              img={blackChip}
              valueChange={this.handleValueChange}
              chip = "black"
              fieldDecorator = {getFieldDecorator}
            />         
          </Col>

          <Col span={4} offset={1}>
            <ChipItem 
              img={blueChip}
              valueChange={this.handleValueChange}
              chip = "blue"
              fieldDecorator = {getFieldDecorator}
            />         
          </Col>

          <Col span={4} offset={1}>
            <ChipItem 
              img={greenChip}
              valueChange={this.handleValueChange}
              chip = "green"
              fieldDecorator = {getFieldDecorator}
            />         
          </Col>

          <Col span={4} offset={1}>
            <ChipItem 
              img={orangeChip}
              valueChange={this.handleValueChange}
              chip = "orange"
              fieldDecorator = {getFieldDecorator}
            />         
          </Col>
        </Row>

        <Row style={{marginBottom: '60px'}}>
          <Col span={6}>
            <ChipItem 
              img={pinkChip}
              valueChange={this.handleValueChange}
              chip = "pink"
              fieldDecorator = {getFieldDecorator}
            />         
          </Col>

          <Col span={6}>
            <ChipItem 
              img={purpleChip}
              valueChange={this.handleValueChange}
              chip = "purple"
              fieldDecorator = {getFieldDecorator}
            />         
          </Col>

          <Col span={6}>
            <ChipItem 
              img={redChip}
              valueChange={this.handleValueChange}
              chip = "red"
              fieldDecorator = {getFieldDecorator}
            />         
          </Col>

          <Col span={6}>
            <ChipItem 
              img={grayChip}
              valueChange={this.handleValueChange}
              chip = "gray"
              fieldDecorator = {getFieldDecorator}
            />         
          </Col>
        </Row>

        <FormItem style={{textAlign: 'center'}}>
          <Button disabled={!this.state.valueChange} size="large" type="primary" htmlType="submit" icon="save">
            Guardar Cambios
          </Button>
        </FormItem>
      </Form>
    )
  }
}

const WrappedChipsForm = Form.create()(ChipsSection);
module.exports = WrappedChipsForm
