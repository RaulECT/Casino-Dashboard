webpackJsonp([10],{

/***/ "/N6o":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__("GiK3");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__("RH2O");

var _reactRouterDom = __webpack_require__("F8kA");

var _index = __webpack_require__("cl7k");

var _Aux = __webpack_require__("GoDk");

var _Aux2 = _interopRequireDefault(_Aux);

var _Card = __webpack_require__("6f/o");

var _Card2 = _interopRequireDefault(_Card);

var _Background = __webpack_require__("prCc");

var _Background2 = _interopRequireDefault(_Background);

var _Panel = __webpack_require__("4cfj");

var _Panel2 = _interopRequireDefault(_Panel);

var _GridItem = __webpack_require__("CZxu");

var _GridItem2 = _interopRequireDefault(_GridItem);

var _GameLabel = __webpack_require__("W3tq");

var _GameLabel2 = _interopRequireDefault(_GameLabel);

var _RecentCardsSection = __webpack_require__("EHgG");

var _RecentCardsSection2 = _interopRequireDefault(_RecentCardsSection);

var _CardboardPattern = __webpack_require__("at5q");

var _CardboardPattern2 = _interopRequireDefault(_CardboardPattern);

var _socket = __webpack_require__("ITBa");

__webpack_require__("KFtZ");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var socket = null;

var BingoGame = function (_Component) {
  _inherits(BingoGame, _Component);

  function BingoGame() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, BingoGame);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = BingoGame.__proto__ || Object.getPrototypeOf(BingoGame)).call.apply(_ref, [this].concat(args))), _this), _this.onChangeCard = function (card, cardList) {
      _this.props.onChangeCard(card, cardList);
      _this.playAudio(card.audio);
    }, _this.getRandomCard = function () {
      //TODO: REPLACE WITH RANDOM FUNCTION LATELY
      var randomNumber = Math.floor(Math.random() * (_this.props.cardList.length - 0)) + 0;
      var randomCard = _this.props.cardList[randomNumber];
      var cardsUpdated = _this.props.cardList.filter(function (element, index) {
        return index !== randomNumber;
      });

      _this.props.onChangeCard(randomCard, cardsUpdated);
      _this.playAudio(randomCard.audio);
    }, _this.playAudio = function (audioFile) {
      var audio = new Audio('/static/assets/audio/' + audioFile);
      audio.play();
    }, _this.renderGameScreen = function () {
      return _react2.default.createElement(
        _Background2.default,
        {
          grid: true
        },
        _react2.default.createElement(
          _Panel2.default,
          {
            opacity: .15,
            gridTemplateColumns: 'repeat(4, minmax(min-content, 1fr))',
            gridTemplateRows: 'repeat(5,min-content)',
            rowGap: '1rem',
            columnGap: '3rem',
            className: 'bingo-game__panel'
          },
          _react2.default.createElement(
            _GridItem2.default,
            {
              gridRow: '1/2',
              gridColumn: '1/-1',
              className: 'bingo-game__title'
            },
            'Loteria Bingo!'
          ),
          _react2.default.createElement(_GameLabel2.default, {
            gridRow: '2/3',
            gridColumn: '1/3',
            label: 'Acumulado:',
            text: '$3,789',
            type: 'important'
          }),
          _react2.default.createElement(
            _GridItem2.default,
            {
              gridRow: '2/3',
              gridColumn: '3/-1',
              styles: { textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }
            },
            _react2.default.createElement(
              'p',
              { className: 'bingo-game__game-details' },
              'Juego #',
              _this.props.game ? _this.props.game.index : ''
            ),
            _react2.default.createElement(
              'p',
              { className: 'bingo-game__game-name' },
              _this.props.game ? _this.props.game.gameName : ''
            ),
            _react2.default.createElement(
              'p',
              { className: 'bingo-game__game-details' },
              _this.props.game ? _this.props.game.cardboards.length : '',
              ' cartones'
            )
          ),
          _react2.default.createElement(_GameLabel2.default, {
            gridRow: '3/4',
            gridColumn: '1/3',
            label: 'Premio:',
            text: '$' + (_this.props.game ? _this.props.game.linePrize / 100 : ''),
            type: 'regular-salmon'
          }),
          _react2.default.createElement(_GameLabel2.default, {
            gridRow: '3/4',
            gridColumn: '3/-1',
            label: 'Turno:',
            text: '' + _this.props.gameHistory.length,
            type: 'regular-pink'
          }),
          _react2.default.createElement(_GameLabel2.default, {
            gridRow: '4/5',
            gridColumn: '1/3',
            label: 'Bingo:',
            text: '$' + (_this.props.game ? _this.props.game.lotteryPrize / 100 : ''),
            type: 'regular-green'
          }),
          _react2.default.createElement(_GameLabel2.default, {
            gridRow: '5/6',
            gridColumn: '1/3',
            label: 'Patr\xF3n ganador:',
            customContent: _react2.default.createElement(
              'div',
              { className: 'pattern-responsive', style: { width: '23rem', height: '20rem', background: 'rgba(0, 0, 0, .26)' } },
              _react2.default.createElement(_CardboardPattern2.default, {
                gameType: _this.props.game ? _this.props.game.linePattern : 'LINEA'
              })
            )
          }),
          _react2.default.createElement(_GameLabel2.default, {
            gridRow: '4/-1',
            gridColumn: '3/-1',
            label: 'Carta actual:',
            customContent: _react2.default.createElement(_Card2.default, { isResponsive: true, cover: 'contain', width: '20rem', height: '31rem', img: '/static/assets/' + _this.props.card.image })
          })
        ),
        _react2.default.createElement(_RecentCardsSection2.default, {
          cards: _this.props.gameHistory,
          gameType: _this.props.linePattern
        })
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(BingoGame, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      socket = (0, _socket.openConnection)();

      //TODO: REPLACE WITH SOCKETIO
      addEventListener("keypress", function (e) {
        if (e.which === 13 || e.keyCode === 13) {
          _this2.getRandomCard();
        }
      });

      socket.on('BINGO_CONECTED', function (data) {
        _this2.props.onSetGameHistory(data.gameHistory);
        _this2.onChangeCard(data.card, data.cardList);
        _this2.props.onSetCurrentGame(data.game);
      });

      socket.on('DRAW_CARD', function (turn) {
        _this2.onChangeCard(turn.turn.card, turn.turn.cardList);
      });

      socket.on('USER_WON', function () {
        var lastCard = _extends({}, _this2.props.card);

        _this2.props.history.push({
          pathname: '/winner',
          state: { card: lastCard }
        });
        _this2.props.onEndGame();
      });

      socket.on('START_GAME', function (game) {
        _this2.props.game ? null : _this2.props.onSetCurrentGame(game.game);
      });

      socket.on('FORCE_END_GAME', function () {
        _this2.props.onEndGame();
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      socket.close();
    }
  }, {
    key: 'render',
    value: function render() {
      var card = this.props.card ? this.renderGameScreen() : 'Juego no iniciado...';

      return _react2.default.createElement(
        _Aux2.default,
        null,
        card
      );
    }
  }]);

  return BingoGame;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state) {
  return {
    card: state.bng.currentCard,
    cardList: state.bng.cardsList,
    playerWin: state.bng.playerWin,
    game: state.bng.currentGame,
    gameHistory: state.bng.history
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    onChangeCard: function onChangeCard(card, cardList) {
      return dispatch((0, _index.changeCard)(card, cardList));
    },
    onSetCurrentGame: function onSetCurrentGame(game) {
      return dispatch((0, _index.setCurrentGame)(game));
    },
    onSetGameHistory: function onSetGameHistory(gameHistory) {
      return dispatch((0, _index.setGameHistory)(gameHistory));
    },
    onEndGame: function onEndGame() {
      return dispatch((0, _index.resetGame)());
    },
    onForceEndGame: function onForceEndGame() {
      return dispatch((0, _index.forceEndGame)());
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(BingoGame);

/***/ }),

/***/ "4cfj":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__("GiK3");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var panel = function panel(props) {

  var styles = _extends({
    background: 'rgba(0, 0, 0, ' + (props.opacity ? props.opacity : 0) + ')',
    display: 'grid',
    gridTemplateColumns: props.gridTemplateColumns,
    gridTemplateRows: props.gridTemplateRows,
    rowGap: props.rowGap ? props.rowGap : 0,
    columnGap: props.columnGap ? props.columnGap : 0
  }, props.style);

  return _react2.default.createElement(
    'div',
    { style: styles, className: props.className },
    props.children
  );
};

exports.default = panel;

/***/ }),

