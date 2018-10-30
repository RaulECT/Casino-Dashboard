import React, {Component} from 'react'
import {Route, Link} from 'react-router-dom'
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
import GameControl from '../GameControl/GameControl'
import './Dashboard.css'
import Sider from 'antd/lib/layout/Sider';
import CreateGame from '../CreateGame/CreateGame'
import CardboardManagment from '../CardboardManagment/CardboardManagment'


const SubMenu = Menu.SubMenu

class Dashboard extends Component {

  constructor( props ) {
    super( props )

    this.state = {
      collapsed: false,
      isMobile: false,
      currentSection: 'Control de Partida'
    }

    this.titlesDictionary = {
      bingo_submenu_control: 'Control de Partida',
      bingo_submenu_create: 'Crear Partida',
      bingo_menu_cardboards: 'Manejo de cartones'
    }
  }

  onToggle = () => {
    this.setState( ( prevState ) => {
      return { ...prevState, collapsed: !prevState.collapsed }
    } )
  }

  changePanelHeader = ( panel ) => {
    const panelKey = panel.key
    const newTitle = this.titlesDictionary[panelKey]
    
    this.setState( {currentSection: newTitle} )
  }

  render() {

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
            defaultSelectedKeys={['bingo_submenu_control']}
            defaultOpenKeys={['bingo_submenu']}
            onSelect={ this.changePanelHeader }
          >
            <SubMenu
              key="bingo_submenu"
              title={<span><Icon type="crown" /><span>Bingo</span></span>}
            >
              <Menu.Item key="bingo_submenu_control"><Link to="/dashboard/game_control">Control de partida</Link></Menu.Item>
              <Menu.Item key="bingo_submenu_create"><Link to="/dashboard/create_game">Crear partida</Link></Menu.Item> 
            </SubMenu>

            <Menu.Item key="bingo_menu_cardboards">
              <Link to="/dashboard/cardboard_managment">
                <Icon type="barcode" />
                <span>Cartones</span>
              </Link>
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
            <Route exact path="/dashboard/game_control" component={GameControl} />
            <Route exact path="/dashboard/create_game" component={CreateGame} />
            <Route exact path="/dashboard/cardboard_managment" component={CardboardManagment} />
            <Route exact path="/" component={GameControl} />
          </div>
        </Layout>
      </Layout>
    )
  }
}

export default Dashboard