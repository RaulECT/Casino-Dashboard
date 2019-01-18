import React from 'react'
import { Link } from 'react-router-dom'

import {
  Menu,
  Icon
} from 'antd'

export const submenus = {
  createGame: (
    <Menu.Item key="bingo_submenu_create">
      <Link to="/dashboard/create_game">Crear partida</Link>
    </Menu.Item> 
  ),
  manageGame: (
    <Menu.Item key="bingo_submenu_control">
      <Link to="/dashboard/game_control">Control de partida</Link>
    </Menu.Item>
  ),
  createCasino: (
    <Menu.Item key="bingo_casinos">
      <Link to="/dashboard/casinos">Creación de Casinos</Link>
    </Menu.Item>
  )
}