/***/ "6V5L":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(false);
// imports


// module
exports.push([module.i, ".game-label__label {\n  color: #FFFFFF;\n  font-weight: 600;\n  font-size: 3.6rem;\n  margin-bottom: 0;\n}\n\n.game-label__text {\n  margin-top: -3.5rem;\n  font-weight: bold;\n  font-family: sans-serif;\n}\n\n.game-label__text--important {\n  margin-top: -3.5rem !important;\n  color: #FFE432;\n  font-size: 10rem;\n}\n\n.game-label__text--regular-salmon {\n  color: #F5CDA7;\n  font-size: 8rem;\n}\n\n.game-label__text--regular-green {\n  color: #58FCEC;\n  font-size: 8rem;\n}\n\n.game-label__text--regular-pink {\n  color: #F7AEF8;\n  font-size: 8rem;\n}\n\n@media only screen and ( max-width: 1500px ) {\n  .game-label__label {\n    font-size: 2.6rem;\n  }\n\n  .game-label__text {\n    margin-top: -2rem;\n  }\n\n  .game-label__text--important {\n    margin-top: -2.5rem !important;\n    font-size: 5rem;\n  }\n  \n  .game-label__text--regular-salmon {\n    font-size: 4rem;\n  }\n  \n  .game-label__text--regular-green {\n    font-size: 4rem;\n  }\n  \n  .game-label__text--regular-pink {\n    font-size: 4rem;\n  }\n}", ""]);

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
      console.log(nextProps.img !== this.props.img);
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

