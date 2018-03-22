import React, {Component} from 'react'
import { 
  Table, 
  Icon, 
  Divider,
  Button 
} from 'antd'

import '../styles/amountSection.css'

const columns = [{
  title: 'Monto',
  dataIndex: 'monto',
  key: 'monto'
}, 
{
  title: 'Action',
  key: 'action',
  render: (text, record) => (
    <span>
      <a href="#">Editar</a>
      <Divider type="vertical" />
      <a href="#"> Eliminar</a>
    </span>
  ),
}]

const data = [{
  key: '1',
  monto: 50
}, {
  key: '2',
  monto: 100
}, {
  key: '3',
  monto: 150
}, {
  key: '4',
  monto: 200
}]

class AmountsSection extends Component {
  
  render() {
    return(
      <div className="amounts-container">
        <h4>Porfavor, asigne los valores deseados</h4>

        <Table
          className="amonts-table" 
          columns={columns} 
          dataSource={data} 
        />

        <div>
          <Button className="button-fixed" icon="save" type="primary" >Guardar Cambios</Button>
          <Button className="button-fixed" icon="plus" type="primary" >Agregar Monto</Button>
          <Button icon="close" type="primary" >Cancelar Cambios</Button>
        </div>
      </div>
    )
  }
}

module.exports = AmountsSection