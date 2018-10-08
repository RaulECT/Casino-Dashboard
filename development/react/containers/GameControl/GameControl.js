import React, { Component } from 'react'
import { connect } from 'react-redux'
import { 
  startGame, 
  endGame, 
  initGame, 
  drawCard, 
  anounceWinner, 
  loadCurrentGame,
  changeCard,
  addCardboard,
  forceEndGame

} from '../../store/actions/index'

import './GameControl.css'
import Aux from '../../components/Aux'
import Card from '../../components/Card'
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
  InputNumber
} from 'antd'


const Search = Input.Search

class GameControl extends Component {

  state = {
    isAddCardboardsModalShowing: false
  }

  componentDidMount() {
    this.props.onLoadGame()
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
    
      this.props.onDrawCard( card, cardList, this.props.gameHistory )
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
              <p><b>Premio Linea:</b> ${this.props.game ? this.props.game.linePrize : ''}</p>
              <p><b>Premio Loteria:</b> ${this.props.game ? this.props.game.lotteryPrize : ''}</p>
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
              rules: [{ required: true, message: 'Este campo no puede estar vacio!' }],
            })(
              <InputNumber
                style={ { width: '100%' } }
                min={0}
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
    
    const section = this.props.game ? gameInfo : ( <h2 className="gameControl__sub-header">No se ha encontrado un siguientes juego, verifique que el juego existe o favor de crear uno.</h2> )
    
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

    return(
      <div>
        <Search 
          placeholder="Ingrese el folio del carton a validar"
          enterButton="Validar"
          size="large"
          onSearch={value => this.validateFolio(value)}
        />

        <Row>
          <Col className="gameControl__game-info" span={12}>
            <h3 className="gameControl__game-name"> {this.props.game ? `#${this.props.game.index} - ${this.props.game.gameName}` : ''}</h3>
            <p><span>ID:</span> {this.props.game ? this.props.game.id : ''}</p>
            <p><span>Premio Linea:</span> ${this.props.game ? this.props.game.linePrize : ''}</p>
            <p><span>Prmeio Loteria:</span> ${this.props.game ? this.props.game.lotteryPrize: ''}</p>
            <p><span>Cartones Registrados:</span> { this.props.cardboardList.length }</p>
          </Col>

          <Col className="gameControl__game-info" span={12}>
            <h3 className="gameControl__turn-label">
              Turno: <span>{this.props.turn}</span>
            </h3>

            <div className="gameControl__card-section">
              <p>Carta actual:</p>
              <Card 
                img={`/static/assets/${cardImage}`}
                width="16rem"
                height="25rem"
                cover="contain"
              />
            </div>            

            <Button 
              onClick={ this.handleOnChangeCard }
              type="primary"
              size="large"
              icon="redo"
            >
              Sacar carta
            </Button>

            <a href={`${currentHref}game`} style={ { marginLeft: 20 } } target="_blanc">Ver Juego de Bingo</a>
            <a href={`${currentHref}history`} style={ { marginLeft: 20 } } target="_blanc">Ver historial de cartas</a>

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
      if ( this.props.turn >= 4 ) {
        if ( folio === '1234' ) {
  
          this.anounceWinner( folio )
        } else {
          this.openNotification( 'error', 'Folio no ganador', 'El folio ingresado no ha ganado la partida.' )
        }      
      } else {
        this.openNotification( 'warning', 'Hey! Todavía estamos iniciando', 'No han pasado los turnos suficientes para poder elegir a un ganador.' )
      } 
    } else {
      //TODO: FORCE END GAME
      this.props.onForceEndGame()
    }

  }

  anounceWinner = ( winner ) => {
    console.log( `GameID: ${this.props.game.id} - Winner: ${winner} - Cards: `, this.props.gameHistory )
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
    gameHistory: state.bng.history
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onStartGame: () => dispatch( startGame() ),
    onEndGame: () => dispatch( endGame() ),
    onInitGame: ( gameId, cardboardList, game ) => dispatch( initGame( gameId, cardboardList, game ) ),
    onDrawCard: ( card, cardList, history ) => dispatch( drawCard( card, cardList, history ) ),
    onAnounceWinner: ( gameId, cards, winner ) => dispatch( anounceWinner( gameId, cards, winner ) ),
    onLoadGame: () => dispatch( loadCurrentGame() ),
    onChangeCard: ( card, cardList ) => dispatch( changeCard( card, cardList ) ),
    onAddCardboard: ( cardboard ) => dispatch( addCardboard( cardboard ) ),
    onForceEndGame: () => dispatch( forceEndGame() )
  }
}

const WrappedGameControl = Form.create()(GameControl)
export default connect( mapStateToProps, mapDispatchToProps )(WrappedGameControl)