/***/ "CZxu":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__("GiK3");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var gridItem = function gridItem(props) {
  var styles = _extends({
    gridRow: props.gridRow,
    gridColumn: props.gridColumn
  }, props.styles);

  return _react2.default.createElement(
    'div',
    _extends({ style: styles }, props),
    props.children
  );
};

exports.default = gridItem;

/***/ }),

/***/ "EHgG":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__("GiK3");

var _react2 = _interopRequireDefault(_react);

var _cards = __webpack_require__("gx/J");

var _Panel = __webpack_require__("4cfj");

var _Panel2 = _interopRequireDefault(_Panel);

var _Card = __webpack_require__("6f/o");

var _Card2 = _interopRequireDefault(_Card);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RecentCardsSection = function (_Component) {
  _inherits(RecentCardsSection, _Component);

  function RecentCardsSection() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, RecentCardsSection);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = RecentCardsSection.__proto__ || Object.getPrototypeOf(RecentCardsSection)).call.apply(_ref, [this].concat(args))), _this), _this.renderCardsImages = function () {
      var cards = _this.props.cards;

      var cardsImages = [];

      var startIndex = cards.length < 17 ? 0 : cards.length - 17;

      for (var index = startIndex; index < cards.length - 1; index++) {
        var card = cards[index];

        var imageRef = _cards.cardList[card].image;
        cardsImages.push(_react2.default.createElement(_Card2.default, {
          key: 'card_img_' + index,
          cover: 'contain',
          width: '12.5rem',
          height: '19rem',
          img: '/static/assets/' + imageRef,
          isResponsive: true,
          isRecentCard: true
        }));
      }

      return cardsImages;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(RecentCardsSection, [{
    key: 'render',
    value: function render() {
      var cardsImgs = this.renderCardsImages();

      return _react2.default.createElement(
        _Panel2.default,
        {
          opacity: 0,
          gridTemplateColumns: 'repeat(4, minmax(min-content, max-content))',
          gridTemplateRows: 'repeat(5,min-content)',
          rowGap: '1.1rem',
          columnGap: '3rem',
          className: 'bingo-game__panel',
          style: { margin: 'auto' }
        },
        cardsImgs
      );
    }
  }]);

  return RecentCardsSection;
}(_react.Component);

exports.default = RecentCardsSection;

//width='13rem' 
//height='20rem'

