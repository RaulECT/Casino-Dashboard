import React, {Component} from 'react'
import { 
  Checkbox,
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

import '../styles/rolesSection.css'

const FormItem = Form.Item
const CheckboxGroup = Checkbox.Group

class RolesSection extends Component {

  constructor( props ) {
    super( props )

    this.state = {
      loading: true,
      hasChanged: false,
      success: false,
      revertChangesModal: false,
      addModal: false,
      updateModal: false,
      roles: []
    }

    this.newRolPermissions = {}
    this.api = new Api()

    this.labelsOptions = [
      { label:'Reponer membresia.', value:'editCardId' },
      { label:'Ver miembros.', value:'consultCustomers' },
      { label:'Atender mesa de juego.', value:'beAssignedToTableGame' },
      { label:'Acceso a la app de caja.', value:'till' },
      { label:'Acceso a la app de juegos.', value:'tableGame' },
      { label:'Acceso a la app de recepción.', value:'reception' },
      { label:'Acceso a la app de administración.', value:'adminModule' },
      { label:'Crear miembros.', value:'createCustomers' },
      { label:'Editar miembros.', value:'editCustomers' },
      { label:'Consultar saldo de miembros.', value:'consultCustomerBalance' },
      { label:'Acceso a la app de pitboss.', value:'pitbossModule' }
    ]

    this.columns = [ {
      title: 'Rol',
      dataIndex: 'name'
    }, 
    {
      title: 'Operaciones',
      dataIndex: 'operation',
      render: ( text, record ) => {

        return(
          <div className="editable-row-operations">
            <span>
              <a onClick={()=> {}}>Editar</a>
              <Divider type="vertical" />
              <Popconfirm title="¿Desea eliminar este elemento?" onConfirm={ () => this.deleteRole( record.key ) }>
                <a>Eliminar</a>
              </Popconfirm>
            </span>
          </div>
        )
        
      }
    } ]

    this.addNewRol = this.addNewRol.bind( this )
    this.deleteRole = this.deleteRole.bind( this )
    this.onChangePermissions = this.onChangePermissions.bind( this )
    this.loadRoles = this.loadRoles.bind( this )

    this.loadRoles()
  }

  addNewRol() {

    this.props.form.validateFields( (err, values) => {
      if ( !err ) {
        console.log( values )
        console.log( this.newRolPermissions )
      }
    } )
  }

  deleteRole( roleKey ) {

    let rolesList = this.state.roles
    const rolePosition = rolesList.findIndex( element => element.key === roleKey.toString() )
    rolesList.splice( rolePosition, 1 )

    this.setState( {
      loading: this.state.loading,
      hasChanged: true,
      success: this.state.success,
      revertChangesModal: this.state.revertChangesModal,
      addModal: this.state.addModal,
      updateModal: this.state.updateModal,
      roles: rolesList
    } )
  }

  onChangePermissions( checkedValues ) {

    let perm = {}
    checkedValues.map( item => {
      perm[item] = true
    } )

    this.newRolPermissions = perm
  }

  loadRoles() {
    this.api.getRoles()
      .then( response => {
        
        if ( response.status === 200 ) {
          const roles = response.data.result.rolesArray
          console.log( roles )
          roles.map( ( element, index ) => {
            element['key'] = index.toString()
          } )
          console.log( roles )

          this.setState( {
            loading: this.state.loading,
            hasChanged: this.state.hasChanged,
            success: this.state.success,
            revertChangesModal: this.state.revertChangesModal,
            addModal: this.state.addModal,
            updateModal: this.state.updateModal,
            roles: roles
          } ) 
        } else {
          // TODO: Handle Error
        }
      } )
      .catch( err => {
        console.log( err )
      } )
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const changeMessage = this.state.hasChanged ? (<Alert style={{width: 'max-content', marginBottom: '20px'}} message="Se han detectado cambios, favor de guardarlos para que tengan efecto." type="warning" showIcon />) : ''
    const addRoleModal = (
      <Modal
        visible={false}
        title="Agregar nuevo Rol"
        okText="Crear rol"
        onCancel={ () => {} }
        onOk={ ()=>{} }
        footer={ [
          <Button key="2" onClick={ ()=>{} }>Cancelar</Button>,
          <Popconfirm key="1" title="¿Desea crear este rol?" onConfirm={ () => { this.addNewRol()  }  }>
            <Button type="primary">Crear rol</Button>
          </Popconfirm>
        ] }
      >
        <Form layout="vertical">
          <FormItem label="Nuevo Rol:" className="add-rol-section">
            { getFieldDecorator( 'newRole', {
              rules: [ {required: true, message: 'Ingrese un valor!'} ]
            } )(
              <Input />
            ) }
            
          </FormItem>

          <p>Permisos:</p>
          <CheckboxGroup 
            style={{ width: '100%' }}
            className="permison-section"
            options={this.labelsOptions}
            onChange={this.onChangePermissions}
          />
        </Form>
      </Modal>
    )

    return(
      <div className="roles-container">
        {changeMessage}

        <h4>Porfavor, asigne los valores deseados</h4>

        { addRoleModal }

        <Table 
          className="roles-table"
          columns={this.columns}
          dataSource={this.state.roles}
        />

        <div>
          <Button
            disabled={!this.state.hasChanged}
            className="button-fixed"
            icon="save"
            type="primary"
          >
            Guardar Cambios
          </Button>

          <Button
            className="button-fixed"
            icon="plus"
            type="primary"
            disabled={this.state.loading}
          >
            Agregar Monto
          </Button>

          <Button
            disabled={!this.state.hasChanged}
            icon="close"
            type="primary"
          >
            Revertir Cambios
          </Button>


        </div>
      </div>
    )
  }

}

const WrappedRoleSection = Form.create()(RolesSection);
module.exports = WrappedRoleSection
