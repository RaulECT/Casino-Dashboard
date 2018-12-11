webpackJsonp([3],{

/***/ "/4IX":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__("GiK3");

var _react2 = _interopRequireDefault(_react);

var _antd = __webpack_require__("nFWT");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var gameNotFoundMessage = function gameNotFoundMessage(props) {
  var message = props.message ? props.message : 'No se encontró una siguiente partida, verifique que existe una partida creada.';

  return _react2.default.createElement(
    'div',
    { className: 'next-game__error-msg' },
    _react2.default.createElement(_antd.Icon, { className: 'next-game__error-icon', type: 'exclamation-circle' }),
    _react2.default.createElement(
      'h1',
      { style: { color: '#fff' }, className: 'next-game__error-text' },
      message
    )
  );
};

exports.default = gameNotFoundMessage;

/***/ }),

/***/ "6wPf":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(false);
// imports


// module
exports.push([module.i, ".chronometer__time {\n  color: #F1DB4B;\n  font-weight: bold;\n  font-size: 20rem;\n  margin-top: -7rem;\n  margin-left: 3.5rem;\n  margin-bottom: 0;\n}\n\n@media screen and ( max-width: 1400px ) {\n  .chronometer__time {\n    font-size: 17rem;\n  }\n}", ""]);

// exports


/***/ }),

/***/ "JyPB":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__("GiK3");

var _react2 = _interopRequireDefault(_react);

var _socket = __webpack_require__("ITBa");

var _Chronometer = __webpack_require__("XgnC");

var _Chronometer2 = _interopRequireDefault(_Chronometer);

var _GameNotFoundMessage = __webpack_require__("/4IX");

var _GameNotFoundMessage2 = _interopRequireDefault(_GameNotFoundMessage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GameInfo = function (_Component) {
  _inherits(GameInfo, _Component);

  function GameInfo() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, GameInfo);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = GameInfo.__proto__ || Object.getPrototypeOf(GameInfo)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      isCountdownStarted: false
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(GameInfo, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.socket = (0, _socket.openConnection)();

      this.socket.on('COUNTDOWN_STARTED', function () {
        _this2.setState({ isCountdownStarted: true });
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.socket.close();
    }
  }, {
    key: 'render',
    value: function render() {
      var simpleCardboardPrice = this.props.game.singlePrice / 100;
      var doubleCardboardPrice = this.props.game.doublePrice / 100;
      var tripleCardboardPrice = this.props.game.triplePrice / 100;
      var chronometerSection = this.state.isCountdownStarted ? _react2.default.createElement(_Chronometer2.default, { type: 'global', onEndTime: this.props.onEndTime, timeStart: 30 }) : _react2.default.createElement(_GameNotFoundMessage2.default, { message: 'No se ha iniciado la cuenta para la partida.' });

      return _react2.default.createElement(
        _react.Fragment,
        null,
        _react2.default.createElement(
          'h1',
          null,
          'Proxima Partida:'
        ),
        _react2.default.createElement(
          'span',
          { className: 'next-game__text-label' },
          'Tipo de Juego:'
        ),
        _react2.default.createElement(
          'p',
          { className: 'next-game__game-type' },
          ' ',
          this.props.game.gameName,
          ' '
        ),
        _react2.default.createElement(
          'span',
          { className: 'next-game__text-label' },
          'Precios de Inscripci\xF3n:'
        ),
        _react2.default.createElement(
          'ul',
          { className: 'next-game__cardboards-prices' },
          _react2.default.createElement(
            'li',
            { className: 'next-game__cardboards-prices--item' },
            '$' + simpleCardboardPrice + ' Cartilla Simple'
          ),
          _react2.default.createElement(
            'li',
            { className: 'next-game__cardboards-prices--item' },
            '$' + doubleCardboardPrice + ' Cartilla Doble'
          ),
          _react2.default.createElement(
            'li',
            { className: 'next-game__cardboards-prices--item' },
            '$' + tripleCardboardPrice + ' Cartilla Triple'
          )
        ),
        _react2.default.createElement(
          'span',
          { className: 'next-game__text-label' },
          'Tiempo de espera:'
        ),
        chronometerSection
      );
    }
  }]);

  return GameInfo;
}(_react.Component);

exports.default = GameInfo;

/***/ }),

/***/ "PtzZ":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__("GiK3");

var _react2 = _interopRequireDefault(_react);

var _GameNotFoundMessage = __webpack_require__("/4IX");

var _GameNotFoundMessage2 = _interopRequireDefault(_GameNotFoundMessage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RandomGame = function (_Component) {
  _inherits(RandomGame, _Component);

  function RandomGame() {
    _classCallCheck(this, RandomGame);

    return _possibleConstructorReturn(this, (RandomGame.__proto__ || Object.getPrototypeOf(RandomGame)).apply(this, arguments));
  }

  _createClass(RandomGame, [{
    key: 'render',
    value: function render() {
      var component = this.props.games ? 'RandomGame...' : _react2.default.createElement(_GameNotFoundMessage2.default, { message: 'No se encontraron partidas activas.' });
      var style = {
        flex: this.props.flex ? this.props.flex : '0'
      };

      return _react2.default.createElement(
        'div',
        { style: style },
        component
      );
    }
  }]);

  return RandomGame;
}(_react.Component);

exports.default = RandomGame;

/***/ }),

