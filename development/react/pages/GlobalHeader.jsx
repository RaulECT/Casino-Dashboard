/**
 * Componente que representa al Header general del Dashboard.
 * @namespace GlobalHeader
 * @extends Component
 */
import React, {Component} from 'react'
import { Layout, Menu, Icon, Avatar, Divider, Modal, Dropdown } from 'antd'
import './styles/configurations.css'

const { Header, Sider, Content } = Layout

class GlobalHeader extends Component {

  /**
   * Crea el componente.
   * @param {object} props 
   */
  constructor( props ) {
    super( props )

    this.state = {
      isLogOutModalShowing: false
    }

    this.logOut = this.logOut.bind( this )
    this.showLogOutModal = this.showLogOutModal.bind( this )
  }

  /**
   * Cierrla sesión actual del usuario.
   */
  logOut() {
    localStorage.removeItem("isLogin")
    localStorage.removeItem("token")
    this.props.history.push( '/' )
  }

  /**
   * Muestra el modal de confirmación para cerrar sesión.
   */
  showLogOutModal() {
    this.setState( {
      isLogOutModalShowing: !this.state.isLogOutModalShowing
    } )
  }

  /**
   * Randeriza la vista del componente.
   * @returns {string} HTML markup del componente.
   */
  render() {
    let user = localStorage.user
    const {collapsed, toggle} = this.props
    const {isLogOutModalShowing} = this.state
    user = user || 'usuario'
    const hoverMenu = (
      <Menu className="user-menu" selectedKeys={[]} onClick={this.showLogOutModal}>
        <Menu.Divider />
        <Menu.Item key="logout"><Icon type="logout" onClick={this.showLogOutModal} />Cerrar Sesión</Menu.Item>
      </Menu>
    )

    return(
      <Header className="dashboard-header">
        <Icon
          className="trigger"
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={toggle}
        />

        <div className="header-right-menu">
          <Dropdown overlay={hoverMenu}>
            <span className="action account">
              <Avatar size="small" className="avatar" src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" />
              <span className="name">{user}</span>
            </span>
          </Dropdown>

          <Modal
            title="Cerrar Sesión"
            visible={isLogOutModalShowing}
            onOk={this.logOut}
            onCancel={this.showLogOutModal}
          >
            <p>¿Deseas cerrar sesión?</p>
              
          </Modal>
        </div>
      </Header>
    )
  }
}

module.exports = GlobalHeader