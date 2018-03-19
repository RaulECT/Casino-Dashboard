import React, {Component} from 'react'
import { Layout, Menu, Icon, Avatar, Divider, Select, Modal, Tooltip, Dropdown } from 'antd'

class Generalconfigurations extends Component {
  constructor( props ) {
    super( props )

    this.state = {
      collapsed: false,
      isLogOutModalShowing: false,
      isMobile: false
    }
  }

  render() {
    return(
      <div>
        Hola
      </div>
    )
  }
}

module.exports = Generalconfigurations