//width='10rem' 
//height='15rem'

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

/***/ "KFtZ":
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__("qLg8");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__("MTIv")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--1-1!./BingoGame.css", function() {
		var newContent = require("!!../../../node_modules/css-loader/index.js??ref--1-1!./BingoGame.css");

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

/***/ "UNZM":
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__("6V5L");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__("MTIv")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../../../node_modules/css-loader/index.js??ref--1-1!./GameLabel.css", function() {
		var newContent = require("!!../../../../node_modules/css-loader/index.js??ref--1-1!./GameLabel.css");

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

/***/ "W3tq":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__("GiK3");

var _react2 = _interopRequireDefault(_react);

var _GridItem = __webpack_require__("CZxu");

var _GridItem2 = _interopRequireDefault(_GridItem);

__webpack_require__("UNZM");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var gameLabel = function gameLabel(props) {
  var textClasses = ['game-label__text'];

  switch (props.type) {
    case 'important':
      textClasses.push('game-label__text--important');
      break;

    case 'regular-green':
      textClasses.push('game-label__text--regular-green');
      break;

    case 'regular-salmon':
      textClasses.push('game-label__text--regular-salmon');
      break;

    case 'regular-pink':
      textClasses.push('game-label__text--regular-pink');
      break;

    default:
      break;
  }

  var content = props.customContent ? props.customContent : _react2.default.createElement(
    'div',
    { className: textClasses.join(' ') },
    props.text
  );

  return _react2.default.createElement(
    _GridItem2.default,
    props,
    _react2.default.createElement(
      'p',
      { className: 'game-label__label' },
      props.label
    ),
    content
  );
};

exports.default = gameLabel;

/***/ }),

/***/ "X1Fc":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(false);
// imports


// module
exports.push([module.i, ".bingo-background {\n  width: 100vw;\n  height: 100vh;\n  background: url('/static/assets/background.svg');\n  background-size: cover;\n  padding: 2rem 4.5rem;\n  display: flex;\n}\n\n.bingo-background__panel {\n  background: rgba(0, 0, 0, .20);\n  border-radius: 9px;\n  flex: 1;\n  display: grid;\n  grid-auto-columns: 1fr;\n  grid-template-columns: 1fr 1fr;\n}\n\n.bingo-background__panel--without-grid {\n  background: rgba(0, 0, 0, .20);\n  border-radius: 9px;\n  flex: 1;\n}", ""]);

// exports


/***/ }),

/***/ "at5q":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__("GiK3");

var _react2 = _interopRequireDefault(_react);

