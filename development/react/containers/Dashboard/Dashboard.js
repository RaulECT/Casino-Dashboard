import React, {Component} from 'react'
import {Route} from 'react-router-dom'
import {
  Layout
} from 'antd'

import GlobalHeader from '../../components/GlobalHeader/GlobalHeader'
import PageHeader from '../../components/PageHeader/PageHeader'
import Sidebar from '../../components/Sidebar/Sidebar'
import ProtectComponent from '../../hoc/ProtectComponent'
import './Dashboard.css'
import { 
  GameControl,
  CreateGame,
  CardboardManagment,
  CasinoControl,
  CasinoList
} from '../../routes'

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
      bingo_menu_cardboards: 'Manejo de cartones',
      bingo_casinos: 'Creación de casinos',
      bingo_casinos_list: 'Lista de casinos'
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

        <Sidebar 
          collapsed={this.state.collapsed}
          onChangePanelHeader={this.changePanelHeader}
        />

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
            
            <ProtectComponent
              module="games"
              isModule
            >
              <Route exact path="/dashboard/game_control" component={GameControl} />
            </ProtectComponent>
          
            <Route exact path="/dashboard/casinos" component={CasinoControl} />
            <Route exact path="/dashboard/casinos_list" component={CasinoList} />
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