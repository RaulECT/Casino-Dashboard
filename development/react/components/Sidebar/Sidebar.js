import React, {Component} from 'react'
import { Link } from 'react-router-dom'

import Sider from 'antd/lib/layout/Sider';
import {
  Menu,
  Icon
} from 'antd'

const SubMenu = Menu.SubMenu

class Sidebar extends Component {

  shouldComponentUpdate( nextProps ) {
    return nextProps.collapsed !== this.props.collapsed
  }

  render() {
    return(
      <Sider
          trigger={null}
          breakpoint="lg"
          width={256}
          collapsible
          collapsed = { this.props.collapsed }
          className={ this.props.collapsed ? `sider drawer drawer-hide` : `sider drawer drawer-expanded` }
        >
          <div className="logo">
            <h1>Bingo</h1>
          </div>

          <Menu
            theme="dark"
            mode="inline"
            style={{ padding: '16px 0', width: '100%' }}
            onSelect={ this.props.onChangePanelHeader }
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
    )
  }
}

export default Sidebar