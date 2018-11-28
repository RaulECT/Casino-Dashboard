webpackJsonp([1],{

/***/ "2QdF":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__("GiK3");

var _react2 = _interopRequireDefault(_react);

var _socket = __webpack_require__("ITBa");

__webpack_require__("EA78");

var _Background = __webpack_require__("prCc");

var _Background2 = _interopRequireDefault(_Background);

var _CardboardsRegisteredHeader = __webpack_require__("vdiZ");

var _CardboardsRegisteredHeader2 = _interopRequireDefault(_CardboardsRegisteredHeader);

var _CardboardItem = __webpack_require__("B7tu");

var _CardboardItem2 = _interopRequireDefault(_CardboardItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var socket = null;
var fakeData = [];
var types = ['single', 'double', 'triple'];

for (var index = 0; index < 154; index++) {
  var randomNumber = Math.floor(Math.random() * (types.length - 0)) + 0;
  fakeData.push({ numcode: 1234, type: types[randomNumber] });
}

var CardboardsRegisteredMainPage = function (_Component) {
  _inherits(CardboardsRegisteredMainPage, _Component);

  function CardboardsRegisteredMainPage() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, CardboardsRegisteredMainPage);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CardboardsRegisteredMainPage.__proto__ || Object.getPrototypeOf(CardboardsRegisteredMainPage)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      cardboards: [], //fakeData,
      test: true
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(CardboardsRegisteredMainPage, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      socket = (0, _socket.openConnection)();

      socket.emit('CONNECT_CARDBOARDS_PAGE', {});

      socket.on('CARDBOARDS_PAGE_CONNECTED', function (res) {
        _this2.setState({ cardboards: res.cardboardsRegistered });
      });

      socket.on('REGISTER_CARDBOARD', function (cardboards) {
        _this2.setState({ cardboards: cardboards });
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
      var cardboardItems = this.state.cardboards.length !== 0 ? this.state.cardboards.map(function (item, index) {
        return _react2.default.createElement(
          _CardboardItem2.default,
          { key: index, type: item.type },
          ' ',
          item.numcode,
          ' '
        );
      }) : _react2.default.createElement(
        'p',
        null,
        'No hay un juego actualmente'
      );

      return _react2.default.createElement(
        _Background2.default,
        null,
        _react2.default.createElement(_CardboardsRegisteredHeader2.default, null),
        _react2.default.createElement(
          'div',
          { className: 'cardboards-list' },
          cardboardItems
        )
      );
    }
  }]);

  return CardboardsRegisteredMainPage;
}(_react.Component);

exports.default = CardboardsRegisteredMainPage;

/***/ }),

/***/ "B7tu":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__("GiK3");

var _react2 = _interopRequireDefault(_react);

__webpack_require__("tTwb");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CardboardItem = function (_Component) {
  _inherits(CardboardItem, _Component);

  function CardboardItem() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, CardboardItem);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CardboardItem.__proto__ || Object.getPrototypeOf(CardboardItem)).call.apply(_ref, [this].concat(args))), _this), _this.getItemClasses = function () {
      var classes = ['cardboard-item'];

      switch (_this.props.type) {
        case 'SINGLE':
          classes.push('cardboard-item__single');
          break;

        case 'DOUBLE':
          classes.push('cardboard-item__double');
          break;

        case 'TRIPLE':
          classes.push('cardboard-item__triple');
          break;

        default:
          classes.push('cardboard-item__single');
          break;
      }

      return classes.join(' ');
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(CardboardItem, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      var currentNumcode = this.props.children[1];
      var nextNumcode = nextProps.children[1];

      return currentNumcode !== nextNumcode;
    }
  }, {
    key: 'render',
    value: function render() {
      var itemClasses = this.getItemClasses();

      return _react2.default.createElement(
        'p',
        { className: itemClasses },
        this.props.children
      );
    }
  }]);

  return CardboardItem;
}(_react.Component);

exports.default = CardboardItem;

/***/ }),

/***/ "BuVL":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(false);
// imports


