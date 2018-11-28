import React,{Component} from 'react'

import {Breadcrumb} from 'antd'
import './PageHeader.css'

class PageHeader extends Component {

  shouldComponentUpdate( nextProps ) {
    return nextProps.title !== this.props.title
  }

  render() {
    return(
      <div className="page-header">
        <Breadcrumb className="breadcrumb">
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            {
              this.props.path.map( (item, index) => {
                return(
                  <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
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

export default PageHeader