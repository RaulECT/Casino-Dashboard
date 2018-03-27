import React, {Component} from 'react'
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

import ChipsSection from './Chips/ChipsSection.jsx'
import AmountsSection from './Amounts/AmountsSection.jsx'
import ExchangeSection from './ExchangeRate/ExchangeSection.jsx'
import MembershipSection from './Membreship/MembershipSection.jsx'
import SchedulesSection from './Schedules/SchedulesSection.jsx'

import './styles/configurations.css'


const { Header, Sider, Content } = Layout
const SubMenu = Menu.SubMenu
const FormItem = Form.Item

class Generalconfigurations extends Component {
  constructor( props ) {
    super( props )
    

    this.state = {
      collapsed: false,
      isMobile: false,
      actualPanel: 'Fichas'
    }

    this.changePanel = this.changePanel.bind( this )
    this.toggle = this.toggle.bind( this )
  }

  componentWillMount() {
    const isNotLogged = !(localStorage.isLogin === 'true' && localStorage.token)

    if ( isNotLogged ) {
      this.props.history.push( '/' )
    } 
  }

  changePanel( panel ) {
    switch ( panel.key ) {
      case '2':
        this.setState( {
          collapsed: this.state.collapsed,
          isMobile: this.state.isMobile,
          actualPanel: 'Fichas'
        } )
        break;

      case '3':
        this.setState( {
          collapsed: this.state.collapsed,
          isMobile: this.state.isMobile,
          actualPanel: 'Montos rápidos'
        } )
        break;

      case '4':
        this.setState( {
          collapsed: this.state.collapsed,
          isMobile: this.state.isMobile,
          actualPanel: 'Tipo de cambio'
        } )
        break;

      case '5':
        this.setState( {
          collapsed: this.state.collapsed,
          isMobile: this.state.isMobile,
          actualPanel: 'Precio de Membresía'
        } )
        break;
        
      case '6':
        this.setState( {
          collapsed: this.state.collapsed,
          isMobile: this.state.isMobile,
          actualPanel: 'Horarios'
        } )
        break;
    
      default:
        break;
    }
    
  }

  findComponent() {
    let component = (<ChipsSection/>)

    switch ( this.state.actualPanel ) {
      case 'Fichas':
        component = (<ChipsSection/>)
        break;

      case 'Montos rápidos':
        component = (<AmountsSection/>)
        break
      
      case 'Tipo de cambio':
        component = (<ExchangeSection/>)
        break

      case 'Precio de Membresía':
        component = (<MembershipSection/>)
        break

      case 'Horarios':
        component = (<SchedulesSection/>)
        break

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
            defaultSelectedKeys={['2']}
            defaultOpenKeys={['sub2']}
            onSelect = { this.changePanel }
          >
            <Menu.Item key="1">
              <Icon type="dashboard" />
              <span>Dashboard</span>
            </Menu.Item>

            <SubMenu
              key="sub2"
              title={<span><Icon type="setting" /><span>Configuración General</span></span>}
            >
            
              <Menu.Item key="2">Fichas</Menu.Item>
              <Menu.Item key="3">Montos rápidos</Menu.Item>
              <Menu.Item key="4">Tipo de cambio</Menu.Item>
              <Menu.Item key="5">Precio de Membresía</Menu.Item>
              <Menu.Item key="6">Horarios</Menu.Item>
            </SubMenu>

            <SubMenu
              key="sub3"
              title={<span><Icon type="idcard" /><span>Gestión de Roles</span></span>}
            >
              <Menu.Item key="7">Option sub 3</Menu.Item>
            </SubMenu>

            <SubMenu
              key="sub4"
              title={<span><Icon type="team" /><span>Administración de Usuarios</span></span>}
            >
              <Menu.Item key="7">Option sub 4</Menu.Item>
            </SubMenu>

            <SubMenu
              key="sub5"
              title={<span><Icon type="table" /><span>Administración de Clientes</span></span>}
            >
              <Menu.Item key="7">Option sub 5</Menu.Item>
            </SubMenu>

            <SubMenu
              key="sub6"
              title={<span><Icon type="area-chart" /><span>Estadisticas</span></span>}
            >
              <Menu.Item key="7">Option sub 6</Menu.Item>
            </SubMenu>

          </Menu>

        </Sider>

        <Layout>
          <GlobalHeader 
            toggle = {this.toggle} 
            collapsed = {this.state.collapsed} 
            history={this.props.history}
          />

          <PageHeader
            path = { ['Configuración General', this.state.actualPanel] }
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



module.exports = Generalconfigurations