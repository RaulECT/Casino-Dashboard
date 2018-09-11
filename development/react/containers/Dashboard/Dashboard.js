import React, {Component} from 'react'
import {
  Layout, 
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
  Col
} from 'antd'

import GlobalHeader from '../../components/GlobalHeader/GlobalHeader'
import PageHeader from '../../components/PageHeader/PageHeader'
import './Dashboard.css'
import Sider from 'antd/lib/layout/Sider';

class Dashboard extends Component {

  constructor( props ) {
    super( props )

    this.state = {
      collapsed: false,
      isMobile: false,
      currentSection: 'Juego Bingo'
    }
  }

  getSection = () => {
    let component = null

    switch ( this.state.currentSection ) {
      case 'Juego Bingo':
        component = null
        break;
    
      default:
        component = null
        break;
    }

    return component
  }

  onToggle = () => {
    this.setState( ( prevState ) => {
      return { ...prevState, collapsed: !prevState.collapsed }
    } )
  }

  render() {
    const section = this.getSection()

    return(
      <Layout className="dashboard-layout">
        <Sider
          trigger={null}
          breakpoint="lg"
          width={256}
          collapsible
          collapsed = { this.state.collapsed }
          className={ this.state.collapsed ? `sider drawer drawer-hide` : `sider drawer drawer-expanded` }
        >
          <div className="logo">
            <h1>Bingo</h1>
          </div>

          <Menu
            theme="dark"
            mode="inline"
            style={{ padding: '16px 0', width: '100%' }}
            defaultSelectedKeys={['1']}
          >
            <Menu.Item key="1">
              <Icon type="dashboard" />
              <span>Juego Bingo</span>
            </Menu.Item>
          </Menu>
        </Sider>

        <Layout>
          <GlobalHeader 
            toggle={this.onToggle} 
            collapsed = {this.state.collapsed} 
            history={this.props.history}
          />

          <PageHeader 
            path={ [ this.state.currentSection ] }
            title={ this.state.currentSection }
          />

          <div className="dashboard-content">
            { section }
          </div>
        </Layout>
      </Layout>
    )
  }
}

export default Dashboard