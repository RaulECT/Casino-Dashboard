/**
 * Componente que representa a la sección de manejo de promociones.
 * @namespace Record
 * @extends Component
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
import TillRecord from './Records/TillRecord.jsx'

import './styles/configurations.css'

const { Header, Sider, Content } = Layout
const SubMenu = Menu.SubMenu
const FormItem = Form.Item

class Records extends Component {

  /**
   * Crea el componente.
   * @param {object} props 
   */
  constructor( props ) {
    super( props )
    
    this.state = {
      collapsed: false,
      isMobile: false
    }

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
   * Minimiza el menu lateral.
   */
  toggle() {
    this.setState( {
      collapsed: !this.state.collapsed,
      isMobile: this.state.isMobile,
      actualPanel: this.state.actualPanel
    } )
  }

  /**
   * Randeriza la vista del componente
   * @returns {string} HTML markup del componente.
   */
  render() {
    return(
      <Layout className="dashboard-layout">
        <Sider
          trigger = {null}
          breakpoint = "lg"
          width = {256}
          collapsible collapsed={ this.state.collapsed }
          className = { this.state.collapsed ? `sider drawer drawer-hide` : `sider drawer drawer-expanded` }
        >

          <div className="logo">
            <h1>Dashboard</h1>
          </div>

          <Menu
            theme="dark" 
            mode="inline" 
            style={{ padding: '16px 0', width: '100%' }} 
            defaultSelectedKeys={['10']}
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

            <Menu.Item key="11">
              <Link to="/dashboard/estadisticas">
                <Icon type="area-chart" />
                <span>Estadisticas</span>
              </Link>
            </Menu.Item>

            <Menu.Item key="10">
              <Icon type="profile" />
              <span>Historial</span>
            </Menu.Item>

          </Menu>

        </Sider>

        <Layout>
          <GlobalHeader 
            toggle = {this.toggle} 
            collapsed = {this.state.collapsed} 
            history={this.props.history}
          />

          <PageHeader
            path = { ['Historial'] }
            title = "Historial"
          />

          <div className="dashboard-content">
            {<TillRecord/>}
          </div>
        </Layout>
      </Layout>
    )
  }
}

module.exports = Records