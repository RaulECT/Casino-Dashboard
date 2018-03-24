import React, {Component} from 'react'
import { 
  Alert,
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
      hasChanged: false,
      success: false,
      revertChangesModal: false,
      addModal: false,
      fastAmountValues: []
    }

    this.cacheData = []
    this.amountsBackup = []
    this.api = new Api()

    this.addNewAmount = this.addNewAmount.bind( this )
    this.deleteAmount = this.deleteAmount.bind( this )
    this.handleAddModal = this.handleAddModal.bind( this )
    this.handelRevertChangesModal = this.handelRevertChangesModal.bind( this )
    this.revertChanges = this.revertChanges.bind( this )

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
                  <a onClick={() => this.save(record.key)}>Cambiar cantidad</a>
                  <Divider type="vertical" />
                  <Popconfirm title="¿Esta seguro que quiere cancelar la operación?" onConfirm={() => this.cancel(record.key)}>
                    <a>Cancelar</a>
                  </Popconfirm>
                </span>
                : 
                <span>
                  <a onClick={() => this.edit(record.key)}>Editar</a>
                  <Divider type="vertical" />
                  <Popconfirm title="¿Desea eliminar este elemento?" onConfirm={() => this.deleteAmount(record.key)}>
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
          hasChanged: this.state.hasChanged,
          success: this.state.success,
          revertChangesModal: this.state.revertChangesModal,
          addModal: this.state.addModal,
          fastAmountValues: data
        } )
      } )
      .catch( err => {
        console.log( err )
      } )
  }

  addNewAmount() {
    this.props.form.validateFields( (err, values) => {
      if( !err ) {
        const newAmount = { 
          key: (this.state.fastAmountValues.length + 1).toString(),
          monto: values.newAmount 
        }

        const newFatsAmounts = this.state.fastAmountValues.concat( newAmount )

        newFatsAmounts.sort( (a,b) => {
          if (a.monto < b.monto)
            return -1
          if (a.monto > b.monto)
            return 1
          return 0
        } )

        this.setState( {
          hasChanged: true,
          success: this.state.success,
          revertChangesModal: this.state.revertChangesModal,
          addModal: false,
          fastAmountValues: newFatsAmounts
        } )

        console.log(newAmount)
        
      }
    } )
  }

  cancel(key) {
    const newData = [...this.state.fastAmountValues]
    const target = newData.filter(item => key === item.key)[0]
    if (target) {
      Object.assign(target, this.cacheData.filter(item => key === item.key)[0])
      delete target.editable;
      this.setState({ 
        hasChanged: this.state.hasChanged,
        success: this.state.success,
        revertChangesModal: this.state.revertChangesModal,
        addModal: this.state.addModal,
        fastAmountValues: newData 
      })
    }
  }

  save(key) {
    const newData = [...this.state.fastAmountValues];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      delete target.editable;

      newData.sort( (a,b) => {
        if (a.monto < b.monto)
          return -1
        if (a.monto > b.monto)
          return 1
        return 0
      } )

      this.setState({ 
        hasChanged: true,
        success: this.state.success,
        revertChangesModal: this.state.revertChangesModal,
        addModal: this.state.addModal,
        fastAmountValues: newData 
      })
      this.cacheData = newData.map(item => ({ ...item }));
    }
  }

  deleteAmount( key ) {
    let amounts = this.state.fastAmountValues
    key = amounts.findIndex( element => element.key === key.toString() )
    amounts.splice( key, 1 )
    this.setState( {
      hasChanged: true,
      success: this.state.success,
      revertChangesModal: this.state.revertChangesModal,
      addModal: this.state.addModal,
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
        hasChanged: this.state.hasChanged,
        success: this.state.success,
        revertChangesModal: this.state.revertChangesModal,
        addModal: this.state.addModal,
        fastAmountValues: newData 
      })
    }
  }

  handleAddModal() {
    this.setState( {
      hasChanged: this.state.hasChanged,
      success: this.state.success,
      revertChangesModal: this.state.revertChangesModal,
      addModal: !this.state.addModal,
      fastAmountValues: this.state.fastAmountValues
    } )
  }

  handleChange(value, key, column) {
    const newData = [...this.state.fastAmountValues]
    const target = newData.filter(item => key === item.key)[0]
    if (target) {
      target[column] = value;
      this.setState({ 
        hasChanged: this.state.hasChanged,
        success: this.state.success,
        revertChangesModal: this.state.revertChangesModal,
        addModal: this.state.addModal,
        fastAmountValues: newData 
      })
    }
  }

  handelRevertChangesModal() {
    this.setState( {
      hasChanged: this.state.hasChanged,
      success: this.state.success,
      revertChangesModal: !this.setState.revertChangesModal,
      addModal: this.state.addModal,
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
          hasChanged: false,
          success: this.state.success,
          revertChangesModal: false,
          addModal: this.state.addModal,
          fastAmountValues: response
        } )
      } )
      .catch( err => {
        console.log( err )
      } )
  }
  
  render() {
    const { getFieldDecorator } = this.props.form
    const changeMessage = this.state.hasChanged ? (<Alert style={{width: 'max-content', marginBottom: '20px'}} message="Se han detectado cambios, favor de guardarlos para que tengan efecto." type="warning" showIcon />) : ''

    const changesModal = (
      <Modal
        title="Revertir Cambios"
        visible={this.state.revertChangesModal}
        onOk={this.revertChanges}
        onCancel={this.handelRevertChangesModal}
      >
        <p>¿Desea revertir todos los cambios realizados?</p>
        
      </Modal>)

    const addModal = (
      <Modal
        title="Agregar nuevo monto rápido"
        visible={this.state.addModal}
        onOk={ this.addNewAmount }
        onCancel={this.handleAddModal}
      >
        <Form>
          <FormItem
            label="Nuevo monto:"
            className="amount-form"
          >
            {getFieldDecorator('newAmount', {
              rules: [{ required: true, message: 'Ingrese un valor!' }],
            })(
              <InputNumber 
                min={1} 
                onChange={ ()=>{} }
              />
            )}
          </FormItem>
        </Form>
        
      </Modal>
    )

    return(
      <div className="amounts-container">
        {changeMessage}
        <h4>Porfavor, asigne los valores deseados</h4>

        <Table
          className="amonts-table" 
          columns={this.columns} 
          dataSource={this.state.fastAmountValues} 
        />

        <div>
          <Button disabled={!this.state.hasChanged} className="button-fixed" icon="save" type="primary" >Guardar Cambios</Button>
          <Button className="button-fixed" icon="plus" type="primary" onClick={this.handleAddModal} >Agregar Monto</Button>
          <Button disabled={!this.state.hasChanged} icon="close" type="primary" onClick={this.handelRevertChangesModal} >Cancelar Cambios</Button>

          {changesModal}
          {addModal}
          
        </div>
      </div>
    )
  }
}

const WrappedAmountsSection = Form.create()(AmountsSection);
module.exports = WrappedAmountsSection