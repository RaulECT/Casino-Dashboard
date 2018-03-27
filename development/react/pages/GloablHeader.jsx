import React, {Component} from 'react'
import { Layout, Menu, Icon, Avatar, Divider, Modal, Dropdown } from 'antd'
import './styles/configurations.css'

const { Header, Sider, Content } = Layout

class GlobalHeader extends Component {
  constructor( props ) {
    super( props )

    this.state = {
      isLogOutModalShowing: false
    }

    this.logOutUser = this.logOutUser.bind( this )
    this.showLogOutModal = this.showLogOutModal.bind( this )
  }

  logOutUser() {

  }

  showLogOutModal() {
    this.setState( {
      isLogOutModalShowing: !this.state.isLogOutModalShowing
    } )
  }

  render() {
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
          type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.props.toggle}
        />

        <div className="header-right-menu">
          <Dropdown overlay={hoverMenu}>
            <span className="action account">
              <Avatar size="small" className="avatar" src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" />
              <span className="name">Usuario</span>
            </span>
          </Dropdown>

          <Modal
            title="Cerrar Sesión"
            visible={this.state.isLogOutModalShowing}
            onOk={this.logOutUser}
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