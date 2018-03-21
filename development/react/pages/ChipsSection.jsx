import React, {Component} from 'react'
import ChipItem from './ChipItem.jsx'
import {
  Form,
  Row,
  Col,
  Button
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
  render() {
    return(
      <Form>
        <Row style={{marginTop: '40px', marginBottom: '70px'}}>
          <Col span={4}>
            <ChipItem 
              img={aquaChip}
              value={1}
            />         
          </Col>

          <Col span={4} offset={1}>
            <ChipItem 
              img={blackChip}
              value={2}
            />         
          </Col>

          <Col span={4} offset={1}>
            <ChipItem 
              img={blueChip}
              value={5}
            />         
          </Col>

          <Col span={4} offset={1}>
            <ChipItem 
              img={greenChip}
              value={10}
            />         
          </Col>

          <Col span={4} offset={1}>
            <ChipItem 
              img={orangeChip}
              value={20}
            />         
          </Col>
        </Row>

        <Row style={{marginBottom: '70px'}}>
          <Col span={6}>
            <ChipItem 
              img={pinkChip}
              value={50}
            />         
          </Col>

          <Col span={6}>
            <ChipItem 
              img={purpleChip}
              value={100}
            />         
          </Col>

          <Col span={6}>
            <ChipItem 
              img={redChip}
              value={200}
            />         
          </Col>

          <Col span={6}>
            <ChipItem 
              img={grayChip}
              value={500}
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