import React, {Component} from 'react'

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

const { Header, Sider, Content } = Layout

class GlobalHeader extends Component {

  render() {
    const {collapsed, toggle} = this.props

    return(
      <Header className="dashboard-header">
        <Icon
          className="trigger"
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={toggle}
        />
      </Header>)
  }
}

export default GlobalHeader