__webpack_require__("iSOa");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CardboardPattern = function (_Component) {
  _inherits(CardboardPattern, _Component);

  function CardboardPattern() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, CardboardPattern);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CardboardPattern.__proto__ || Object.getPrototypeOf(CardboardPattern)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      positions: [[0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11], [12, 13, 14, 15], [0, 4, 8, 12], [1, 5, 9, 13], [2, 6, 10, 14], [3, 7, 11, 15], [0, 5, 10, 15], [3, 6, 9, 12]],
      currentPosition: [0, 1, 2, 3],
      currentIndex: 0
    }, _this.interval = null, _this.changePattern = function () {
      var randomNumber = Math.floor(Math.random() * _this.state.positions.length);
      _this.setState(function (prevState) {
        var newIndex = prevState.currentIndex + 1 < prevState.positions.length ? prevState.currentIndex + 1 : 0;
        var newPosition = prevState.positions[prevState.currentIndex];

        return {
          currentPosition: newPosition,
          currentIndex: newIndex
        };
      });
      // this.setState( { currentPosition: this.state.positions[randomNumber] } )
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(CardboardPattern, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var positions = this.state.positions;

      var patterns = [].concat(_toConsumableArray(positions));

      switch (this.props.gameType) {
        case ('DOBLE LINEA', 'LINEA'):
          patterns = [].concat(_toConsumableArray(positions), [[0, 1, 2, 3, 4, 8, 12], [0, 1, 2, 3, 5, 9, 13], [0, 1, 2, 3, 6, 10, 14], [0, 1, 2, 3, 7, 11, 15], [4, 5, 6, 7, 0, 8, 12], [4, 5, 6, 7, 1, 9, 13], [4, 5, 6, 7, 2, 10, 14], [4, 5, 6, 7, 3, 11, 15], [8, 9, 10, 11, 0, 4, 12], [8, 9, 10, 11, 1, 5, 13], [8, 9, 10, 11, 2, 6, 14], [8, 9, 10, 11, 3, 7, 15], [12, 13, 14, 15, 0, 4, 8], [12, 13, 14, 15, 1, 5, 9], [12, 13, 14, 15, 2, 6, 10], [12, 13, 14, 15, 3, 7, 11], [0, 1, 2, 3, 4, 5, 6, 7], [8, 9, 10, 11, 12, 13, 14, 15], [0, 4, 8, 12, 1, 5, 9, 13], [2, 6, 10, 14, 3, 7, 11, 15], [0, 4, 8, 12, 2, 6, 10, 14], [0, 4, 8, 12, 3, 7, 11, 15], [1, 5, 9, 13, 2, 6, 10, 14], [1, 5, 9, 13, 3, 7, 11, 15], [0, 1, 2, 3, 8, 9, 10, 11], [0, 1, 2, 3, 12, 13, 14, 15], [4, 5, 6, 7, 8, 9, 10, 11], [4, 5, 6, 7, 12, 13, 14, 15]]);
          break;

        default:
          break;
      }

      this.setState({ positions: patterns });
      this.interval = setInterval(this.changePattern, 2500);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearInterval(this.interval);
    }
  }, {
    key: 'render',
    value: function render() {
      var currentPosition = this.state.currentPosition;


      return _react2.default.createElement(
        'div',
        { style: { height: '100%' } },
        _react2.default.createElement(
          'svg',
          { width: '100%', height: '100%' },
          _react2.default.createElement(
            'g',
            { id: 'Capa_2', 'data-name': 'Capa 2' },
            _react2.default.createElement('rect', { className: currentPosition.indexOf(0) !== -1 ? 'cls-1' : 'cls-2', x: '0', y: '0', width: '25%', height: '25%' }),
            _react2.default.createElement('rect', { className: currentPosition.indexOf(1) !== -1 ? 'cls-1' : 'cls-2', x: '25%', y: '0', width: '25%', height: '25%' }),
            _react2.default.createElement('rect', { className: currentPosition.indexOf(2) !== -1 ? 'cls-1' : 'cls-2', x: '50%', y: '0', width: '25%', height: '25%' }),
            _react2.default.createElement('rect', { className: currentPosition.indexOf(3) !== -1 ? 'cls-1' : 'cls-2', x: '75%', y: '0', width: '25%', height: '25%' }),
            _react2.default.createElement('rect', { className: currentPosition.indexOf(4) !== -1 ? 'cls-1' : 'cls-2', x: '0', y: '25%', width: '25%', height: '25%' }),
            _react2.default.createElement('rect', { className: currentPosition.indexOf(5) !== -1 ? 'cls-1' : 'cls-2', x: '25%', y: '25%', width: '25%', height: '25%' }),
            _react2.default.createElement('rect', { className: currentPosition.indexOf(6) !== -1 ? 'cls-1' : 'cls-2', x: '50%', y: '25%', width: '25%', height: '25%' }),
            _react2.default.createElement('rect', { className: currentPosition.indexOf(7) !== -1 ? 'cls-1' : 'cls-2', x: '75%', y: '25%', width: '25%', height: '25%' }),
            _react2.default.createElement('rect', { className: currentPosition.indexOf(8) !== -1 ? 'cls-1' : 'cls-2', x: '0', y: '50%', width: '25%', height: '25%' }),
            _react2.default.createElement('rect', { className: currentPosition.indexOf(9) !== -1 ? 'cls-1' : 'cls-2', x: '25%', y: '50%', width: '25%', height: '25%' }),
            _react2.default.createElement('rect', { className: currentPosition.indexOf(10) !== -1 ? 'cls-1' : 'cls-2', x: '50%', y: '50%', width: '25%', height: '25%' }),
            _react2.default.createElement('rect', { className: currentPosition.indexOf(11) !== -1 ? 'cls-1' : 'cls-2', x: '75%', y: '50%', width: '25%', height: '25%' }),
            _react2.default.createElement('rect', { className: currentPosition.indexOf(12) !== -1 ? 'cls-1' : 'cls-2', x: '0', y: '75%', width: '25%', height: '25%' }),
            _react2.default.createElement('rect', { className: currentPosition.indexOf(13) !== -1 ? 'cls-1' : 'cls-2', x: '25%', y: '75%', width: '25%', height: '25%' }),
            _react2.default.createElement('rect', { className: currentPosition.indexOf(14) !== -1 ? 'cls-1' : 'cls-2', x: '50%', y: '75%', width: '25%', height: '25%' }),
            _react2.default.createElement('rect', { className: currentPosition.indexOf(15) !== -1 ? 'cls-1' : 'cls-2', x: '75%', y: '75%', width: '25%', height: '25%' })
          )
        )
      );
    }
  }]);

  return CardboardPattern;
}(_react.Component);

