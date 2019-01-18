import React, {Component} from 'react'
import { Link } from 'react-router-dom'

import Sider from 'antd/lib/layout/Sider';
import ProtectComponent from '../../hoc/ProtectComponent'
import { submenus } from './submenus'
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
    const menus = this.renderMenus()
    
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
              <Menu.Item key="bingo_submenu_control">
                <Link to="/dashboard/game_control">Control de partida</Link>
              </Menu.Item>
                       
              <Menu.Item key="bingo_submenu_create">
                <Link to="/dashboard/create_game">Crear partida</Link>
              </Menu.Item> 
            </SubMenu>
            

            <Menu.Item key="bingo_menu_cardboards">
              <Link to="/dashboard/cardboard_managment">
                <Icon type="barcode" />
                <span>Cartones</span>
              </Link>
            </Menu.Item>
            { menus }
          </Menu>
        </Sider>
    )
  }

  renderMenus = () => {
    const permissions = localStorage.getItem( 'permissions' ) ?
      JSON.parse( localStorage.getItem( 'permissions' ) ) : {}
    const modules = Object.keys( permissions )
    const menus = []
    
    modules.map( module => {
    
      switch ( module ) {
        case "games_TEST":
          const gamesOptions = this.renderOptions( 'games', permissions )
          
          menus.push(
            <SubMenu
              key="bingo_submenu"
              title={<span><Icon type="crown" /><span>Bingo</span></span>}
            >
              { gamesOptions }
            </SubMenu>
          )
          
          break;

        case "cardboards_TEST":
          menus.push(
            <Menu.Item key="bingo_menu_cardboards">
              <Link to="/dashboard/cardboard_managment">
                <Icon type="barcode" />
                <span>Cartones</span>
              </Link>
            </Menu.Item>
          )

          break

        case "casinos":
          const casinoOptions = this.renderOptions( 'casinos', permissions )
          // menus.push(
          //   <Menu.Item key="bingo_casinos">
          //     <Link to="/dashboard/casinos">
          //       <Icon type="shop" />
          //       <span>Creación de Casinos</span>
          //     </Link>
          //   </Menu.Item>
          // )

          menus.push(
            <SubMenu
              key="casino_submenu"
              title={<span><Icon type="shop" /><span>Manejo de Casinos</span></span>}
            >
              <Menu.Item key="bingo_casinos_list">
                <Link to="/dashboard/casinos_list">Lista de Casinos</Link>
              </Menu.Item>
              { casinoOptions }
            </SubMenu>
          )

          break
      
        default:
          break;
      }
    } )

    return menus
  }

  renderOptions = ( module, permissions ) => {
    const options = []

    permissions[module].map( perm => {
      options.push( submenus[perm] )
    } )

    return options
  }
}

export default Sidebar