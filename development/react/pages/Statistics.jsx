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
import GlobalHeader from './GloablHeader.jsx'
import PageHeader from './PageHeader.jsx'

import GraphicsSection from './Stadistics/GraphicsSection.jsx'

import './styles/configurations.css'
import './styles/graphicsSection.css'

const { Header, Sider, Content } = Layout
const SubMenu = Menu.SubMenu
const FormItem = Form.Item

class Stadistics extends Component {
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

  componentWillMount() {
    const isNotLogged = !(localStorage.isLogin === 'true' && localStorage.token)

    if ( isNotLogged ) {
      this.props.history.push( '/' )
    } 
  }

  changePanel( panel ) {
    const { collapsed, isMobile } = this.state

    switch ( panel.key ) {
      case '17':
        this.setState( {
          actualPanel: 'Gráficas',
          collapsed,
          isMobile
        } )
        break;

      case '18':
        this.setState( {
          actualPanel: 'Configurar envió automático',
          collapsed,
          isMobile
        } )
        break;
    
      default:
        this.setState( {
          actualPanel: 'Gráficas',
          collapsed,
          isMobile
        } )
        break;
    }

  }

  findComponent() {
    let component = ( <GraphicsSection /> )
    const { actualPanel } = this.state

    switch ( actualPanel ) {
      case 'Configurar envió automático':
        component = ( <div></div> )
        break;

      case 'Estadisticas':
        component = ( <GraphicsSection /> )
        break;
    
      default:
        break;
    }

    return component
  }

  toggle() {
    this.setState( {
      collapsed: !this.state.collapsed,
      isMobile: this.state.isMobile,
      actualPanel: this.state.actualPanel
    } )
  }

  render() {

    const component = this.findComponent()

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
            defaultSelectedKeys={['17']}
            defaultOpenKeys={['sub6']}
            onSelect = { this.changePanel }
          >
            <Menu.Item key="1">
              <Icon type="dashboard" />
              <span>Dashboard</span>
            </Menu.Item>

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

            <SubMenu
              key="sub4"
              title={<span><Icon type="team" /><span>Administración de Usuarios</span></span>}
            >
              <Menu.Item key="7">Option sub 4</Menu.Item>
            </SubMenu>


            <Menu.Item key="9">
              <Link to="/dashboard/clientes">
                <Icon type="table" />
                <span>Administración de Clientes</span>
              </Link>     
            </Menu.Item>

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
            collapsed = {this.state.collapsed} 
            history={this.props.history}
          />

          <PageHeader
            path = { ['Estadisticas', this.state.actualPanel] }
            title = {this.state.actualPanel}
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