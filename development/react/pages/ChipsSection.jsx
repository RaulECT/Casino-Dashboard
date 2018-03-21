import React, {Component} from 'react'
import ChipItem from './ChipItem.jsx'
import {
  Form,
  Row,
  Col,
  Button,
  Alert
} from 'antd'

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

    this.handleValueChange = this.handleValueChange.bind( this )
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

    const changeMessage = this.state.valueChange ? (<Alert style={{width: 'max-content'}} message="Se han detectado cambios, favor de guardarlos para que tengan efecto." type="warning" showIcon />) : ''
    return(
      <Form>
        {changeMessage}

        <Row style={{marginTop: '40px', marginBottom: '70px'}}>
          <Col span={4}>
            <ChipItem 
              img={aquaChip}
              value={1}
              valueChange={this.handleValueChange}
            />         
          </Col>

          <Col span={4} offset={1}>
            <ChipItem 
              img={blackChip}
              value={2}
              valueChange={this.handleValueChange}
            />         
          </Col>

          <Col span={4} offset={1}>
            <ChipItem 
              img={blueChip}
              value={5}
              valueChange={this.handleValueChange}
            />         
          </Col>

          <Col span={4} offset={1}>
            <ChipItem 
              img={greenChip}
              value={10}
              valueChange={this.handleValueChange}
            />         
          </Col>

          <Col span={4} offset={1}>
            <ChipItem 
              img={orangeChip}
              value={20}
              valueChange={this.handleValueChange}
            />         
          </Col>
        </Row>

        <Row style={{marginBottom: '70px'}}>
          <Col span={6}>
            <ChipItem 
              img={pinkChip}
              value={50}
              valueChange={this.handleValueChange}
            />         
          </Col>

          <Col span={6}>
            <ChipItem 
              img={purpleChip}
              value={100}
              valueChange={this.handleValueChange}
            />         
          </Col>

          <Col span={6}>
            <ChipItem 
              img={redChip}
              value={200}
              valueChange={this.handleValueChange}
            />         
          </Col>

          <Col span={6}>
            <ChipItem 
              img={grayChip}
              value={500}
              valueChange={this.handleValueChange}
            />         
          </Col>
        </Row>

        <FormItem style={{textAlign: 'center'}}>
          <Button size="large" type="primary" htmlType="submit" icon="save">
            Guardar Cambios
          </Button>
        </FormItem>
      </Form>
    )
  }
}

module.exports = ChipsSection