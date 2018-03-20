import React, {Component} from 'react'
import { Breadcrumb } from 'antd';
import './styles/pageHeader.css'

class PageHeader extends Component {
  render() {
    return(
      <div className="page-header">
        <Breadcrumb className="breadcrumb">
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          {
            this.props.path.map( item => {
              return(
                <Breadcrumb.Item>{item}</Breadcrumb.Item>
              )
            } )
          }
        </Breadcrumb>

        <div className="detail">
          <div className="main">
            <div className="row">
              <h1 className="title"> {this.props.title} </h1>
            </div>
          </div>
        </div>
      </div>     
    )
  }
}

module.exports = PageHeader