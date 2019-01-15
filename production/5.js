webpackJsonp([5],{

/***/ "+d8z":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__("GiK3");

var _react2 = _interopRequireDefault(_react);

var _antd = __webpack_require__("nFWT");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Meta = _antd.Card.Meta;


var cardControl = function cardControl(props) {

  return _react2.default.createElement(
    _antd.Card,
    {
      style: { width: '25rem' },
      cover: props.card,
      actions: props.actions
    },
    _react2.default.createElement(Meta, {
      title: 'Turno No. ' + props.turn
    })
  );
};

exports.default = cardControl;

/***/ }),

/***/ "2QSw":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(false);
// imports


// module
exports.push([module.i, ".gameControl__sub-header {\n  color: rgba(0, 0, 0, .4);\n}\n\n.gameControl__info {\n  display: flex;\n  align-items: center;\n  justify-content: space-around;\n}\n\n.gameControl__wating-section {\n  display: flex;\n  flex-direction: column;\n}\n\n.gameControl__button--init {\n  margin-left: 1rem;\n}\n\n.gameControl__game-name {\n  margin-bottom: 3rem;\n  font-size: 2rem;\n  color: rgba(0, 0, 0, .4);\n}\n\n.gameControl__game-info {\n  margin-top: 1.5rem;\n}\n\n.gameControl__game-info > p {\n  margin-bottom: 0.3rem;\n  display: flex;\n  justify-content: space-between;\n  padding-right: 10rem;\n  box-sizing: border-box;\n}\n\n.gameControl__game-info > p > span {\n  font-weight: bold;\n}\n\n.gameControl__turn-label {\n  display: flex;\n  flex-direction: column;\n}\n\n.gameControl__turn-label > span {\n  font-size: 2rem;\n}\n\n.gameControl__card-section {\n  margin-bottom: 1.5rem;\n}\n\n.gameControl__card-section > p {\n  margin-bottom: 0.3rem;\n}\n\n.gameControl__button-group {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.countdown-link {\n  margin-left: 4rem;\n}", ""]);

// exports


/***/ }),

/***/ "6f/o":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__("GiK3");

var _react2 = _interopRequireDefault(_react);

__webpack_require__("prum");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Card = function (_Component) {
  _inherits(Card, _Component);

  function Card() {
    _classCallCheck(this, Card);

    return _possibleConstructorReturn(this, (Card.__proto__ || Object.getPrototypeOf(Card)).apply(this, arguments));
  }

  _createClass(Card, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {

      return nextProps.img !== this.props.img;
    }
  }, {
    key: 'render',
    value: function render() {
      var classes = ['card-item'];
      var styles = _defineProperty({
        width: this.props ? this.props.width : '200px',
        height: this.props ? this.props.height : '400px',
        transform: this.props.scale ? 'scale(' + this.props.scale + ')' : 'scale(1)'
      }, 'transform', this.props.scale ? 'scale(' + this.props.scale + ')' : 'scale(1)');

      this.props.isResponsive ? classes.push('card-item-responsive') : null;
      this.props.isRecentCard ? classes.push('card-item--recent-card') : null;

      return _react2.default.createElement('img', {
        src: this.props.img,
        alt: 'Bingo Card',
        style: styles,
        className: classes.join(' ')
      });
    }
  }]);

  return Card;
}(_react.Component);

exports.default = Card;

/***/ }),

/***/ "GoDk":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var aux = function aux(props) {
  return props.children;
};

exports.default = aux;

/***/ }),

/***/ "HGJJ":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__("GiK3");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__("RH2O");

var _socket = __webpack_require__("ITBa");

var _reactRouterDom = __webpack_require__("F8kA");

var _config = __webpack_require__("1wn0");

var _index = __webpack_require__("cl7k");

__webpack_require__("LZtk");

var _Aux = __webpack_require__("GoDk");

var _Aux2 = _interopRequireDefault(_Aux);