/***/ "X1Fc":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(false);
// imports


// module
exports.push([module.i, ".bingo-background {\n  width: 100vw;\n  height: 100vh;\n  background: url('/static/assets/background.svg');\n  background-size: cover;\n  padding: 2rem 4.5rem;\n  display: flex;\n}\n\n.bingo-background__panel {\n  background: rgba(0, 0, 0, .20);\n  border-radius: 9px;\n  flex: 1;\n  display: grid;\n  grid-auto-columns: 1fr;\n  grid-template-columns: 1fr 1fr;\n}\n\n.bingo-background__panel--without-grid {\n  background: rgba(0, 0, 0, .20);\n  border-radius: 9px;\n  flex: 1;\n}", ""]);

// exports


/***/ }),

/***/ "XgnC":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__("GiK3");

var _react2 = _interopRequireDefault(_react);

var _moment = __webpack_require__("PJh5");

var _moment2 = _interopRequireDefault(_moment);

var _socket = __webpack_require__("ITBa");

__webpack_require__("u1JV");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Chronometer = function (_Component) {
  _inherits(Chronometer, _Component);

  function Chronometer() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Chronometer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Chronometer.__proto__ || Object.getPrototypeOf(Chronometer)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      time: _this.props.timeStart
    }, _this.handleOnGlobalConfiguration = function () {
      _this.socket = (0, _socket.openConnection)();

      _this.socket.on('COUNTDOWN_CONNECTED', function (data) {
        console.log(data);
        var time = data.time >= 0 ? data.time : 0;

        _this.setState({ time: time });
      });

      _this.socket.on('UPDATE_COUNTDOWN', function (data) {
        var isNotEndTime = _this.state.time > 0;

        if (isNotEndTime) {
          _this.setState({ time: data.time });
        } else {
          _this.socket.emit('STOP_COUNTDOWN');

          _this.props.onEndTime();
        }
      });
    }, _this.handleOnLocalConfiguration = function () {
      _this.interval = setInterval(function () {
        return _this.tick();
      }, 1000);
    }, _this.tick = function () {

      if (_this.state.time > 0) {
        _this.setState(function (prevState) {
          return {
            time: prevState.time - 1
          };
        });
      } else {
        clearInterval(_this.interval);

        _this.props.onEndTime();
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Chronometer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      switch (this.props.type) {
        case 'global':
          this.handleOnGlobalConfiguration();
          break;

        case 'local':
          this.handleOnLocalConfiguration();
          break;

        default:
          this.handleOnLocalConfiguration();
          break;
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      switch (this.props.type) {
        case 'global':
          this.socket.close();
          break;

        case 'local':
          clearInterval(this.interval);
          break;

        default:
          clearInterval(this.interval);
          break;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var time = this.state.time;

      var minutes = (0, _moment2.default)(time * 1000).format('mm:ss');

      return _react2.default.createElement(
        'p',
        { className: 'chronometer__time' },
        minutes
      );
    }
  }]);

  return Chronometer;
}(_react.Component);

exports.default = Chronometer;

/***/ }),

/***/ "Yc6E":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(false);
// imports


// module
exports.push([module.i, ".next-game__section {\n  padding: 3rem 3rem;\n}\n\n.next-game__section h1 {\n  color: #fff;\n  font-weight: 300;\n  font-size: 4.2rem;\n  margin-bottom: 4rem;\n}\n\n.next-game__text-label {\n  color: #fff;\n  font-weight: 200;\n  font-size: 3.8rem;\n  margin-bottom: 0;\n}\n\n.next-game__game-type {\n  color: #fff;\n  font-weight: bold;\n  font-size: 6rem;\n  margin-top: -2rem;\n  margin-left: 3.5rem;\n  margin-bottom: 0;\n  margin-bottom: 3rem;\n  text-transform: uppercase;\n}\n\n.next-game__cardboards-prices {\n  list-style: none;\n  margin-bottom: 3rem;\n}\n\n.next-game__cardboards-prices--item {\n  color: #fff;\n  font-size: 4rem;\n  margin-top: -1rem;\n}\n\n.next-game__error-msg {\n  display: flex;\n  justify-content: center;\n}\n\n.next-game__error-icon {\n  color: #fff;\n  font-size: 10rem;\n  margin-right: 2rem;\n}\n\n@media screen and ( max-width: 1400px ) {\n  .next-game__section h1 {\n    font-size: 3.2rem;\n    margin-bottom: 3rem;\n  }\n\n  .next-game__text-label {\n    font-size: 2.8rem;\n  }\n\n  .next-game__game-type {\n    font-size: 5rem;\n  }\n\n  .next-game__cardboards-prices--item {\n    font-size: 3rem;\n  }\n}", ""]);

