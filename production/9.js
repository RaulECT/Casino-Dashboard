webpackJsonp([9],{

/***/ "Lbz0":
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

var _CasinoForm = __webpack_require__("oxZ7");

var _CasinoForm2 = _interopRequireDefault(_CasinoForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CasinoControl = function (_Component) {
  _inherits(CasinoControl, _Component);

  function CasinoControl() {
    _classCallCheck(this, CasinoControl);

    return _possibleConstructorReturn(this, (CasinoControl.__proto__ || Object.getPrototypeOf(CasinoControl)).apply(this, arguments));
  }

  _createClass(CasinoControl, [{
    key: 'render',
    value: function render() {

      return _react2.default.createElement(
        _react.Fragment,
        null,
        _react2.default.createElement(_CasinoForm2.default, {
          loading: this.props.loading,
          onCreateCasino: this.props.onCreateCasino
        })
      );
    }
  }]);

  return CasinoControl;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state) {
  return {
    loading: state.cas.loading,
    error: state.cas.error
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    onCreateCasino: function onCreateCasino(_ref) {
      var name = _ref.name,
          address = _ref.address,
          phone = _ref.phone;
      return dispatch((0, _index.createCasino)({ name: name, phone: phone, address: address }));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(CasinoControl);

/***/ }),

/***/ "oxZ7":
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

var hasErrors = function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(function (field) {
    return fieldsError[field];
  });
};

var CasinoForm = function (_Component) {
  _inherits(CasinoForm, _Component);

  function CasinoForm() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, CasinoForm);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CasinoForm.__proto__ || Object.getPrototypeOf(CasinoForm)).call.apply(_ref, [this].concat(args))), _this), _this.handleSubmit = function (e) {
      e.preventDefault();

      _this.props.form.validateFields(function (err, values) {
        console.log(err);
        if (!err) {
          console.log('Recived values: ', values);
        }
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(CasinoForm, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.props.form.validateFields();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props$form = this.props.form,
          getFieldDecorator = _props$form.getFieldDecorator,
          getFieldsError = _props$form.getFieldsError,
          getFieldError = _props$form.getFieldError,
          isFieldTouched = _props$form.isFieldTouched;


      var casinoNameError = isFieldTouched('casinoName') && getFieldError('casinoName');
      var casinoAddressError = isFieldTouched('casinoAddress') && getFieldError('casinoAddress');
      var casinoPhoneError = isFieldTouched('casinoPhone') && getFieldError('casinoPhone');

      return _react2.default.createElement(
        _antd.Form,
        {
          layout: 'inline',
          onSubmit: this.handleSubmit
        },
        _react2.default.createElement(
          _antd.Divider,
          { orientation: 'left' },
          'Informaci\xF3n B\xE1sica'
        ),
        _react2.default.createElement(
          _antd.Form.Item,
          {
            validateStatus: casinoNameError ? 'error' : '',
            help: casinoNameError || ''
          },
          getFieldDecorator('casinoName', {
            rules: [{ required: true, message: 'Ingrese el nombre del casino!' }]
          })(_react2.default.createElement(_antd.Input, {
            prefix: _react2.default.createElement(_antd.Icon, { type: 'shop', style: { color: 'rgba(0,0,0,.25)' } }),
            placeholder: 'Nombre del casino',
            size: 'large'
          }))
        ),
        _react2.default.createElement(
          _antd.Form.Item,
          {
            validateStatus: casinoAddressError ? 'error' : '',
            help: casinoAddressError || ''
          },
          getFieldDecorator('casinoAddress', {
            rules: [{ required: true, message: 'Ingrese la dirección del casino!' }]
          })(_react2.default.createElement(_antd.Input, {
            prefix: _react2.default.createElement(_antd.Icon, { type: 'home', style: { color: 'rgba(0,0,0,.25)' } }),
            placeholder: 'Direcci\xF3n del casino',
            size: 'large'
          }))
        ),
        _react2.default.createElement(
          _antd.Form.Item,
          {
            validateStatus: casinoPhoneError ? 'error' : '',
            help: casinoPhoneError || ''
          },
          getFieldDecorator('casinoPhone', {
            rules: [{ required: true, message: 'Ingrese el telefono del casino!' }]
          })(_react2.default.createElement(_antd.Input, {
            prefix: _react2.default.createElement(_antd.Icon, { type: 'phone', style: { color: 'rgba(0,0,0,.25)' } }),
            placeholder: 'Telefono del casino',
            size: 'large'
          }))
        ),
        _react2.default.createElement(
          _antd.Form.Item,
          null,
          _react2.default.createElement(
            _antd.Button,
            {
              type: 'primary',
              htmlType: 'submit',
              size: 'large',
              disabled: hasErrors(getFieldsError())
            },
            'Crear Casino'
          )
        )
      );
    }
  }]);

  return CasinoForm;
}(_react.Component);

var WrappedCasinoForm = _antd.Form.create()(CasinoForm);
exports.default = WrappedCasinoForm;

/***/ })

});