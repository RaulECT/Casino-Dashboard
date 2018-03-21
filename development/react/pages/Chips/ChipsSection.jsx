import React, {Component} from 'react'
import ChipItem from './ChipItem.jsx'
import {
  Form,
  Row,
  Col,
  Button,
  Alert,
  Modal
} from 'antd'
import Api from '../../controllers/Api'

import aquaChip from './../images/poker-chip-aqua.png'
import blackChip from './../images/poker-chip-black.png'
import blueChip from './../images/poker-chip-blue.png'
import greenChip from './../images/poker-chip-green.png'
import orangeChip from './../images/poker-chip-orange.png'
import pinkChip from './../images/poker-chip-pink.png'
import purpleChip from './../images/poker-chip-purple.png'
import redChip from './../images/poker-chip-red.png'
import grayChip from './../images/poker-chip-gray.png'

const FormItem = Form.Item

class ChipsSection extends Component {
  constructor( props ) {
    super( props )

    this.state = {
      valueChange: false,
      successOperation : false,
      isModalVisible: false
    }

    this.api = new Api()
    this.formatChipsData = this.formatChipsData.bind( this )
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleValueChange = this.handleValueChange.bind( this )
    this.handleModal = this.handleModal.bind( this )
    this.updateChipsValues = this.updateChipsValues.bind( this )
  }

  componentWillMount() {
    this.api.getChips()
      .then( response => {
        response.map( element => {
          var item = {}
          item[ element.color ] = element.value
          this.props.form.setFieldsValue( item )
        } )
      } )
      .catch( err => {
        console.log(err)
      } )

  }

  formatChipsData( values ) {
    return [
      {
        "color":  "aqua" ,
        "value": values.aqua
      },
      {
        "color":  "black" ,
        "value": values.black
      },
      {
        "color":  "blue" ,
        "value": values.blue
      },
      {
        "color":  "green" ,
        "value": values.green
      },
      {
        "color":  "orange" ,
        "value": values.orange
      },
      {
        "color":  "pink" ,
        "value": values.pink
      },
      {
        "color":  "purple" ,
        "value": values.purple
      } ,
      {
        "color":  "red" ,
        "value": values.red
      },
      {
        "color":  "white" ,
        "value": values.white
      }
    ]
  }

  handleSubmit( event ) {
    event.preventDefault()
    this.handleModal()
  }

  handleValueChange( newValue ) {
    if ( !this.state.valueChange ) {
      this.setState( {
        valueChange: !this.state.valueChange,
        successOperation: false,
        isModalVisible: this.state.isModalVisible
      } )
    }
  }

  handleModal() {
    this.setState( {
      valueChange: this.state.valueChange,
      successOperation: this.state.successOperation,
      isModalVisible: !this.state.isModalVisible
    } )
  }

  updateChipsValues() {
    //console.log( this.props.form.getFieldsValue() )
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.handleModal()
        const chips = this.formatChipsData( values )
        this.api.updateChipsValues( chips )
          .then( response => {
            console.log( response )
            this.setState( {
              valueChange: false,
              successOperation: true,
              isModalVisible: this.state.isModalVisible
            } )
          } )
          .catch( err => {
            console.log( err )
          } )
      }
    })
  }

  render() {
    //(<Alert style={{width: 'max-content'}} message="Se han guardado los cambios con éxito." type="success" showIcon />)
    
    //(<Alert style={{width: 'max-content'}} message="Error" type="error" showIcon />)
    const { getFieldDecorator } = this.props.form
    const { setFieldsValue } = this.props.form
    const changeMessage = this.state.valueChange ? (<Alert style={{width: 'max-content'}} message="Se han detectado cambios, favor de guardarlos para que tengan efecto." type="warning" showIcon />) : ''
    const successMessage = this.state.successOperation ? (<Alert style={{width: 'max-content'}} message="Se han guardado los cambios con éxito." type="success" showIcon />) : ''

    return(
      <Form onSubmit={this.handleSubmit}>
        {changeMessage}
        {successMessage}

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
              chip = "white"
              fieldDecorator = {getFieldDecorator}
            />         
          </Col>
        </Row>

        <FormItem style={{textAlign: 'center'}}>
          <Button disabled={!this.state.valueChange} size="large" type="primary" htmlType="submit" icon="save">
            Guardar Cambios
          </Button>

          <Modal
            title="Actualizar Fichas"
            visible={this.state.isModalVisible}
            onOk={this.updateChipsValues}
            onCancel={this.handleModal}
          >
            <p>¿Desea actualizar los valores de las fichas?</p>
              
          </Modal>
        </FormItem>
      </Form>
    )
  }
}

const WrappedChipsForm = Form.create()(ChipsSection);
module.exports = WrappedChipsForm
