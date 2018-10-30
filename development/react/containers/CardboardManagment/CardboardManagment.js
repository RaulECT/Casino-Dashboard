import React, {Component} from 'react'

import {
  Row,
  Col,
  Input,
  Form,
  Select,
  Button,
  Modal,
} from 'antd'
import CardboardCard from '../../components/CardboardCard/CardboardCard'

const Search = Input.Search
const FormItem = Form.Item
const Option = Select.Option
const confirm = Modal.confirm

import './CardboardManagment.css'

class CardboardManagment extends Component {

  showConfirm = ( title, content, onOk ) => {
    confirm( {
      title,
      content,
      onOk() {
        onOk()
      },
      onCancel() {
        console.log( 'Holiiii' )
      }
    } )
  }

  render() {
    return(
      <div>
        <h3 className="cardboardManagment__sub-header">Existen <span className="cardboardManagment__cardboard-num">XX</span> cartones registrados en la base de datos.</h3>
      
        <Row 
          align="middle"
          gutter={20}
        >
          <Col
            span={12}  
          >
            <FormItem
              label="Búsqueda de cartones:"
            >
              <Search 
                placeholder="Ingrese el número del carton que desee buscar..."
                enterButton
                onSearch={ value => console.log(value) }
                size="large"
              />
            </FormItem>

            <FormItem
              label="Crear nuevo carton:"
            >
              <Select 
                size="large" 
                style={ { width: '65%', marginRight: '1rem' } }
                placeholder="Tipo de carton"
              >
                <Option value="SINGLE">Carton Simple</Option>
              </Select>
              <Button
                size="large"
                type="primary"
                icon="plus"
                onClick={ () => { this.showConfirm( '¿Desea crear este cartón?', '¿Esta seguro que quiere crear este cartón?', () => { console.log('holiii') } ) } }
              >
                Crear carton
              </Button>
            </FormItem>

            <div className="cardboardManagment__options-group">
              <Button size="large" ghost type="primary" icon="picture">Ver todos los cartones</Button>
              <Button size="large" ghost type="primary" icon="download">Descargar todos los cartones</Button>
            </div>
          </Col>

          <Col
            span={12}
          >
            <CardboardCard 
              onDelete={ () => { this.showConfirm( '¿Desea borrar este carton?', 'Una vez que se elimine este carton no se puede volver a recuperar', () => { console.log('Holii') } ) } }
            />
          </Col>
        </Row>
      </div>
    )
  }
}

export default CardboardManagment