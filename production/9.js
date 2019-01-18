webpackJsonp([9],{

/***/ "WpDg":
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

var _CasinosTable = __webpack_require__("xfkh");

var _CasinosTable2 = _interopRequireDefault(_CasinosTable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CasinoList = function (_Component) {
  _inherits(CasinoList, _Component);

  function CasinoList() {
    _classCallCheck(this, CasinoList);

    return _possibleConstructorReturn(this, (CasinoList.__proto__ || Object.getPrototypeOf(CasinoList)).apply(this, arguments));
  }

  _createClass(CasinoList, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.props.onGetAllCasinos();
    }
  }, {
    key: 'render',
    value: function render() {

      return _react2.default.createElement(
        _react.Fragment,
        null,
        _react2.default.createElement(_CasinosTable2.default, {
          casinos: this.props.casinos
        })
      );
    }
  }]);

  return CasinoList;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state) {
  return {
    loading: state.cas.loading,
    error: state.cas.error,
    casinos: state.cas.casinos
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    onGetAllCasinos: function onGetAllCasinos() {
      return dispatch((0, _index.getAllCasinos)());
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(CasinoList);

/***/ }),

/***/ "xfkh":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__("GiK3");

var _react2 = _interopRequireDefault(_react);

var _antd = __webpack_require__("nFWT");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CasinosTable = function (_Component) {
  _inherits(CasinosTable, _Component);

  function CasinosTable() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, CasinosTable);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CasinosTable.__proto__ || Object.getPrototypeOf(CasinosTable)).call.apply(_ref, [this].concat(args))), _this), _this.getColumns = function () {
      return [{
        title: 'Nombre',
        key: 'name',
        dataIndex: 'name'
      }, {
        title: 'Dirección',
        key: 'address',
        dataIndex: 'address'
      }, {
        title: 'Teléfono',
        key: 'phone',
        dataIndex: 'phone'
      }];
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(CasinosTable, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_antd.Table, {
        columns: this.getColumns(),
        dataSource: this.props.casinos
      });
    }
  }]);

  return CasinosTable;
}(_react.Component);

exports.default = CasinosTable;

/***/ })

});