var _Card = __webpack_require__("6f/o");

var _Card2 = _interopRequireDefault(_Card);

var _ValidateList = __webpack_require__("YBAD");

var _ValidateList2 = _interopRequireDefault(_ValidateList);

var _CardControl = __webpack_require__("+d8z");

var _CardControl2 = _interopRequireDefault(_CardControl);

var _antd = __webpack_require__("nFWT");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Search = _antd.Input.Search;
var socket = null;

var GameControl = function (_Component) {
  _inherits(GameControl, _Component);

  function GameControl() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, GameControl);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = GameControl.__proto__ || Object.getPrototypeOf(GameControl)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      isAddCardboardsModalShowing: false,
      isCountdownStarted: false
    }, _this.handleOnInitGame = function () {
      //TODO: DELETE AFTER TEST
      _this.props.game.cardboards = _this.props.cardboardList;

      _this.props.onInitGame(_this.props.game.id, _this.props.cardboardList, _this.props.game, _this.handleOnChangeCard);
      // this.handleOnChangeCard()
    }, _this.handleOnChangeCard = function () {
      if (_this.props.cardList.length !== 0) {
        var _this$generateRandomC = _this.generateRandomCard(),
            card = _this$generateRandomC.card,
            cardList = _this$generateRandomC.cardList;

        _this.props.onDrawCard(card, cardList, _this.props.gameHistory, _this.props.conectionId);
      } else {
        _this.openNotification('warning', 'Ya no hay cartas', 'Se han acabado todas las cartas para cantar, verifique a un ganador para terminar el juego');
      }
    }, _this.handleAddCardboardModal = function () {
      _this.setState(function (prevState) {
        return { isAddCardboardsModalShowing: !prevState.isAddCardboardsModalShowing };
      });
    }, _this.handleOnAddCardboard = function () {
      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      e ? e.preventDefault() : null;

      _this.props.form.validateFields(function (err, values) {
        if (!err) {
          _this.props.onAddCardboard(values.playerCardboard, _this.props.cardboardList);
          _this.handleAddCardboardModal();
          _this.props.form.resetFields();
        }
      });
    }, _this.showStartGameModal = function () {
      return _antd.Modal.confirm({
        title: '¿Desea iniciar esta partida?',
        content: _react2.default.createElement(
          'p',
          null,
          'Una vez que la partida inicie no se podr\xE1 parar hasta terminarla.'
        ),
        onOk: function onOk() {
          _this.handleOnInitGame();
        },
        onCancel: function onCancel() {}
      });
    }, _this.handleOnStartCountdown = function () {
      socket.emit('START_COUNTDOWN');

      _this.setState({ isCountdownStarted: true });
    }, _this.generateRandomCard = function () {
      //TODO: REPLACE WITH RANDOM FUNCTION LATELY
      var randomNumber = Math.floor(Math.random() * _this.props.cardList.length) + 0;
      var randomCard = _this.props.cardList[randomNumber];
      var cardsUpdated = _this.props.cardList.filter(function (element, index) {
        return index !== randomNumber;
      });

      return { card: randomCard, cardList: cardsUpdated };
    }, _this.getWatingGameSection = function () {
      var getFieldDecorator = _this.props.form.getFieldDecorator;


      var gameInfo = _react2.default.createElement(
        _Aux2.default,
        null,
        _react2.default.createElement(
          'h2',
          { className: 'gameControl__sub-header' },
          'Pr\xF3xima partida:'
        ),
        _react2.default.createElement(
          'section',
          { className: 'gameControl__wating-section' },
          _react2.default.createElement(
            'div',
            { className: 'gameControl__info' },
            _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(
                'p',
                null,
                _react2.default.createElement(
                  'b',
                  null,
                  'Nombre de partida:'
                ),
                ' ',
                _this.props.game ? _this.props.game.gameName : ''
              ),
              _react2.default.createElement(
                'p',
                null,
                _react2.default.createElement(
                  'b',
                  null,
                  'ID de partida:'
                ),
                ' ',
                _this.props.game ? _this.props.game.id : ''
              ),
              _react2.default.createElement(
                'p',
                null,
                _react2.default.createElement(
                  'b',
                  null,
                  'Partida #:'
                ),
                ' ',
                _this.props.game ? _this.props.game.index : ''
              )
            ),
            _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(
                'p',
                null,
                _react2.default.createElement(
                  'b',
                  null,
                  'Premio L\xEDnea:'
                ),
                ' $',
                _this.props.game ? _this.props.game.linePrize / 100 : ''
              ),
              _react2.default.createElement(
                'p',
                null,
                _react2.default.createElement(
                  'b',
                  null,
                  'Premio Loter\xEDa:'
                ),
                ' $',
                _this.props.game ? _this.props.game.lotteryPrize / 100 : ''
              ),
              _react2.default.createElement(
                'p',
                null,
                _react2.default.createElement(
                  'b',
                  null,
                  'Cartones registrados: '
                ),
                ' ',
                _this.props.cardboardList.length
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'gameControl__button-group' },
            _react2.default.createElement(
              _antd.Button,
              {
                icon: 'user-add',
                size: 'large',
                onClick: _this.handleAddCardboardModal
              },
              'A\xF1adir Carton'
            ),
            _react2.default.createElement(
              _antd.Button,
              {
                className: 'gameControl__button--init',
                icon: 'play-circle',
                type: 'primary',
                size: 'large',
                disabled: _this.props.cardboardList.length === 0 ? true : false,
                onClick: _this.showStartGameModal
              },
              'Iniciar Partida'
            ),
            _react2.default.createElement(
              _reactRouterDom.Link,
              {
                to: '/next_game',
                innerRef: function innerRef(node) {
                  return _this.countdownLink = node;
                },
                disabled: _this.state.isCountdownStarted,
                target: '_blank',
                onClick: _this.handleOnStartCountdown,
                className: 'countdown-link'
              },
              _react2.default.createElement(_antd.Icon, { type: 'hourglass' }),
              'Iniciar Contador'
            ),
            _react2.default.createElement(
              _reactRouterDom.Link,
              {
                to: '/next_game',
                className: 'countdown-link',
                target: '_blank'
              },
              'Ver contador'
            )
          )
        ),
        _react2.default.createElement(
          _antd.Modal,
          {
            title: 'A\xF1adir carton de jugador',
            onOk: _this.handleOnAddCardboard,
            onCancel: _this.handleAddCardboardModal,
            visible: _this.state.isAddCardboardsModalShowing
          },
          _react2.default.createElement(
            _antd.Form,
            { onSubmit: _this.handleOnAddCardboard },
            getFieldDecorator('playerCardboard', {
              rules: [{
                required: true,
                message: 'Este campo no puede estar vacio! y debe estar compuesto por ' + _config.CARDBOARDS_NUMCODE_LENGTH + ' numeros' }],
              len: _config.CARDBOARDS_NUMCODE_LENGTH
            })(_react2.default.createElement(_antd.InputNumber, {
              style: { width: '100%' },
              size: 'large',
              placeholder: 'Ingrese el carton del jugador',
              autoFocus: true,
              prefix: _react2.default.createElement(_antd.Icon, { type: 'user-add', style: { color: 'rgba(0,0,0,.25)' } })
            }))
          )
        )
      );

      var section = _this.props.game ? gameInfo : _react2.default.createElement(
        'h2',
        { className: 'gameControl__sub-header' },
        'No se ha encontrado una pr\xF3xima partida de loter\xEDa, verifique que el juego existe o favor de crear uno.'
      );

      return _react2.default.createElement(
        _Aux2.default,
        null,
        _react2.default.createElement(
          _antd.Skeleton,
          {
            loading: _this.props.loading,
            active: true
          },
          section
        )
      );
    }, _this.getPlayingGameSection = function () {
      var cardImage = _this.props.card ? _this.props.card.image : 'Nuevas Figuras_1.png';
      var currentHref = window.location.href.split('dashboard')[0];
      var actions = [_react2.default.createElement(
        _antd.Tooltip,
        { title: 'Sacar carta.' },
        _react2.default.createElement(_antd.Icon, { onClick: _this.handleOnChangeCard, style: { fontSize: '3rem' }, type: 'redo' })
      ), _react2.default.createElement(
        _antd.Tooltip,
        { title: 'Ver juego de bingo.' },
        ' ',
        _react2.default.createElement(
          'a',
          { target: '_blank', href: currentHref + 'game' },
          _react2.default.createElement(_antd.Icon, { style: { fontSize: '3rem' }, type: 'eye' })
        )
      ), _react2.default.createElement(
        _antd.Tooltip,
        { title: 'Ver historial de cartas' },
        _react2.default.createElement(
          'a',
          { target: '_blank', href: currentHref + 'history' },
          _react2.default.createElement(_antd.Icon, { style: { fontSize: '3rem' }, type: 'bars' })
        )
      ), _react2.default.createElement(
        _antd.Tooltip,
        { title: 'Ver Cartones' },
        _react2.default.createElement(
          'a',
          { target: '_blank', href: currentHref + 'cardboards' },
          _react2.default.createElement(_antd.Icon, { style: { fontSize: '3rem' }, type: 'qrcode' })
        )
      )];

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _antd.Divider,
          { orientation: 'left' },
          'Verificar Ganadores'
        ),
        _react2.default.createElement(Search, {
          placeholder: 'Ingrese el folio del carton a validar',
          enterButton: 'Agregar Cart\xF3n',
          size: 'large',
          onSearch: function onSearch(value) {
            return _this.validateSearchValue(value);
          }
        }),
        _react2.default.createElement(_ValidateList2.default, {
          cardboardsToValidate: _this.props.cardboardsToValidate,
          cardboardsValidated: _this.props.cardboardsValidated,
          onRemoveCardboard: _this.props.onRemoveCardboardsToValidate,
          onValidateCardboards: function onValidateCardboards() {
            return _this.props.onValidateFolio(_this.props.cardboardsToValidate, [].concat(_toConsumableArray(_this.props.gameHistory)), _this.props.game.linePattern, _this.props.game.id, _this.props.cardboardsValidated, function (winners) {
              _this.anounceWinner(winners);
            });
          }
        }),
        _react2.default.createElement(
          _antd.Divider,
          { style: { marginTop: '40px' }, orientation: 'left' },
          'Control de Partida'
        ),
        _react2.default.createElement(
          _antd.Row,
          { justify: 'center' },
          _react2.default.createElement(
            _antd.Col,
            { className: 'gameControl__game-info', span: 12 },
            _react2.default.createElement(
              'h3',
              { className: 'gameControl__game-name' },
              ' ',
              _this.props.game ? 'Partida: ' + _this.props.game.gameName : ''
            ),
            _react2.default.createElement(
              'p',
              null,
              _react2.default.createElement(
                'span',
                null,
                'ID:'
              ),
              ' ',
              _this.props.game ? _this.props.game.id : ''
            ),
            _react2.default.createElement(
              'p',
              null,
              _react2.default.createElement(
                'span',
                null,
                'Premio L\xEDnea:'
              ),
              ' $',
              _this.props.game ? _this.props.game.linePrize / 100 : ''
            ),
            _react2.default.createElement(
              'p',
              null,
              _react2.default.createElement(
                'span',
                null,
                'Prmeio Loter\xEDa:'
              ),
              ' $',
              _this.props.game ? _this.props.game.lotteryPrize / 100 : ''
            ),
            _react2.default.createElement(
              'p',
              null,
              _react2.default.createElement(
                'span',
                null,
                'Cartones Registrados:'
              ),
              ' ',
              _this.props.cardboardList.length
            ),
            _react2.default.createElement(
              'p',
              null,
              _react2.default.createElement(
                'span',
                null,
                'Progreso de la partida:'
              )
            ),
            _react2.default.createElement(
              'div',
              { style: { width: '80%' } },
              _react2.default.createElement(
                _antd.Tooltip,
                { title: _this.props.gameHistory.length + ' cartas cantadas de 54' },
                _react2.default.createElement(_antd.Progress, { percent: parseInt(_this.props.gameHistory.length / 54 * 100) })
              )
            )
          ),
          _react2.default.createElement(
            _antd.Col,
            { className: 'gameControl__game-info', span: 12 },
            _react2.default.createElement(_CardControl2.default, {
              card: _react2.default.createElement(_Card2.default, {
                img: '/static/assets/' + cardImage,
                width: '25rem',
                height: 'auto',
                cover: 'contain'
              }),
              actions: actions,
              turn: _this.props.gameHistory.length
            })
          )
        )
      );
    }, _this.openNotification = function (type, title, message) {
      _antd.notification[type]({
        message: title,
        description: message
      });
    }, _this.validateFolio = function (folio) {

      if (folio !== '0000') {
        if ( /*this.props.cardboardList.indexOf( parseInt(folio) ) !== -1*/true) {
          console.log(_this.props.cardboardsToValidate.indexOf(parseInt(folio)));
          if (_this.props.cardboardsToValidate.indexOf(parseInt(folio)) === -1) {
            if (_this.props.gameHistory.length >= 4) {
              _this.props.onAddCardboardToValidate(folio);
              //this.props.onValidateFolio( folio, [...this.props.gameHistory], this.props.game.linePattern, this.props.game.id, () => { this.anounceWinner( folio ) } )
            } else {
              _this.openNotification('warning', 'Hey! Todavía estamos iniciando', 'No han pasado los turnos suficientes para poder elegir a un ganador.');
            }
          } else {
            _this.openNotification('warning', 'Folio repetido', 'El folio ya se ha ingresado para validar.');
          }
        } else {
          _this.openNotification('warning', 'Folio no encontrado', 'El folio que ingresó no se encuentra registrado para esta partida.');
        }
      } else {
        _this.props.onForceEndGame(_this.props.game.id);
      }
    }, _this.validateSearchValue = function (searchValue) {

      if (searchValue !== '0000') {
        if (searchValue.length === _config.CARDBOARDS_NUMCODE_LENGTH) {
          searchValue = parseInt(searchValue);
          console.log(searchValue);
          if (typeof searchValue === "number") {
            _this.validateFolio(searchValue);
          } else {
            _this.openNotification('warning', 'Formato incorrecto', 'El folio debe ser un número.');
          }
        } else {
          _this.openNotification('warning', 'Formato incorrecto', 'El n\xFAmero de caracteres del folio debe ser de ' + _config.CARDBOARDS_NUMCODE_LENGTH + ' caracteres.');
        }
      } else {
        _this.props.onForceEndGame(_this.props.game.id);
      }
    }, _this.anounceWinner = function (winners) {
      //console.log( `GameID: ${this.props.game.id} - Winner: ${winner} - Cards: `, this.props.gameHistory )
      //this.openNotification( 'success', '!Alguien ha ganado¡', 'El folio ingresado corresponde al folio ganador' )
      _this.props.onAnounceWinner(_this.props.game.id, _this.props.gameHistory, winners);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(GameControl, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.props.onGenerateConectionId();
      socket = (0, _socket.openConnection)();

      socket.on('DASHBOARD_CONECTED', function (data) {
        console.log(data);
        _this2.props.onSetGameHistory(data.gameHistory);
        //this.props.onInitGame( data.currentGame.id, data.currentGame.cardboards, data.currentGame )
        _this2.props.onDrawCardWithoutSocket(data.currentCard, data.cardList, data.gameHistory);
        _this2.props.onSetGame(data.cardboards, data.currentGame);
      });

      socket.on('COUNTDOWN_STARTED', function () {
        _this2.setState({ isCountdownStarted: true });
      });

      socket.on('DRAW_CARD', function (turn) {
        //this.onChangeCard( turn.turn.card, turn.turn.cardList )
        turn.turn.conectionId !== _this2.props.conectionId ? _this2.props.onChangeCard(turn.turn.card, turn.turn.cardList) : null;
      });

      socket.on('USER_WON', function () {
        _this2.props.onEndGame();
        _this2.props.onResetGame();
        _this2.openNotification('success', 'Alguien ha ganado!', 'El carton que ingres\xF3 ha ganado esta partida de loteria.');
      });

      socket.on('SHOW_START_GAME_NOTIFICATION', function () {

        _this2.openNotification('warning', 'Favor de iniciar la partida', 'El tiempo de espera se ha terminado, por favor inicie la partida.');
      });

      this.props.onLoadGame(this.props.history.push);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      socket.close();
    }
  }, {
    key: 'render',
    value: function render() {
      var section = this.props.isGameStart ? this.getPlayingGameSection() : this.getWatingGameSection();

      return _react2.default.createElement(
        _Aux2.default,
        null,
        section
      );
    }
  }]);

  return GameControl;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state) {
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
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    onStartGame: function onStartGame() {
      return dispatch((0, _index.startGame)());
    },
    onEndGame: function onEndGame() {
      return dispatch((0, _index.endGame)());
    },
    onInitGame: function onInitGame(gameId, cardboardList, game, next) {
      return dispatch((0, _index.initGame)(gameId, cardboardList, game, next));
    },
    onDrawCard: function onDrawCard(card, cardList, history, conectionId) {
      return dispatch((0, _index.drawCard)(card, cardList, history, conectionId));
    },
    onAnounceWinner: function onAnounceWinner(gameId, cards, winner) {
      return dispatch((0, _index.anounceWinner)(gameId, cards, winner));
    },
    onLoadGame: function onLoadGame(push) {
      return dispatch((0, _index.loadCurrentGame)(push));
    },
    onChangeCard: function onChangeCard(card, cardList) {
      return dispatch((0, _index.changeCard)(card, cardList));
    },
    onAddCardboard: function onAddCardboard(cardboard, cardboardList) {
      return dispatch((0, _index.addCardboard)(cardboard, cardboardList));
    },
    onForceEndGame: function onForceEndGame(gameId) {
      return dispatch((0, _index.forceEndGame)(gameId));
    },
    onValidateFolio: function onValidateFolio(folio, hist, gametType, gameId, cardboardsValidated, callback) {
      return dispatch((0, _index.validateFolio)(folio, hist, gametType, gameId, cardboardsValidated, callback));
    },
    onSetGameHistory: function onSetGameHistory(gameHistory) {
      return dispatch((0, _index.setGameHistory)(gameHistory));
    },
    onSetGame: function onSetGame(cardboards, game) {
      return dispatch((0, _index.setGame)(cardboards, game));
    },
    onGenerateConectionId: function onGenerateConectionId() {
      return dispatch((0, _index.generateConectionId)());
    },
    onResetGame: function onResetGame() {
      return dispatch((0, _index.resetGame)());
    },
    onAddCardboardToValidate: function onAddCardboardToValidate(cardboard) {
      return dispatch((0, _index.addCardboardToValidate)(cardboard));
    },
    onRemoveCardboardsToValidate: function onRemoveCardboardsToValidate(cardboard) {
      return dispatch((0, _index.removeCardboardToValidate)(cardboard));
    },
    onDrawCardWithoutSocket: function onDrawCardWithoutSocket(card, cardList, history, conectionId) {
      return dispatch((0, _index.drawCardWithoutSocket)(card, cardList, history, conectionId));
    }

  };
};