// exports


/***/ }),

/***/ "h6Oo":
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__("Yc6E");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__("MTIv")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../../../node_modules/css-loader/index.js??ref--1-1!./NextGameInfo.css", function() {
		var newContent = require("!!../../../../node_modules/css-loader/index.js??ref--1-1!./NextGameInfo.css");

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

/***/ "hrD2":
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

var _actions = __webpack_require__("cl7k");

var _Background = __webpack_require__("prCc");

var _Background2 = _interopRequireDefault(_Background);

var _NextGameInfo = __webpack_require__("yYNF");

var _NextGameInfo2 = _interopRequireDefault(_NextGameInfo);

var _RandomGame = __webpack_require__("PtzZ");

var _RandomGame2 = _interopRequireDefault(_RandomGame);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WaitingGameSection = function (_Component) {
  _inherits(WaitingGameSection, _Component);

  function WaitingGameSection() {
    _classCallCheck(this, WaitingGameSection);

    return _possibleConstructorReturn(this, (WaitingGameSection.__proto__ || Object.getPrototypeOf(WaitingGameSection)).apply(this, arguments));
  }

  _createClass(WaitingGameSection, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.socket = (0, _socket.openConnection)();
      this.props.onLoadGame(function (path) {
        return console.log(path);
      });

      this.socket.on('START_GAME', function (game) {
        _this2.props.history.push({
          pathname: '/game',
          state: { game: game }
        });
      });

      this.socket.on('BINGO_CONECTED', function (data) {
        _this2.props.history.push('/game');
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.socket.close();
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _Background2.default,
        { display: 'flexRow' },
        _react2.default.createElement(_NextGameInfo2.default, {
          flex: '1.8',
          opacity: .15,
          game: this.props.game
        }),
        _react2.default.createElement(_RandomGame2.default, {
          flex: '1'
        })
      );
    }
  }]);

  return WaitingGameSection;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state) {
  return {
    game: state.bng.currentGame
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    onLoadGame: function onLoadGame(push) {
      return dispatch((0, _actions.loadCurrentGame)(push));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(WaitingGameSection);

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

  var style = void 0;

  switch (props.display) {
    case 'flexRow':
      style = { display: 'flex', flexDirection: 'row' };
      break;

    case 'flexColumn':
      style = { display: 'flex', flexDirection: 'column' };
      break;

    case 'flex':
      style = { display: 'flex' };
      break;

    default:
      style = {};
      break;
  }

  return _react2.default.createElement(
    'div',
    { className: 'bingo-background' },
    _react2.default.createElement(
      'div',
      { style: style, className: props.grid ? 'bingo-background__panel' : 'bingo-background__panel--without-grid' },
      props.children
    )
  );
};

exports.default = background;

/***/ }),

/***/ "u1JV":
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__("6wPf");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__("MTIv")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../../../node_modules/css-loader/index.js??ref--1-1!./Chronometer.css", function() {
		var newContent = require("!!../../../../node_modules/css-loader/index.js??ref--1-1!./Chronometer.css");

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

/***/ "yYNF":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__("GiK3");

var _react2 = _interopRequireDefault(_react);

var _socket = __webpack_require__("ITBa");

__webpack_require__("h6Oo");

var _GameInfo = __webpack_require__("JyPB");

var _GameInfo2 = _interopRequireDefault(_GameInfo);

var _GameNotFoundMessage = __webpack_require__("/4IX");

var _GameNotFoundMessage2 = _interopRequireDefault(_GameNotFoundMessage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NextGameInfo = function (_Component) {
  _inherits(NextGameInfo, _Component);

  function NextGameInfo() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, NextGameInfo);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = NextGameInfo.__proto__ || Object.getPrototypeOf(NextGameInfo)).call.apply(_ref, [this].concat(args))), _this), _this.sendGameStartNotiication = function () {
      _this.socket.emit('SHOW_START_GAME_NOTIFICATION_RQ');
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(NextGameInfo, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.socket = (0, _socket.openConnection)();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.socket.close();
    }
  }, {
    key: 'render',
    value: function render() {
      var component = this.props.game ? _react2.default.createElement(_GameInfo2.default, { onEndTime: this.sendGameStartNotiication, game: this.props.game }) : _react2.default.createElement(_GameNotFoundMessage2.default, null);
      var style = {
        flex: this.props.flex ? this.props.flex : '0',
        background: this.props.opacity ? 'rgba(0,0,0,' + this.props.opacity + ')' : 'rgba(0,0,0,0)'
      };

      return _react2.default.createElement(
        'div',
        {
          className: 'next-game__section',
          style: style
        },
        component
      );
    }
  }]);

  return NextGameInfo;
}(_react.Component);

exports.default = NextGameInfo;

/***/ })

});