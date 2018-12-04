webpackJsonp([3],{

/***/ "6wPf":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(false);
// imports


// module
exports.push([module.i, ".chronometer__time {\n  color: #F1DB4B;\n  font-weight: bold;\n  font-size: 17rem;\n  margin-top: -7rem;\n  margin-left: 3.5rem;\n  margin-bottom: 0;\n}", ""]);

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

var _Chronometer = __webpack_require__("XgnC");

var _Chronometer2 = _interopRequireDefault(_Chronometer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GameInfo = function (_Component) {
  _inherits(GameInfo, _Component);

  function GameInfo() {
    _classCallCheck(this, GameInfo);

    return _possibleConstructorReturn(this, (GameInfo.__proto__ || Object.getPrototypeOf(GameInfo)).apply(this, arguments));
  }

  _createClass(GameInfo, [{
    key: 'render',
    value: function render() {
      var simpleCardboardPrice = this.props.game.singlePrice / 100;
      var doubleCardboardPrice = this.props.game.doublePrice / 100;
      var tripleCardboardPrice = this.props.game.triplePrice / 100;

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
        _react2.default.createElement(_Chronometer2.default, { timeStart: 180 })
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
      var style = {
        flex: this.props.flex ? this.props.flex : '0'
      };

      return _react2.default.createElement(
        'div',
        { style: style },
        'RandomGame...'
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
    }, _this.tick = function () {

      if (_this.state.time > 0) {
        _this.setState(function (prevState) {
          return {
            time: prevState.time - 1
          };
        });
      } else {
        clearInterval(_this.interval);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Chronometer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.interval = setInterval(function () {
        return _this2.tick();
      }, 1000);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearInterval(this.interval);
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
exports.push([module.i, ".next-game__section {\n  padding: 3rem 3rem;\n}\n\n.next-game__section h1 {\n  color: #fff;\n  font-weight: 300;\n  font-size: 3.2rem;\n  margin-bottom: 3rem;\n}\n\n.next-game__text-label {\n  color: #fff;\n  font-weight: 200;\n  font-size: 2.8rem;\n  margin-bottom: 0;\n}\n\n.next-game__game-type {\n  color: #fff;\n  font-weight: bold;\n  font-size: 5rem;\n  margin-top: -2rem;\n  margin-left: 3.5rem;\n  margin-bottom: 0;\n  margin-bottom: 3rem;\n  text-transform: uppercase;\n}\n\n.next-game__cardboards-prices {\n  list-style: none;\n  margin-bottom: 3rem;\n}\n\n.next-game__cardboards-prices--item {\n  color: #fff;\n  font-size: 3rem;\n  margin-top: -1rem;\n}\n\n.next-game__error-msg {\n  display: flex;\n  justify-content: center;\n}\n\n.next-game__error-icon {\n  color: #fff;\n  font-size: 10rem;\n  margin-right: 2rem;\n}", ""]);

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
      this.props.onLoadGame(function (path) {
        return console.log(path);
      });
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

__webpack_require__("h6Oo");

var _GameInfo = __webpack_require__("JyPB");

var _GameInfo2 = _interopRequireDefault(_GameInfo);

var _antd = __webpack_require__("nFWT");

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

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = NextGameInfo.__proto__ || Object.getPrototypeOf(NextGameInfo)).call.apply(_ref, [this].concat(args))), _this), _this.renderGameNotFoundMessage = function () {
      return _react2.default.createElement(
        'div',
        { className: 'next-game__error-msg' },
        _react2.default.createElement(_antd.Icon, { className: 'next-game__error-icon', type: 'exclamation-circle' }),
        _react2.default.createElement(
          'h1',
          { className: 'next-game__error-text' },
          'No se encontr\xF3 un siguiente juego, verifique que existe una partida creada.'
        )
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(NextGameInfo, [{
    key: 'render',
    value: function render() {
      var component = this.props.game ? _react2.default.createElement(_GameInfo2.default, { game: this.props.game }) : this.renderGameNotFoundMessage();
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