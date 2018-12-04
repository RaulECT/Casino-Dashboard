webpackJsonp([6],{

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

/***/ "hrD2":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__("GiK3");

var _react2 = _interopRequireDefault(_react);

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
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _Background2.default,
        { display: 'flexRow' },
        _react2.default.createElement(_NextGameInfo2.default, {
          flex: '1.8',
          opacity: .15
        }),
        _react2.default.createElement(_RandomGame2.default, {
          flex: '1'
        })
      );
    }
  }]);

  return WaitingGameSection;
}(_react.Component);

exports.default = WaitingGameSection;

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

/***/ "yYNF":
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

var NextGameInfo = function (_Component) {
  _inherits(NextGameInfo, _Component);

  function NextGameInfo() {
    _classCallCheck(this, NextGameInfo);

    return _possibleConstructorReturn(this, (NextGameInfo.__proto__ || Object.getPrototypeOf(NextGameInfo)).apply(this, arguments));
  }

  _createClass(NextGameInfo, [{
    key: 'render',
    value: function render() {
      var style = {
        flex: this.props.flex ? this.props.flex : '0',
        background: this.props.opacity ? 'rgba(0,0,0,' + this.props.opacity + ')' : 'rgba(0,0,0,0)'
      };

      return _react2.default.createElement(
        'div',
        { style: style },
        _react2.default.createElement(
          'h1',
          null,
          'Proxima Partida:'
        ),
        _react2.default.createElement(
          'span',
          null,
          'Tipo de Juego:'
        ),
        _react2.default.createElement(
          'p',
          null,
          'DOBLE LINEA'
        ),
        _react2.default.createElement(
          'span',
          null,
          'Precios de Inscripci\xF3n:'
        ),
        _react2.default.createElement(
          'ul',
          null,
          _react2.default.createElement(
            'li',
            null,
            '$10 Cartilla Simple'
          ),
          _react2.default.createElement(
            'li',
            null,
            '$15 Cartilla Doble'
          ),
          _react2.default.createElement(
            'li',
            null,
            '$20 Cartilla Triple'
          )
        ),
        _react2.default.createElement(
          'span',
          null,
          'Tiempo de espera:'
        )
      );
    }
  }]);

  return NextGameInfo;
}(_react.Component);

exports.default = NextGameInfo;

/***/ })

});