// module
exports.push([module.i, ".cardboard-item {\n  margin-right: 2rem;\n  font-size: 3.26rem;\n  font-weight: bold;\n  margin-bottom: 1.5rem;\n  border-radius: 9px;\n}\n\n.cardboard-item__single {\n  /* color: rgba(0,0,0, .5);\n  background: rgba(255, 217, 125, .8); */\n\n  /*OPT 1*/\n  color: rgba(0, 0, 0, .8);\n  background: rgba(247, 219, 167, 1);\n\n  /*OPT 2*/\n      /* color: rgba(255, 255, 255, .9);\n    background: rgba(195, 156, 167, 1); */\n\n  /*OPT 3*/\n  /* color: rgba(0, 0, 0, .8);\n  background: rgba(247, 219, 167, 1); */\n}\n\n.cardboard-item__double {\n  /* color: rgba(255,255,255,.8);\n  background: rgba(238, 96, 85, .8); */\n\n  /*OPT 1*/\n  color: rgba(255,255,255,1);\n  background: rgba(37, 22, 5, 1);\n\n  /*OPT 2*/\n  /* color: rgba(0,0,0,.9);\n    background: rgba(255, 241, 196, 1); */\n\n  /*OPT 3*/\n  /* color: rgba(0,0,0,.8);\n  background: rgba(255, 255, 255, .9); */\n}\n\n.cardboard-item__triple {\n  /* color: rgba(0,0,0,.5);\n  background: rgba(170, 246, 131, .5); */\n\n  /*OPT 1*/\n  color: rgba(255,255,255,1);\n    background: rgba(197, 123, 67, 1);\n\n  /*OPT 2*/\n  /* color: rgba(255,255,255,1);\n    background: rgba(118, 106, 91, 1); */\n  \n  /*OPT 3*/\n  /* color: rgba(255,255,255,1);\n  background: rgba(118, 78, 45, 1); */\n}\n\n@media only screen and ( max-width: 1400px ) {\n  .cardboard-item {\n    font-size: 2.6rem;\n  }\n}", ""]);

// exports


/***/ }),

/***/ "EA78":
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__("UzG8");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__("MTIv")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../../../node_modules/css-loader/index.js??ref--1-1!./CardboardsRegisteredMainPage.css", function() {
		var newContent = require("!!../../../../node_modules/css-loader/index.js??ref--1-1!./CardboardsRegisteredMainPage.css");

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

/***/ "HOkL":
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__("TOI7");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__("MTIv")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../../../node_modules/css-loader/index.js??ref--1-1!./CardboardsRegisteredHeader.css", function() {
		var newContent = require("!!../../../../node_modules/css-loader/index.js??ref--1-1!./CardboardsRegisteredHeader.css");

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

/***/ "TOI7":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(false);
// imports


// module
exports.push([module.i, ".cardboards-registered__header {\n  background: rgba(0,0,0,.15);\n  display: flex;\n  align-items: center;\n  border-radius: 9px;\n  padding-left: 5rem;\n}\n\n.cardboards-registered__header h1 {\n  color: #ffffff;\n  font-size: 5.5rem;\n  font-weight: 100;  \n  margin-bottom: 0;\n}\n\n.cardboards-registered__header h2 {\n  color: #ffffff;\n  font-size: 4.5rem;\n  font-weight: 500;\n  margin-bottom: 0;\n}\n\n.cardboards-registered__info {\n  display: flex;\n  justify-content: space-between;\n}\n\n.cardboards-registered__description {\n  margin-left: 12rem;\n}\n\n", ""]);

// exports


/***/ }),

/***/ "UP9d":
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__("nCQZ");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__("MTIv")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../../../node_modules/css-loader/index.js??ref--1-1!./CardboardLabel.css", function() {
		var newContent = require("!!../../../../node_modules/css-loader/index.js??ref--1-1!./CardboardLabel.css");

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

/***/ "UzG8":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(false);
// imports


// module
exports.push([module.i, ".cardboards-list {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap; \n  justify-content: center;\n  margin-top: 2rem;\n}", ""]);

// exports


/***/ }),

/***/ "X1Fc":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(false);
// imports


// module
exports.push([module.i, ".bingo-background {\n  width: 100vw;\n  height: 100vh;\n  background: url('/static/assets/background.svg');\n  background-size: cover;\n  padding: 2rem 4.5rem;\n  display: flex;\n}\n\n.bingo-background__panel {\n  background: rgba(0, 0, 0, .20);\n  border-radius: 9px;\n  flex: 1;\n  display: grid;\n  grid-auto-columns: 1fr;\n  grid-template-columns: 1fr 1fr;\n}\n\n.bingo-background__panel--without-grid {\n  background: rgba(0, 0, 0, .20);\n  border-radius: 9px;\n  flex: 1;\n}", ""]);

// exports


/***/ }),

/***/ "avoj":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__("GiK3");

var _react2 = _interopRequireDefault(_react);

