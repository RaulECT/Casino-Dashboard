import Loading from './components/Loading/Loading'
import Loadable from 'react-loadable'

export const CradboardsRegisteredList = Loadable( {
  loader: () => import( './containers/CradboardsRegisteredList/CradboardsRegisteredList' ),
  loading: Loading
} )

export const Login = Loadable( {
  loader: () => import( './containers/Login/Login' ),
  loading: Loading
} )

export const BingoGame = Loadable( {
  loader: () => import( './containers/BingoGame' ),
  loading: Loading
} )

export const Dashboard = Loadable( {
  loader: () => import( './containers/Dashboard/Dashboard' ),
  loading: Loading
} )

export const WinnerSection = Loadable( {
  loader: () => import( './containers/WinnerSection/WinnerSection' ),
  loading: Loading
} )

export const CardsSection = Loadable( {
  loader: () => import( './containers/CardsSection/CardsSection' ),
  loading: Loading
} )

export const GameControl = Loadable( {
  loader: () => import( './containers/GameControl/GameControl' ),
  loading: Loading
} )

export const CreateGame = Loadable( {
  loader: () => import( './containers/CreateGame/CreateGame' ),
  loading: Loading
} )

export const CardboardManagment = Loadable( {
  loader: () => import( './containers/CardboardManagment/CardboardManagment' ),
  loading: Loading
} )

export const WaitingGameSection = Loadable( {
  loader: () => import( './containers/WaitingGameSection/WaitingGameSection' ),
  loading: Loading
} )