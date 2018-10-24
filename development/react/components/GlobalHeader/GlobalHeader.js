import React, {Component} from 'react'
import { connect } from 'react-redux'

import {
  Layout,
  Menu,
  Icon,
  Avatar,
  Divider,
  Modal,
  Dropdown
} from 'antd'
import './GlobalHeader.css'
import { logout } from '../../store/actions/index'

const { Header, Sider, Content } = Layout


class GlobalHeader extends Component {

  state = {
    isLogOutModalShowing: false
  }

  showLogOutModal = () => {
    this.setState( {
      isLogOutModalShowing: !this.state.isLogOutModalShowing
    } )
  }

  render() {
    const {collapsed, toggle} = this.props
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
              <Avatar size="small" className="avatar" icon="user" />
            </span>
          </Dropdown>

          <Modal
            title="Cerrar Sesión"
            visible={this.state.isLogOutModalShowing}
            onOk={() => this.props.onLogout( this.props.history.push ) }
            onCancel={this.showLogOutModal}
          >
            <p>¿Deseas cerrar sesión?</p>
              
          </Modal>
        </div>
      </Header>)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogout: ( push ) => dispatch( logout( push ) )
  }
}

export default connect( null, mapDispatchToProps )( GlobalHeader )