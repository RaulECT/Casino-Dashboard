import React, { Component } from 'react'
import { connect } from 'react-redux'
import { openConnection } from '../../../socket'
import { 
  startGame, 
  endGame, 
  initGame, 
  drawCard, 
  anounceWinner, 
  loadCurrentGame,
  changeCard,
  addCardboard,
  forceEndGame,
  validateFolio,
  setGameHistory,
  setGame,
  generateConectionId,
  resetGame,
  addCardboardToValidate,
  removeCardboardToValidate
} from '../../store/actions/index'

import './GameControl.css'
import Aux from '../../components/Aux'
import Card from '../../components/Card'
import ValidateList from '../../components/ValidateList/ValidateList'
import CardControl from '../../components/CardControl/CardControl'
import {
  Button,
  Input,
  notification,
  Skeleton,
  Row,
  Col,
  Modal,
  Form,
  Icon,
  Divider,
  InputNumber,
  Tooltip,
  Progress,
} from 'antd'

const Search = Input.Search
let socket = null

class GameControl extends Component {

  state = {
    isAddCardboardsModalShowing: false
  }

  componentDidMount() {
    this.props.onGenerateConectionId()
    socket = openConnection()

    socket.on( 'DASHBOARD_CONECTED', data => {
      console.log(data)
      this.props.onSetGameHistory( data.gameHistory )
      //this.props.onInitGame( data.currentGame.id, data.currentGame.cardboards, data.currentGame )
      this.props.onDrawCard( data.currentCard, data.cardList, data.gameHistory )
      this.props.onSetGame( data.cardboards, data.currentGame )
    } )

    socket.on( 'DRAW_CARD', (turn) => {
      //this.onChangeCard( turn.turn.card, turn.turn.cardList )
      turn.turn.conectionId !== this.props.conectionId ? 
        this.props.onChangeCard( turn.turn.card, turn.turn.cardList ) : null
    } )

    socket.on( 'USER_WON', () => { 
      this.props.onEndGame()
      this.props.onResetGame()
      this.openNotification( 'success', 'Alguien ha ganado!', `El carton que ingresó ha ganado esta partida de loteria.` )
    } )

    this.props.onLoadGame()
  }

  componentWillUnmount() {
    socket.close()
  }

  handleOnInitGame = () => {
    //TODO: DELETE AFTER TEST
    this.props.game.cardboards = this.props.cardboardList

    this.props.onInitGame( this.props.game.id, this.props.cardboardList, this.props.game )
    this.handleOnChangeCard()
  }

  handleOnChangeCard = () => {
    if ( this.props.cardList.length !== 0 ) {
      const { card, cardList } = this.generateRandomCard()
    
      this.props.onDrawCard( card, cardList, this.props.gameHistory, this.props.conectionId )
    } else {
      this.openNotification( 'warning', 'Ya no hay cartas', 'Se han acabado todas las cartas para cantar, verifique a un ganador para terminar el juego' )
    }
    
  }

  handleAddCardboardModal = () => {
    this.setState( prevState => {
      return { isAddCardboardsModalShowing: !prevState.isAddCardboardsModalShowing }
    } )
  }

  handleOnAddCardboard = ( e = null ) => {
    e ? e.preventDefault() : null

    this.props.form.validateFields( ( err, values ) => {
      if ( !err ) {
        this.props.onAddCardboard( values.playerCardboard )
        this.handleAddCardboardModal()
        this.props.form.resetFields()
      }
    } )
  }

  showStartGameModal = () => {
    return (Modal.confirm( {
      title: '¿Desea iniciar esta partida?',
      content: ( <p>Una vez que la partida inicie no se podrá parar hasta terminarla.</p> ),
      onOk: () => { this.handleOnInitGame() },
      onCancel: () => {}
    } ) )
  }

  generateRandomCard = () => {
    //TODO: REPLACE WITH RANDOM FUNCTION LATELY
    const randomNumber = Math.floor(Math.random() * (this.props.cardList.length )) + 0; 
    const randomCard = this.props.cardList[randomNumber]
    const cardsUpdated = this.props.cardList.filter( ( element, index ) => index !== randomNumber  )
    
    return { card: randomCard, cardList: cardsUpdated }
  }

