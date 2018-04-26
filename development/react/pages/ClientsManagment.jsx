import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import GlobalHeader from './GlobalHeader.jsx'
import PageHeader from './PageHeader.jsx'
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
import ClientsSection from './ClientsSection/ClientsSection.jsx'

import './styles/configurations.css'

const { Header, Sider, Content } = Layout
const SubMenu = Menu.SubMenu
const FormItem = Form.Item

class ClientsManagment extends Component{
    constructor( props ) {
        super( props )
        
    
        this.state = {
          collapsed: false,
          isMobile: false
        }
    
        this.toggle = this.toggle.bind( this )
    }

    toggle() {
        this.setState( {
          collapsed: !this.state.collapsed,
          isMobile: this.state.isMobile,
          actualPanel: this.state.actualPanel
        } )
    }

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
                defaultSelectedKeys={['9']}
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
                  <Menu.Item key="8">Option sub 4</Menu.Item>
                </SubMenu>

                <Menu.Item key="9">
                  <Icon type="table" />
                  <span>Administración de Clientes</span>
                </Menu.Item>

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
                path = { ['Administración de Clientes'] }
                title = "Administración de Clientes"
              />
    
              <div className="dashboard-content">
                <ClientsSection />
              </div>
            </Layout>
          </Layout>
        )
      }
        
}

module.exports = ClientsManagment