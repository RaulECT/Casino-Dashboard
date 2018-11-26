webpackJsonp([4],{

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

/***/ "WXOX":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__("GiK3");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__("RH2O");

var _Card = __webpack_require__("6f/o");

var _Card2 = _interopRequireDefault(_Card);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WinnerSection = function (_Component) {
  _inherits(WinnerSection, _Component);

  function WinnerSection() {
    _classCallCheck(this, WinnerSection);

    return _possibleConstructorReturn(this, (WinnerSection.__proto__ || Object.getPrototypeOf(WinnerSection)).apply(this, arguments));
  }

  _createClass(WinnerSection, [{
    key: 'render',
    value: function render() {
      console.log(this.props);
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'h1',
          null,
          '!FELICIDADES! HAY UN GANADOR'
        ),
        _react2.default.createElement(_Card2.default, {
          img: '/static/assets/' + this.props.history.location.state.card.image
        })
      );
    }
  }]);

  return WinnerSection;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state) {
  return {
    card: state.bng.currentCard
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(WinnerSection);

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