  getWatingGameSection = () => {
    const {getFieldDecorator} = this.props.form 

    const gameInfo = (
      <Aux>
        <h2 className="gameControl__sub-header">Próxima partida:</h2>

        <section className="gameControl__wating-section">
          <div className="gameControl__info">
            <div>
              <p><b>Nombre de partida:</b> {this.props.game ? this.props.game.gameName : ''}</p>
              <p><b>ID de partida:</b> {this.props.game ? this.props.game.id : ''}</p>
              <p><b>Partida #:</b> {this.props.game ? this.props.game.index : ''}</p>
            </div>
        
            <div>
              <p><b>Premio Linea:</b> ${this.props.game ? (this.props.game.linePrize * 100) : ''}</p>
              <p><b>Premio Loteria:</b> ${this.props.game ? (this.props.game.lotteryPrize * 100) : ''}</p>
              <p><b>Cartones registrados: </b> { this.props.cardboardList.length }</p>
            </div>
          </div>

          <div className="gameControl__button-group">
            <Button
              icon="user-add"
              size="large"
              onClick={ this.handleAddCardboardModal }
            >
              Añadir Carton
            </Button>

            <Button 
              className="gameControl__button--init" 
              icon="play-circle" 
              type="primary" 
              size="large"
              disabled={ this.props.cardboardList.length === 0 ? true : false }
              onClick={ this.showStartGameModal}  
            >
              Iniciar Partida
            </Button>
          </div>
          
        </section>

        <Modal
          title="Añadir carton de jugador"
          onOk={ this.handleOnAddCardboard }
          onCancel={ this.handleAddCardboardModal }
          visible={this.state.isAddCardboardsModalShowing}
        >
          <Form onSubmit={this.handleOnAddCardboard}>
            {getFieldDecorator('playerCardboard', {
              rules: [{ 
                required: true, 
                message: 'Este campo no puede estar vacio! y debe estar compuesto por 6 numeros', }],
                len: 6
            })(
              <InputNumber
                style={ { width: '100%' } }
                size="large"
                placeholder="Ingrese el carton del jugador"
                autoFocus
                prefix={ <Icon type="user-add" style={{ color: 'rgba(0,0,0,.25)' }} /> }
              />
            )}
          </Form>
        </Modal>
      </Aux>
    ) 
    
    const section = this.props.game ? gameInfo : ( <h2 className="gameControl__sub-header">No se ha encontrado una próxima partida de loteria, verifique que el juego existe o favor de crear uno.</h2> )
    
    return (
      <Aux>
        <Skeleton 
          loading={this.props.loading} 
          active
        >
          { section }
        </Skeleton>
      </Aux>
    )
    
  }

  getPlayingGameSection = () => {
    const cardImage = this.props.card ? this.props.card.image : 'Nuevas Figuras_1.png'
    const currentHref = window.location.href.split('dashboard')[0]
    const actions = [
      <Tooltip title="Sacar carta."><Icon onClick={ this.handleOnChangeCard } style={ { fontSize: '3rem' } } type="redo" /></Tooltip>,
      <Tooltip title="Ver juego de bingo."> <a target="_blank" href={`${currentHref}game`}><Icon style={ { fontSize: '3rem' } } type="eye" /></a></Tooltip>,
      <Tooltip title="Ver historial de cartas"><a target="_blank" href={`${currentHref}history`}><Icon style={ { fontSize: '3rem' } } type="bars" /></a></Tooltip>,
    ]

    return(
      <div>
        <Divider orientation="left">Verificar Ganadores</Divider>
        <Search 
          placeholder="Ingrese el folio del carton a validar"
          enterButton="Agregar Cartón"
          size="large"
          onSearch={value => this.validateSearchValue(value)}
        />
        
        <ValidateList 
          cardboardsToValidate={this.props.cardboardsToValidate}
          cardboardsValidated={this.props.cardboardsValidated}
          onRemoveCardboard={this.props.onRemoveCardboardsToValidate}
          onValidateCardboards={ () => this.props.onValidateFolio( this.props.cardboardsToValidate, [...this.props.gameHistory], this.props.game.linePattern, this.props.game.id, () => { this.anounceWinner( folio ) } ) }
        />

        <Divider style={{ marginTop: '40px' }} orientation="left">Control de Partida</Divider>
        <Row>
          <Col className="gameControl__game-info" span={12}>
            <h3 className="gameControl__game-name"> {this.props.game ? `Partida: ${this.props.game.gameName}` : ''}</h3>
            <p><span>ID:</span> {this.props.game ? this.props.game.id : ''}</p>
            <p><span>Premio Linea:</span> ${this.props.game ? (this.props.game.linePrize / 100) : ''}</p>
            <p><span>Prmeio Loteria:</span> ${this.props.game ? (this.props.game.lotteryPrize / 100): ''}</p>
            <p><span>Cartones Registrados:</span> { this.props.cardboardList.length }</p>

            <p><span>Progreso de la partida:</span></p>
            <div style={ { width: '80%' } }>
              <Tooltip title={ `${this.props.gameHistory.length} cartas cantadas de 54` }>
                <Progress percent={ parseInt(( this.props.gameHistory.length / 54 ) * 100) } />
              </Tooltip>
            </div>
          </Col>

          <Col className="gameControl__game-info" span={12}>
            <CardControl 
              card={ (
                <Card 
                  img={`/static/assets/${cardImage}`}
                  width="25rem"
                  height="auto"
                  cover="contain"
                />
              ) }
              actions={actions}
              turn={this.props.gameHistory.length}
            />
        
          </Col>
        </Row>
        
         
      </div>
      
    )
  }