__webpack_require__("UP9d");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cardboardLabel = function cardboardLabel(props) {
  var text = '';
  var figureClass = ['cardboard-figure'];

  switch (props.type) {
    case 'singleLine':
      text = 'Sencillo';
      figureClass.push('cardboard-figure__single-line');
      break;

    case 'doubleLine':
      text = 'Doble';
      figureClass.push('cardboard-figure__double-line');
      break;

    case 'tripleLine':
      text = 'Triple';
      figureClass.push('cardboard-figure__triple-line');
      break;

    default:
      text = 'Sencilla';
      figureClass.push('cardboard-figure__single-line');
      break;
  }

  return _react2.default.createElement(
    'div',
    { className: 'cardboard-label__container' },
    _react2.default.createElement('div', { className: figureClass.join(' ') }),
    _react2.default.createElement(
      'p',
      null,
      text
    )
  );
};

exports.default = cardboardLabel;

/***/ }),

/***/ "hYkQ":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__("GiK3");

var _react2 = _interopRequireDefault(_react);

var _CardboardsRegisteredMainPage = __webpack_require__("2QdF");

var _CardboardsRegisteredMainPage2 = _interopRequireDefault(_CardboardsRegisteredMainPage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CradboardsRegisteredList = function (_Component) {
  _inherits(CradboardsRegisteredList, _Component);

  function CradboardsRegisteredList() {
    _classCallCheck(this, CradboardsRegisteredList);

    return _possibleConstructorReturn(this, (CradboardsRegisteredList.__proto__ || Object.getPrototypeOf(CradboardsRegisteredList)).apply(this, arguments));
  }

  _createClass(CradboardsRegisteredList, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_CardboardsRegisteredMainPage2.default, null);
    }
  }]);

  return CradboardsRegisteredList;
}(_react.Component);

exports.default = CradboardsRegisteredList;

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

/***/ "nCQZ":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(false);
// imports


// module
exports.push([module.i, ".cardboard-label__container {\n  display: flex;\n  align-items: center;\n}\n\n.cardboard-label__container p {\n  color: #fff;\n  font-size: 2.6rem;\n  margin-bottom: 0;\n}\n\n.cardboard-figure {\n  width: 2rem;\n  height: 2rem;\n  border-radius: 100%;\n  margin-right: 0.5rem;\n}\n\n.cardboard-figure__single-line {\n  /* background: rgba(255, 217, 125, .8); */\n\n  /*OPT 1*/\n  background: rgba(247, 219, 167, 1); \n}\n\n.cardboard-figure__double-line {\n  /* background: rgba(238, 96, 85, .8); */\n\n  /*OPT 1*/\n  background: rgba(37, 22, 5, 1);\n}\n\n.cardboard-figure__triple-line {\n  /* background: rgba(170, 246, 131, .5); */\n\n  /*OPT 1*/\n  background: rgba(197, 123, 67, 1); \n}", ""]);

// exports


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

/***/ "tTwb":
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__("BuVL");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__("MTIv")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../../../node_modules/css-loader/index.js??ref--1-1!./CardboardItem.css", function() {
		var newContent = require("!!../../../../node_modules/css-loader/index.js??ref--1-1!./CardboardItem.css");

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

/***/ "vdiZ":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__("GiK3");

var _react2 = _interopRequireDefault(_react);

__webpack_require__("HOkL");

var _CardboardLabel = __webpack_require__("avoj");

var _CardboardLabel2 = _interopRequireDefault(_CardboardLabel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CardboardsRegisteredHeader = function (_Component) {
  _inherits(CardboardsRegisteredHeader, _Component);

  function CardboardsRegisteredHeader() {
    _classCallCheck(this, CardboardsRegisteredHeader);

    return _possibleConstructorReturn(this, (CardboardsRegisteredHeader.__proto__ || Object.getPrototypeOf(CardboardsRegisteredHeader)).apply(this, arguments));
  }

  _createClass(CardboardsRegisteredHeader, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      return false;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'cardboards-registered__header' },
        _react2.default.createElement(
          'h1',
          null,
          '\xA1Loter\xEDa Bingo!'
        ),
        _react2.default.createElement(
          'div',
          { className: 'cardboards-registered__description' },
          _react2.default.createElement(
            'h2',
            null,
            'Cartones Registrados'
          ),
          _react2.default.createElement(
            'div',
            { className: 'cardboards-registered__info' },
            _react2.default.createElement(_CardboardLabel2.default, { type: 'singleLine' }),
            _react2.default.createElement(_CardboardLabel2.default, { type: 'doubleLine' }),
            _react2.default.createElement(_CardboardLabel2.default, { type: 'tripleLine' })
          )
        )
      );
    }
  }]);

  return CardboardsRegisteredHeader;
}(_react.Component);

exports.default = CardboardsRegisteredHeader;

/***/ })

});