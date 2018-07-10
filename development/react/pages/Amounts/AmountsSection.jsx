/**
 * Componente que representa a la sección de manejo de recargas rápidas del casino
 * @namespace AmountsSection
 * @extends Component
 */
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
  InputNumber,
  notification
} from 'antd'
import Api from '../../controllers/Api'
import ErrorManagment from '../../controllers/ErrorManagment'

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

  /**
   * Crea el componente
   * @param {object} props 
   */
  constructor( props ) {
    super( props )
 
    this.state = {
      loading: true,
      hasChanged: false,
      success: false,
      revertChangesModal: false,
      addModal: false,
      updateModal: false,
      fastAmountValues: []
    }

    this.cacheData = []
    this.amountsBackup = []
    this.api = new Api()
    this.errorManagment = new ErrorManagment()

    this.addNewAmount = this.addNewAmount.bind( this )
    this.deleteAmount = this.deleteAmount.bind( this )
    this.handleAddModal = this.handleAddModal.bind( this )
    this.handelRevertChangesModal = this.handelRevertChangesModal.bind( this )
    this.handleUpdateModal = this.handleUpdateModal.bind( this )
    this.revertChanges = this.revertChanges.bind( this )
    this.updateAmounts = this.updateAmounts.bind( this )

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

  /**
   * Función que se ejecuta antes de randerizas la vista, obtiene los valores guardados en la API
   */
  componentWillMount() {
    this.api.getFastAmountsValues()
      .then( response => {
        const data = []
        response.map( ( amount, index ) => {
          data.push( { key: index.toString(), monto: amount/100 } )
        } )
        this.cacheData = data

        this.setState( {
          loading: false,
          hasChanged: this.state.hasChanged,
          success: this.state.success,
          revertChangesModal: this.state.revertChangesModal,
          addModal: this.state.addModal,
          updateModal: this.state.updateModal,
          fastAmountValues: data
        } )
      } )
      .catch( err => {
        console.log( err )
      } )
  }

  /**
   * Función que guarda una nueva cantidad de recarga en la API
   */
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
          loading: false,
          hasChanged: true,
          success: false,
          revertChangesModal: this.state.revertChangesModal,
          addModal: false,
          updateModal: this.state.updateModal,
          fastAmountValues: newFatsAmounts
        } )
        
      }
    } )
  }

  /**
   * Cierra el modal de editar una cantidad en especifica
   * @param {String} key ID del elemento seleccionado
   */
  cancel(key) {
    const newData = [...this.state.fastAmountValues]
    const target = newData.filter(item => key === item.key)[0]
    if (target) {
      Object.assign(target, this.cacheData.filter(item => key === item.key)[0])
      delete target.editable;
      this.setState({ 
        loading: false,
        hasChanged: this.state.hasChanged,
        success: false,
        revertChangesModal: this.state.revertChangesModal,
        addModal: this.state.addModal,
        updateModal: this.state.updateModal,
        fastAmountValues: newData 
      })
    }
  }

  /**
   * Guarda los cambios realizados de editar una cantidad
   * @param {String} key ID del elemento seleccionado
   */
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
        loading: false,
        hasChanged: true,
        success: false,
        revertChangesModal: this.state.revertChangesModal,
        addModal: this.state.addModal,
        updateModal: this.state.updateModal,
        fastAmountValues: newData 
      })
      this.cacheData = newData.map(item => ({ ...item }));
    }
  }

  /**
   * Elimina un elemento seleccionado
   * @param {String} key ID del elemento seleccionado
   */
  deleteAmount( key ) {
    let amounts = this.state.fastAmountValues
    key = amounts.findIndex( element => element.key === key.toString() )
    amounts.splice( key, 1 )
    this.setState( {
      loading: false,
      hasChanged: true,
      success: false,
      revertChangesModal: this.state.revertChangesModal,
      addModal: this.state.addModal,
      updateModal: this.state.updateModal,
      fastAmountValues: amounts
    } )
    
  }

  /**
   * Muestra el formulario para editar un elemento seleccionado
   * @param {String} key ID del elemento seleccionado
   */
  edit(key) {
    const newData = [...this.state.fastAmountValues]
    
    const target = newData.filter(item => 
      key === item.key
    
    )[0]

    if (target) {
      
      target.editable = true;
      this.setState({ 
        loading: false,
        hasChanged: this.state.hasChanged,
        success: false,
        revertChangesModal: this.state.revertChangesModal,
        addModal: this.state.addModal,
        updateModal: this.state.updateModal,
        fastAmountValues: newData 
      })
    }
  }

  /**
   * Función que maneja el modal para agregar una nueva cantidad de recarga
   */
  handleAddModal() {
    this.setState( {
      loading: false,
      hasChanged: this.state.hasChanged,
      success: false,
      revertChangesModal: this.state.revertChangesModal,
      addModal: !this.state.addModal,
      updateModal: this.state.updateModal,
      fastAmountValues: this.state.fastAmountValues
    } )
  }

  /**
   *  Muestra las opciones de edición de un elemento seleccionado
   * @param {String} value Valor de la fila seleccionada
   * @param {String} key Identificador de la fila
   * @param {String} column Columna del elemento seleccionado
   */
  handleChange(value, key, column) {
    const newData = [...this.state.fastAmountValues]
    const target = newData.filter(item => key === item.key)[0]
    if (target) {
      target[column] = value;
      this.setState({ 
        loading: false,
        hasChanged: this.state.hasChanged,
        success: false,
        revertChangesModal: this.state.revertChangesModal,
        addModal: this.state.addModal,
        updateModal: this.state.updateModal,
        fastAmountValues: newData 
      })
    }
  }

  /**
   * Maneja el modal de confirmación de guardar cambios
   */
  handleUpdateModal() {
    this.setState( {
      loading: false,
      hasChanged: this.state.hasChanged,
      success: this.state.success,
      revertChangesModal: this.setState.revertChangesModal,
      addModal: this.state.addModal,
      updateModal: !this.state.updateModal,
      fastAmountValues: this.state.fastAmountValues
    } )
  }

  /**
   * Maneja el modal para revertir cambios
   */
  handelRevertChangesModal() {
    this.setState( {
      loading: false,
      hasChanged: this.state.hasChanged,
      success: this.state.success,
      revertChangesModal: !this.setState.revertChangesModal,
      addModal: this.state.addModal,
      updateModal: this.state.updateModal,
      fastAmountValues: this.state.fastAmountValues
    } )
  }

  /**
   * Randeriza un componente EditableCell
   * @param {String} text 
   * @param {object} record 
   * @param {object} column 
   */
  renderColumns(text, record, column) {
    return (
      <EditableCell
        editable={record.editable}
        value={text}
        onChange={value => this.handleChange(value, record.key, column)}
      />
    );
  }

  /**
   * Revierte los cambios realizados voliendo a solicitar los valores guardados en la API
   */
  revertChanges() {
    this.api.getFastAmountsValues()
      .then( response => {
        const data = []
        response.map( ( amount, index ) => {
          data.push( { key: index.toString(), monto: amount/100 } )
        } )
        this.cacheData = data

        this.amountsBackup = response
        this.setState( {
          loading: false,
          hasChanged: false,
          success: false,
          revertChangesModal: false,
          addModal: this.state.addModal,
          updateModal: this.state.updateModal,
          fastAmountValues: data
        } )
      } )
      .catch( err => {
        console.log( err )
      } )
  }

  /**
   * Función que envia a la API los cambios realizados al usuario
   */
  updateAmounts() {
    const { fastAmountValues } = this.state
    let newAmounts = []

    fastAmountValues.map( amount => {
      newAmounts.push( (amount.monto * 100) )
    } )

    this.api.updateFastAmounts( newAmounts )
      .then( response => {
        this.handleUpdateModal()

        if ( response.status === 200 ) {
          this.setState( {
            loading: false,
            hasChanged: false,
            success: true,
            revertChangesModal: this.state.revertChangesModal,
            addModal: this.state.addModal,
            updateModal: false,
            fastAmountValues: this.state.fastAmountValues
          } )
        } else {
          // TODO: Handle Error
          this.errorManagment.resolveError( response.data )
        }
      } )
      .catch( err => {
        this.handleUpdateModal()
        console.log( err )
      } )
  }

  /**
   * Muestra una notificación al usuario
   * @param {String} type Tipo de notificación que se le mostrara al usuario 
   * @param {*} message Título de la notificación
   * @param {*} description Mensaje de la notificación
   */
  openNotification( type, message, description ) {
    notification[type]({
      message,
      description
    } )
  }
  
  /**
   * Randeriza la vista al usuario
   * @returns {string} HTML markup del componente.
   */
  render() {
    const { getFieldDecorator } = this.props.form
    const changeMessage = this.state.hasChanged ? (<Alert style={{width: 'max-content', marginBottom: '20px'}} message="Se han detectado cambios, favor de guardarlos para que tengan efecto." type="warning" showIcon />) : ''
    this.state.success ? this.openNotification( 'success', 'Operación exitosa', 'Se han guardado los cambios con éxito.' ) : () => {}


    const changesModal = (
      <Modal
        title="Revertir Cambios"
        visible={this.state.revertChangesModal}
        onOk={this.revertChanges}
        onCancel={this.handelRevertChangesModal}
      >
        <p>¿Desea guardar todos los cambios realizados?</p>
    
      </Modal>)

    const updateModal = (
      <Modal
        title="Guardar Cambios"
        visible={this.state.updateModal}
        onOk={this.updateAmounts}
        onCancel={this.handleUpdateModal}
      >
        <p>¿Desea guardar todos los cambios realizados?</p>
    
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

    const loadingSpin = this.state.loading ? (
      <Icon 
        type="loading" 
        style={{ fontSize: '50px', display: 'block', margin: 'auto', marginBottom: '40px' }}
      /> ) : ''

    return(
      <div className="amounts-container">
        {changeMessage}
        {loadingSpin}

        <h4>Porfavor, asigne los valores deseados</h4>

        <Table
          className="amonts-table" 
          columns={this.columns} 
          dataSource={this.state.fastAmountValues} 
        />

        <div>
          <Button 
            disabled={!this.state.hasChanged} 
            className="button-fixed" icon="save" 
            type="primary" 
            onClick={this.handleUpdateModal}
          >
            Guardar Cambios
          </Button>

          <Button
            className="button-fixed"
            icon="plus" 
            type="primary"
            disabled={this.state.loading}
            onClick={this.handleAddModal} 
          >
            Agregar Monto
          </Button>

          <Button
            disabled={!this.state.hasChanged} 
            icon="close" 
            type="primary" 
            onClick={this.handelRevertChangesModal} 
          >
            Cancelar Cambios
          </Button>

          {changesModal}
          {updateModal}
          {addModal}
          
        </div>
      </div>
    )
  }
}

const WrappedAmountsSection = Form.create()(AmountsSection);
module.exports = WrappedAmountsSection