  openNotification = ( type, title, message ) => {
    notification[type]({
      message: title,
      description: message,
    })
  }

  validateFolio = ( folio ) => {

    if ( folio !== '000000' ) {
      if ( this.props.cardboardList.indexOf( parseInt(folio) ) !== -1 ) {
        if ( this.props.gameHistory.length >= 4 ) {
          this.props.onAddCardboardToValidate( folio )
          //this.props.onValidateFolio( folio, [...this.props.gameHistory], this.props.game.linePattern, this.props.game.id, () => { this.anounceWinner( folio ) } )
    
        } else {
          this.openNotification( 'warning', 'Hey! Todavía estamos iniciando', 'No han pasado los turnos suficientes para poder elegir a un ganador.' )
        } 
      } else {
        this.openNotification( 'warning', 'Folio no encontrado', 'El folio que ingresó no se encuentra registrado para esta partida.' )
      }

    } else {
      this.props.onForceEndGame( this.props.game.id )
    }

  }

  validateSearchValue = ( searchValue ) => {
  
    if ( searchValue !== '000000' ) {
      if ( searchValue.length === 6 ) {
        searchValue = parseInt( searchValue )
        console.log(searchValue)
        if ( typeof searchValue === "number" ) {
          this.validateFolio( searchValue )
        } else {
          this.openNotification( 'warning', 'Formato incorrecto', 'El folio debe ser un número.' )
        }
      } else {
        this.openNotification( 'warning', 'Formato incorrecto', 'El número de caracteres del folio debe ser de 6 caracteres.' )
      }
    } else {
      this.props.onForceEndGame( this.props.game.id )
    }
  }

  anounceWinner = ( winner ) => {
    //console.log( `GameID: ${this.props.game.id} - Winner: ${winner} - Cards: `, this.props.gameHistory )
    //this.openNotification( 'success', '!Alguien ha ganado¡', 'El folio ingresado corresponde al folio ganador' )
    this.props.onAnounceWinner( this.props.game.id, this.props.gameHistory, parseInt(winner) )
  }

  render() {
    const section = this.props.isGameStart ? this.getPlayingGameSection() : this.getWatingGameSection()    

    return(
      <Aux>
        {section}
      </Aux>
    )
  }
}

const mapStateToProps = state => {
  return {
    isGameStart: state.dsh.isGameStart,
    turn: state.dsh.turn,
    game: state.bng.currentGame,
    loading: state.bng.loading,
    card: state.bng.currentCard,
    cardList: state.bng.cardsList,
    cardboardList: state.bng.cardboardList,
    gameHistory: state.bng.history,
    conectionId: state.dsh.conectionId,
    cardboardsToValidate: state.dsh.cardboardsToValidate,
    cardboardsValidated: state.dsh.carboadsValidated
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onStartGame: () => dispatch( startGame() ),
    onEndGame: () => dispatch( endGame() ),
    onInitGame: ( gameId, cardboardList, game ) => dispatch( initGame( gameId, cardboardList, game ) ),
    onDrawCard: ( card, cardList, history, conectionId ) => dispatch( drawCard( card, cardList, history, conectionId ) ),
    onAnounceWinner: ( gameId, cards, winner ) => dispatch( anounceWinner( gameId, cards, winner ) ),
    onLoadGame: () => dispatch( loadCurrentGame() ),
    onChangeCard: ( card, cardList ) => dispatch( changeCard( card, cardList ) ),
    onAddCardboard: ( cardboard ) => dispatch( addCardboard( cardboard ) ),
    onForceEndGame: ( gameId ) => dispatch( forceEndGame( gameId ) ),
    onValidateFolio: ( folio, hist, gametType, gameId, callback ) => dispatch( validateFolio(folio, hist, gametType, gameId, callback) ),
    onSetGameHistory: ( gameHistory ) => dispatch( setGameHistory( gameHistory ) ),
    onSetGame: ( cardboards, game ) => dispatch( setGame( cardboards, game ) ),
    onGenerateConectionId: () => dispatch( generateConectionId() ),
    onResetGame: () => dispatch( resetGame() ),
    onAddCardboardToValidate: ( cardboard ) => dispatch( addCardboardToValidate( cardboard ) ),
    onRemoveCardboardsToValidate: ( cardboard ) => dispatch( removeCardboardToValidate( cardboard ) )
  }
}

const WrappedGameControl = Form.create()(GameControl)
export default connect( mapStateToProps, mapDispatchToProps )(WrappedGameControl)

