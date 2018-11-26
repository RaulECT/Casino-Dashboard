webpackJsonp([11],{

/***/ "6f/o":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__("GiK3");

var _react2 = _interopRequireDefault(_react);

__webpack_require__("prum");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var card = function card(props) {

  var classes = ['card-item'];
  var styles = _defineProperty({
    width: props ? props.width : '200px',
    height: props ? props.height : '400px',
    transform: props.scale ? 'scale(' + props.scale + ')' : 'scale(1)'
  }, 'transform', props.scale ? 'scale(' + props.scale + ')' : 'scale(1)');

  props.isResponsive ? classes.push('card-item-responsive') : null;
  props.isRecentCard ? classes.push('card-item--recent-card') : null;

  return _react2.default.createElement('img', {
    src: props.img,
    alt: 'Bingo Card',
    style: styles,
    className: classes.join(' ')
  });
};

exports.default = card;

/***/ }),

/***/ "8RW9":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(false);
// imports


// module
exports.push([module.i, ".cards-section {\n  width: 100%;\n  height: 100%;\n  display: grid;\n  grid-template-columns: repeat( 10, minmax(min-content, max-content) );\n  row-gap: 0.5rem;\n  column-gap: 0.5rem;\n  margin: auto;\n  padding: 1.5rem;\n  align-content: center;\n  justify-content: center;\n}\n\n.test {\n  width: 14rem;\n  height: 20rem;\n  background: rgba(0, 0, 0, .5);\n}", ""]);

// exports


/***/ }),

/***/ "S7kE":
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__("8RW9");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__("MTIv")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../../../node_modules/css-loader/index.js??ref--1-1!./CardsSection.css", function() {
		var newContent = require("!!../../../../node_modules/css-loader/index.js??ref--1-1!./CardsSection.css");

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

/***/ "X1Fc":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(false);
// imports


// module
exports.push([module.i, ".bingo-background {\n  width: 100vw;\n  height: 100vh;\n  background: url('/static/assets/background.svg');\n  background-size: cover;\n  padding: 2rem 4.5rem;\n  display: flex;\n}\n\n.bingo-background__panel {\n  background: rgba(0, 0, 0, .20);\n  border-radius: 9px;\n  flex: 1;\n  display: grid;\n  grid-auto-columns: 1fr;\n  grid-template-columns: 1fr 1fr;\n}\n\n.bingo-background__panel--without-grid {\n  background: rgba(0, 0, 0, .20);\n  border-radius: 9px;\n  flex: 1;\n}", ""]);

// exports


/***/ }),

/***/ "XwLF":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__("GiK3");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__("RH2O");

var _index = __webpack_require__("cl7k");

var _socket = __webpack_require__("ITBa");

var _cards = __webpack_require__("gx/J");

__webpack_require__("S7kE");

var _Background = __webpack_require__("prCc");

var _Background2 = _interopRequireDefault(_Background);

var _Card = __webpack_require__("6f/o");

var _Card2 = _interopRequireDefault(_Card);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CardsSection = function (_Component) {
  _inherits(CardsSection, _Component);

  function CardsSection() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, CardsSection);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CardsSection.__proto__ || Object.getPrototypeOf(CardsSection)).call.apply(_ref, [this].concat(args))), _this), _this.renderCards = function () {
      var cards = [];
      var gameHistory = _this.props.gameHistory;

      var endIndex = gameHistory.length > 16 ? gameHistory.length - 16 : 0;

      if (gameHistory.length > 16) {
        for (var index = 0; index < endIndex; index++) {
          var card = gameHistory[index];

          var imageRef = _cards.cardList[card].image;
          cards.push(_react2.default.createElement(_Card2.default, {
            key: 'card_img_' + index,
            cover: 'contain',
            width: '12rem',
            height: '17rem',
            img: '/static/assets/' + imageRef,
            scale: 1,
            isRecentCard: true
          }));
        }
      }

      return cards;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(CardsSection, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      _socket.socket.on('BINGO_CONECTED', function (data) {
        console.log(data);
        _this2.props.onSetGameHistory(data.gameHistory);
      });

      _socket.socket.on('DRAW_CARD', function (data) {
        _this2.props.onSetGameHistory(data.turn.gameHistory);
      });

      _socket.socket.on('USER_WON', function () {
        _this2.props.onSetGameHistory([]);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var cards = this.renderCards();

      return _react2.default.createElement(
        _Background2.default,
        null,
        _react2.default.createElement(
          'div',
          { className: 'cards-section' },
          cards
        )
      );
    }
  }]);

  return CardsSection;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state) {
  return {
    gameHistory: state.bng.history
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    onSetGameHistory: function onSetGameHistory(gameHistory) {
      return dispatch((0, _index.setGameHistory)(gameHistory));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(CardsSection);

// TV SIZE
//width='13rem' 
//height='20rem'

// LAPTOP SIZE 
//width='10rem' 
//height='15rem'

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

/***/ "viWZ":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(false);
// imports


// module
exports.push([module.i, ".card-item {\n  border: 0.5rem solid #fff;\n  border-radius: 9px;\n}\n\n@media screen and ( max-width: 1400px ) {\n  .card-item-responsive {\n    /* width: 18rem !important;\n    height: 27rem !important; */\n  }\n\n  .card-item--recent-card {\n    width: 10rem !important;\n    height: 15rem !important;\n  }\n}", ""]);

// exports


/***/ })

});