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
  Form,
  Col } from 'antd'
import GlobalHeader from './GloablHeader.jsx'
import PageHeader from './PageHeader.jsx'
import './styles/configurations.css'

import aquaChip from './images/poker-chip-aqua.png'

const { Header, Sider, Content } = Layout
const SubMenu = Menu.SubMenu
const FormItem = Form.Item

class Generalconfigurations extends Component {
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
      isMobile: this.state.isMobile
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
            defaultSelectedKeys={['2']}
            defaultOpenKeys={['sub2']}
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
          />

          <PageHeader
            path = { ['Configuración General', 'Fichas'] }
            title = "Fichas"
          />

          <div className="dashboard-content">

            <Form>
              <Row>
                <Col span={4}>
                  <div className="chip-container">
                    <img className="chip-image" src={aquaChip} alt=""/>
                    <FormItem
                      label="Valor"
                      className="chip-form"
                    >
                      <InputNumber className="chip-input" min={1} defaultValue={3} />
                    </FormItem>
                    
                  </div>
                  
                </Col>
              </Row>
            </Form>
          </div>
        </Layout>
      </Layout>
    )
  }
}



module.exports = Generalconfigurations