exports.default = CardboardPattern;

/***/ }),

/***/ "iQcD":
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__("X1Fc");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__("MTIv")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../../../node_modules/css-loader/index.js??ref--1-1!./Background.css", function() {
		var newContent = require("!!../../../../node_modules/css-loader/index.js??ref--1-1!./Background.css");

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

/***/ "iSOa":
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__("vqYP");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__("MTIv")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../../../node_modules/css-loader/index.js??ref--1-1!./CardboardPattern.css", function() {
		var newContent = require("!!../../../../node_modules/css-loader/index.js??ref--1-1!./CardboardPattern.css");

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

/***/ "prCc":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__("GiK3");

var _react2 = _interopRequireDefault(_react);

__webpack_require__("iQcD");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var background = function background(props) {
  return _react2.default.createElement(
    'div',
    { className: 'bingo-background' },
    _react2.default.createElement(
      'div',
      { className: props.grid ? 'bingo-background__panel' : 'bingo-background__panel--without-grid' },
      props.children
    )
  );
};

exports.default = background;

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

/***/ "qLg8":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(false);
// imports


// module
exports.push([module.i, ".bingo-game__title {\n  text-align: center;\n  color: #fff;\n  font-size: 7.2rem;\n  font-weight: 200;\n}\n\n.bingo-game__panel {\n  padding: 0.5rem 2rem;\n}\n\n.bingo-game__game-details {\n  margin-bottom: -0.5rem;\n  color: #fff;\n  font-weight: 300;\n  font-size: 3.6rem;\n\n}\n\n.bingo-game__game-name {\n  margin-bottom: -0.5rem;\n  color: #F1DB4B;\n  font-weight: bold;\n  font-size: 6rem;\n  margin: -2rem 0;\n}\n\n@media only screen and ( max-width: 1500px ) {\n  .bingo-game__title {\n    font-size: 4rem;\n  }\n\n  .bingo-game__game-details {\n    font-size: 2.6rem;\n  }\n\n  .bingo-game__game-name {\n    font-size: 3rem;\n    margin: -1rem 0;\n  }\n\n  .pattern-responsive {\n    width: 20rem !important;\n    height: 20rem !important;\n  }\n}", ""]);

// exports


/***/ }),

/***/ "viWZ":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(false);
// imports


// module
exports.push([module.i, ".card-item {\n  border: 0.5rem solid #fff;\n  border-radius: 9px;\n}\n\n@media screen and ( max-width: 1400px ) {\n  .card-item-responsive {\n    /* width: 18rem !important;\n    height: 27rem !important; */\n  }\n\n  .card-item--recent-card {\n    width: 10rem !important;\n    height: 15rem !important;\n  }\n}", ""]);

// exports


/***/ }),

/***/ "vqYP":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(false);
// imports


// module
exports.push([module.i, ".cls-1{\n  fill:#eed761;\n}\n\n.cls-1,\n.cls-2{\n  stroke: rgba(0, 0, 0, 1);\n  stroke-miterlimit: 10;\n  stroke-width: 0.5rem;\n  rx: 9px;\n  ry: 9px;\n}\n\n.cls-2{\n  fill: rgba(0, 0, 0, .1);\n}", ""]);

// exports


/***/ })

});