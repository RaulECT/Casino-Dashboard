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
import ChipItem from './ChipItem.jsx'
import './styles/configurations.css'

import aquaChip from './images/poker-chip-aqua.png'
import blackChip from './images/poker-chip-black.png'
import blueChip from './images/poker-chip-blue.png'
import greenChip from './images/poker-chip-green.png'
import orangeChip from './images/poker-chip-orange.png'
import pinkChip from './images/poker-chip-pink.png'
import purpleChip from './images/poker-chip-purple.png'
import redChip from './images/poker-chip-red.png'
import grayChip from './images/poker-chip-gray.png'

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
              <Row style={{marginTop: '40px', marginBottom: '70px'}}>
                <Col span={4}>
                  <ChipItem 
                    img={aquaChip}
                    value={1}
                  />         
                </Col>

                <Col span={4} offset={1}>
                  <ChipItem 
                    img={blackChip}
                    value={2}
                  />         
                </Col>

                <Col span={4} offset={1}>
                  <ChipItem 
                    img={blueChip}
                    value={5}
                  />         
                </Col>

                <Col span={4} offset={1}>
                  <ChipItem 
                    img={greenChip}
                    value={10}
                  />         
                </Col>

                <Col span={4} offset={1}>
                  <ChipItem 
                    img={orangeChip}
                    value={20}
                  />         
                </Col>
              </Row>

              <Row style={{marginBottom: '70px'}}>
                <Col span={6}>
                  <ChipItem 
                    img={pinkChip}
                    value={50}
                  />         
                </Col>

                <Col span={6}>
                  <ChipItem 
                    img={purpleChip}
                    value={100}
                  />         
                </Col>

                <Col span={6}>
                  <ChipItem 
                    img={redChip}
                    value={200}
                  />         
                </Col>

                <Col span={6}>
                  <ChipItem 
                    img={grayChip}
                    value={500}
                  />         
                </Col>
              </Row>

              <FormItem style={{textAlign: 'center'}}>
                <Button size="large" type="primary" htmlType="submit" icon="save">
                  Guardar Cambios
                </Button>
              </FormItem>
            </Form>
          </div>
        </Layout>
      </Layout>
    )
  }
}



module.exports = Generalconfigurations