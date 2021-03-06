/**
 * Componete que representa a la sección de estadisticas.
 */
import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { Layout, 
  Menu, 
  Icon, 
  Avatar, 
  Divider, 
  Select, 
  Modal, 
  Tooltip, 
  Dropdown, 
  InputNumber,
  Row, 
  Button,
  Form,
  Col } from 'antd'
import GlobalHeader from './GlobalHeader.jsx'
import PageHeader from './PageHeader.jsx'

import GraphicsSection from './Stadistics/GraphicsSection.jsx'
import AutomaticDelivery from './Stadistics/AutomaticDelivery.jsx'

import './styles/configurations.css'
import './styles/graphicsSection.css'

const { Header, Sider, Content } = Layout
const SubMenu = Menu.SubMenu
const FormItem = Form.Item

class Stadistics extends Component {

  /**
   * Crea el componente.
   * @param {object} props 
   */
  constructor( props ) {
    super( props )
    
    this.state = {
      collapsed: false,
      isMobile: false,
      actualPanel: 'Gráficas'
    }

    this.changePanel = this.changePanel.bind( this )
    this.findComponent = this.findComponent.bind( this )
    this.toggle = this.toggle.bind( this )
  }

  /**
   * Función que se ejecuta antes de randerizar la vista.
   */
  componentWillMount() {
    const isNotLogged = !(localStorage.isLogin === 'true' && localStorage.token)

    if ( isNotLogged ) {
      this.props.history.push( '/' )
    }
  }

  /**
   * Cambia el panel que se esta mostrando al usuario.
   * @param {object} panel Panel que el usuario quiere ver
   */
  changePanel( panel ) {

    switch ( panel.key ) {
      case '17':
        this.setState( { actualPanel: 'Gráficas' } )
        break;

      case '18':
        this.setState( { actualPanel: 'Configurar envió automático' } )
        break;
    
      default:
        this.setState( { actualPanel: 'Gráficas' } )
        break;
    }
  }

  /**
   * Bueca el componente asociado al panel que el usario quiere ver.
   * @returns {Component} Componente de la vista seleccionada.
   */
  findComponent() {
    let component = ( <GraphicsSection /> )
    const { actualPanel } = this.state

    switch ( actualPanel ) {
      case 'Configurar envió automático':
        component = ( <AutomaticDelivery /> )
        break;

      case 'Estadisticas':
        component = ( <GraphicsSection /> )
        break;
    
      default:
        break;
    }

    return component
  }

  /**
   * Minimiza el menu lateral.
   */
  toggle() {
    this.setState( { collapsed: !this.state.collapsed } )
  }

  /**
   * Randeriza la vista del componente.
   * @returns {string} HTML markup del componente.
   */
  render() {
    const {collapsed, actualPanel} = this.state
    const component = this.findComponent()

    return(
      <Layout className="dashboard-layout">
        <Sider
          trigger = {null}
          breakpoint = "lg"
          width = {256}
          collapsible collapsed={ collapsed }
          className = { collapsed ? `sider drawer drawer-hide` : `sider drawer drawer-expanded` }
        >

          <div className="logo">
            <h1>Dashboard</h1>
          </div>

          <Menu
            theme="dark" 
            mode="inline" 
            style={{ padding: '16px 0', width: '100%' }} 
            defaultSelectedKeys={['17']}
            defaultOpenKeys={['sub6']}
            onSelect = { this.changePanel }
          >
            {/*<Menu.Item key="1">
              <Icon type="dashboard" />
              <span>Dashboard</span>
              </Menu.Item>*/}

            <Menu.Item key="2">
              <Link to="/dashboard/configuraciones_generales">
                <Icon type="setting" />
                <span>Configuración General</span>
              </Link>
            </Menu.Item>

            
            <Menu.Item key="7">
              <Link to="/dashboard/gestion_roles">
                <Icon type="idcard" />
                <span>Gestión de Roles</span>
              </Link>
            </Menu.Item>
            
            <Menu.Item key="4">
              <Link to="/dashboard/administracion_usuarios">
                <Icon type="team" />
                <span>Administración de Empleados</span>
              </Link>
            </Menu.Item>

            {/*<Menu.Item key="9">
              <Link to="/dashboard/clientes">
                <Icon type="table" />
                <span>Administración de Clientes</span>
              </Link>     
            </Menu.Item>*/}

            <Menu.Item key="8">
              <Link to="/dashboard/promociones">
                <Icon type="star-o" />
                <span>Promociones</span>
              </Link>
            </Menu.Item>

            <SubMenu
              key="sub6"
              title={<span><Icon type="area-chart" /><span>Estadisticas</span></span>}
            >
              <Menu.Item key="17">Gráficas</Menu.Item>
              <Menu.Item key="18">Configurar envió automático</Menu.Item>
            </SubMenu>

            <Menu.Item key="10">
              <Link to="/dashboard/historial">
                <Icon type="profile" />
                <span>Historial</span>
              </Link>
            </Menu.Item>

          </Menu>

        </Sider>

        <Layout>
          <GlobalHeader 
            toggle = {this.toggle} 
            collapsed = {collapsed} 
            history={this.props.history}
          />

          <PageHeader
            path = { ['Estadisticas', actualPanel] }
            title = {actualPanel}
          />

          <div className="dashboard-content">
            {component}
          </div>
        </Layout>
      </Layout>
    )
  }

}

module.exports = Stadistics