var WrappedGameControl = _antd.Form.create()(GameControl);
exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(WrappedGameControl);

/***/ }),

/***/ "LZtk":
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__("2QSw");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__("MTIv")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../../../node_modules/css-loader/index.js??ref--1-1!./GameControl.css", function() {
		var newContent = require("!!../../../../node_modules/css-loader/index.js??ref--1-1!./GameControl.css");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "YBAD":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__("GiK3");

var _react2 = _interopRequireDefault(_react);

var _antd = __webpack_require__("nFWT");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Panel = _antd.Collapse.Panel;

var styles = {
  marginTop: '10px'
};

var validateList = function validateList(props) {
  var isDissabled = props.cardboardsToValidate.length === 0;
  var cardboardsToValidateTags = props.cardboardsToValidate.map(function (cardboard, index) {
    return _react2.default.createElement(
      _antd.Tag,
      { key: cardboard + '_' + index + '_toV', closable: true, afterClose: function afterClose() {
          return props.onRemoveCardboard(cardboard);
        } },
      ' ',
      'Cart\xF3n No. ' + cardboard,
      ' '
    );
  });
  var cardboardsValidatedTags = props.cardboardsValidated.map(function (cardboard, index) {
    return _react2.default.createElement(
      _antd.Tag,
      { key: cardboard + '_' + index + '_V', color: 'green' },
      'Cart\xF3n No. ' + cardboard
    );
  });

  return _react2.default.createElement(
    _antd.Row,
    { gutter: 30 },
    _react2.default.createElement(
      _antd.Col,
      { span: 12 },
      _react2.default.createElement(
        _antd.Collapse,
        { style: styles, defaultActiveKey: ['1'] },
        _react2.default.createElement(
          Panel,
          { header: props.cardboardsToValidate.length + ' cart\xF3n(es) para validar.', key: '1' },
          cardboardsToValidateTags,
          _react2.default.createElement(
            _antd.Button,
            { onClick: props.onValidateCardboards, disabled: isDissabled, type: 'primary', ghost: true },
            'Validar ',
            '(' + props.cardboardsToValidate.length + ')',
            ' cart\xF3n(es)'
          )
        )
      )
    ),
    _react2.default.createElement(
      _antd.Col,
      { span: 12 },
      _react2.default.createElement(
        _antd.Collapse,
        { style: styles, defaultActiveKey: ['2'] },
        _react2.default.createElement(
          Panel,
          { header: 'Hay ' + props.cardboardsValidated.length + ' cart\xF3n(es) ganador(es) de l\xEDnea simple.', key: '2' },
          cardboardsValidatedTags
        )
      )
    )
  );
};

exports.default = validateList;

/***/ }),

/***/ "prum":
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__("viWZ");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__("MTIv")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--1-1!./Card.css", function() {
		var newContent = require("!!../../../node_modules/css-loader/index.js??ref--1-1!./Card.css");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "viWZ":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(false);
// imports


// module
exports.push([module.i, ".card-item {\n  border: 0.5rem solid #fff;\n  border-radius: 9px;\n}\n\n.card-item--recent-card {\n  margin-top: 1rem;\n  width: 10rem !important;\n  height: 15rem !important;\n}\n\n.card-item--recent-card:not( :last-child ) {\n  margin-right: 0.9rem;\n}\n\n@media screen and ( max-width: 1400px ) {\n  .card-item-responsive {\n    /* width: 18rem !important;\n    height: 27rem !important; */\n  }\n\n  .card-item--recent-card {\n    width: 8rem !important;\n    height: 12rem !important;\n    margin-top: 1rem;\n  }\n\n  .card-item--recent-card:not( :last-child ) {\n    margin-right: 0.9rem;\n  }\n\n  /* .card-item--recent-card {\n    width: 10rem !important;\n    height: 15rem !important;\n  } */\n}", ""]);

// exports


/***/ })

});