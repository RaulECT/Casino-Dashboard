import React, {Component} from 'react'
import { 
  Table, 
  Icon, 
  Input,
  Divider,
  Button,
  Popconfirm,
  Modal,
  Form,
  InputNumber
} from 'antd'
import Api from '../../controllers/Api'

import '../styles/amountSection.css'

const FormItem = Form.Item

const EditableCell = ({ editable, value, onChange }) => (
  <div>
    {editable
      ? <Input style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} />
      : value
    }
  </div>
);

class AmountsSection extends Component {

  constructor( props ) {
    super( props )

    this.state = {
      revertChangesModal: false,
      editChangeModal: false,
      fastAmountValues: []
    }

    this.cacheData = []

    const { getFieldDecorator } = this.props.form
    
    this.amountsBackup = []
    this.api = new Api()
    this.deleteAmount = this.deleteAmount.bind( this )
    this.handleEditAmount = this.handleEditAmount.bind( this )
    this.handelRevertChangesModal = this.handelRevertChangesModal.bind( this )
    this.revertChanges = this.revertChanges.bind( this )

    this.edit = this.edit.bind(this)

    this.columns = [{
      title: 'Monto',
      dataIndex: 'monto',
      render: (text, record) => this.renderColumns(text, record, 'monto'),
    }, 
    {
      title: 'Operaciones',
      dataIndex: 'operation',
      render: (text, record) => {
        const { editable } = record;
        return (
          <div className="editable-row-operations">
            {
              editable ?
                <span>
                  <a onClick={() => this.save(record.key)}>Save</a>
                  <Divider type="vertical" />
                  <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel(record.key)}>
                    <a>Cancel</a>
                  </Popconfirm>
                </span>
                : 
                <span>
                  <a onClick={() => this.edit(record.key)}>Editar</a>
                  <Divider type="vertical" />
                  <Popconfirm title="¿Desea eliminar este elemento?" onConfirm={() => {}}>
                    <a>Eliminar</a>
                  </Popconfirm>
                </span> 
                
            }
          </div>
        );
      },
    }]
  }

  componentWillMount() {
    this.api.getFastAmountsValues()
      .then( response => {
        const data = []
        response.map( ( amount, index ) => {
          data.push( { key: index.toString(), monto: amount/100 } )
        } )
        this.cacheData = data

        this.setState( {
          revertChangesModal: this.state.revertChangesModal,
          editChangeModal: this.state.editChangeModal,
          fastAmountValues: data
        } )
      } )
      .catch( err => {
        console.log( err )
      } )
  }

  cancel(key) {
    const newData = [...this.state.fastAmountValues]
    const target = newData.filter(item => key === item.key)[0]
    if (target) {
      Object.assign(target, this.cacheData.filter(item => key === item.key)[0])
      delete target.editable;
      this.setState({ 
        revertChangesModal: this.state.revertChangesModal,
        fastAmountValues: newData 
      })
    }
  }

  save(key) {
    const newData = [...this.state.fastAmountValues];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      delete target.editable;
      this.setState({ 
        revertChangesModal: this.state.revertChangesModal,
        fastAmountValues: newData 
      })
      this.cacheData = newData.map(item => ({ ...item }));
    }
  }

  deleteAmount( key ) {
    let amounts = this.state.fastAmountValues
    amounts.splice( key, 1 )
    this.setState( {
      revertChangesModal: this.state.revertChangesModal,
      editChangeModal: this.state.editChangeModal,
      fastAmountValues: amounts
    } )
    
  }

  edit(key) {
    const newData = [...this.state.fastAmountValues]
    
    const target = newData.filter(item => 
      key === item.key
    
    )[0]
    console.log(target)
    if (target) {
      
      target.editable = true;
      this.setState({ 
        revertChangesModal: this.state.revertChangesModal,
        editChangeModal: false,
        fastAmountValues: newData 
      })
    }
  }

  handleChange(value, key, column) {
    const newData = [...this.state.fastAmountValues]
    const target = newData.filter(item => key === item.key)[0]
    if (target) {
      target[column] = value;
      this.setState({ 
        revertChangesModal: this.state.revertChangesModal,
        editChangeModal: false,
        fastAmountValues: newData 
      })
    }
  }

  handelRevertChangesModal() {
    this.setState( {
      revertChangesModal: !this.setState.revertChangesModal,
      editChangeModal: this.state.editChangeModal,
      fastAmountValues: this.state.fastAmountValues
    } )
  }

  handleEditAmount() {
    this.setState( {
      revertChangesModal: false,
      editChangeModal: !this.state.editChangeModal,
      fastAmountValues: this.state.fastAmountValues
    } )
  }

  renderColumns(text, record, column) {
    return (
      <EditableCell
        editable={record.editable}
        value={text}
        onChange={value => this.handleChange(value, record.key, column)}
      />
    );
  }

  revertChanges() {
    this.api.getFastAmountsValues()
      .then( response => {
        this.amountsBackup = response
        this.setState( {
          revertChangesModal: false,
          editChangeModal: this.state.editChangeModal,
          fastAmountValues: response
        } )
      } )
      .catch( err => {
        console.log( err )
      } )
  }
  
  render() {

   
    return(
      <div className="amounts-container">
        <h4>Porfavor, asigne los valores deseados</h4>

        <Table
          className="amonts-table" 
          columns={this.columns} 
          dataSource={this.state.fastAmountValues} 
        />

        <div>
          <Button className="button-fixed" icon="save" type="primary" >Guardar Cambios</Button>
          <Button className="button-fixed" icon="plus" type="primary" >Agregar Monto</Button>
          <Button icon="close" type="primary" onClick={this.handelRevertChangesModal} >Cancelar Cambios</Button>

          <Modal
            title="Revertir Cambios"
            visible={this.state.revertChangesModal}
            onOk={this.revertChanges}
            onCancel={this.handelRevertChangesModal}
          >
            <p>¿Desea revertir todos los cambios realizados?</p>
              
          </Modal>
        </div>
      </div>
    )
  }
}

/*<Table
          className="amonts-table" 
          columns={this.columns} 
          dataSource={data} 
        />*/

const WrappedAmountsSection = Form.create()(AmountsSection);
module.exports = WrappedAmountsSection