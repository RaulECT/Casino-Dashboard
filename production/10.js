webpackJsonp([10],{

/***/ "fz2A":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__("GiK3");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__("RH2O");

var _moment = __webpack_require__("PJh5");

var _moment2 = _interopRequireDefault(_moment);

var _antd = __webpack_require__("nFWT");

var _index = __webpack_require__("cl7k");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormItem = _antd.Form.Item;
var Option = _antd.Select.Option;

var format = 'HH:mm';
var styles = {
  input: {
    width: '100%'
  }
};

var CreateGame = function (_Component) {
  _inherits(CreateGame, _Component);

  function CreateGame() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, CreateGame);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CreateGame.__proto__ || Object.getPrototypeOf(CreateGame)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      isSelectedDateCurrentDate: true
    }, _this.handleOnGameDateChange = function (e) {
      _this.setState({ isSelectedDateCurrentDate: !(0, _moment2.default)().isBefore(e) });
    }, _this.handleOnSubmitForm = function (e) {
      e.preventDefault();

      _this.props.form.validateFields(function (err, values) {
        if (!err) {
          console.log('Received values of form: ', values);
          var dateString = values.gameDate.format('YYYY-DD-MM');
          var hourString = values.gameHour.format('HH:mm:ss');

          values.gameDate = (0, _moment2.default)(dateString + ' ' + hourString, 'YYYY-DD-MM h:mm:ss Z').format();
          values.doublePrice = values.doublePrice * 100;
          values.electronicPrice = values.electronicPrice * 100;
          values.lineConsPrize = values.lineConsPrize * 100;
          values.linePrize = values.linePrize * 100;
          values.lotteryConsoPrize = values.lotteryConsoPrize * 100;
          values.lotteryPrize = values.lotteryPrize * 100;
          values.singlePrice = values.singlePrice * 100;
          values.triplePrice = values.triplePrice * 100;

          _this.props.onCreateGame(values, _this.props.form.resetFields);
        }
      });
    }, _this.disabledDate = function (current) {
      return current && current < (0, _moment2.default)().startOf('day');
    }, _this.disabledHours = function () {
      var isSelectedDateCurrentDate = _this.state.isSelectedDateCurrentDate;

      var currentHour = new Date().getHours();
      var hoursRange = isSelectedDateCurrentDate ? _this.range(0, currentHour) : _this.range(0, 0);

      return hoursRange;
    }, _this.disabledMinutes = function () {
      var isSelectedDateCurrentDate = _this.state.isSelectedDateCurrentDate;

      var minute = new Date().getMinutes();
      var minutesRange = isSelectedDateCurrentDate ? _this.range(0, minute) : _this.range(0, 0);

      return minutesRange;
    }, _this.disabledSeconds = function () {
      var isSelectedDateCurrentDate = _this.state.isSelectedDateCurrentDate;

      var second = new Date().getSeconds();
      var secondsRange = isSelectedDateCurrentDate ? _this.range(0, second) : _this.range(0, 0);

      return secondsRange;
    }, _this.range = function (start, end) {
      var result = [];
      for (var i = start; i < end; i++) {
        result.push(i);
      }
      return result;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(CreateGame, [{
    key: 'render',
    value: function render() {
      var getFieldDecorator = this.props.form.getFieldDecorator;


      return _react2.default.createElement(
        _antd.Form,
        { onSubmit: this.handleOnSubmitForm },
        _react2.default.createElement(
          _antd.Divider,
          { orientation: 'left' },
          'Informaci\xF3n General'
        ),
        _react2.default.createElement(
          FormItem,
          {
            label: 'Nombre del Juego:'
          },
          getFieldDecorator('gameName', {
            rules: [{
              required: true,
              message: 'Este campo no puede estar vacio y debe contener al menos 5 caracteres!',
              min: 5 }]
          })(_react2.default.createElement(_antd.Input, {
            size: 'large',
            disabled: this.props.loading,
            placeholder: 'El nombre de la p\xE1rtida debe contener al menos 5 letras...'
          }))
        ),
        _react2.default.createElement(
          FormItem,
          {
            label: 'Fecha de Juego:'
          },
          getFieldDecorator('gameDate', {
            rules: [{ required: true, message: 'Este campo no puede estar vacio!' }]
          })(_react2.default.createElement(_antd.DatePicker, {
            size: 'large',
            style: styles.input,
            disabledDate: this.disabledDate,
            disabled: this.props.loading,
            onChange: this.handleOnGameDateChange
          }))
        ),
        _react2.default.createElement(
          FormItem,
          {
            label: 'Hora de Juego:'
          },
          getFieldDecorator('gameHour', {
            rules: [{ required: true, message: 'Este campo no puede estar vacio!' }]
          })(_react2.default.createElement(_antd.TimePicker, {
            size: 'large',
            format: format,
            style: styles.input,
            disabled: this.props.loading,
            disabledHours: this.disabledHours,
            disabledMinutes: this.disabledMinutes,
            disabledSeconds: this.disabledSeconds,
            hideDisabledOptions: true
          }))
        ),
        _react2.default.createElement(
          _antd.Divider,
          { orientation: 'left' },
          'Inscripciones'
        ),
        _react2.default.createElement(
          FormItem,
          {
            label: 'Precio Sencillo:'
          },
          getFieldDecorator('singlePrice', {
            rules: [{ required: true, message: 'Este campo no puede estar vacio!' }],
            initialValue: 10
          })(_react2.default.createElement(_antd.InputNumber, {
            min: 10,
            max: 1000,
            formatter: function formatter(value) {
              return ('$ ' + value).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            },
            parser: function parser(value) {
              return value.replace(/\$\s?|(,*)/g, '');
            },
            style: styles.input,
            size: 'large',
            disabled: this.props.loading
          }))
        ),
        _react2.default.createElement(
          FormItem,
          {
            label: 'Precio Doble:'
          },
          getFieldDecorator('doublePrice', {
            rules: [{ required: true, message: 'Este campo no puede estar vacio!' }],
            initialValue: 15
          })(_react2.default.createElement(_antd.InputNumber, {
            min: 15,
            max: 1000,
            formatter: function formatter(value) {
              return ('$ ' + value).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            },
            parser: function parser(value) {
              return value.replace(/\$\s?|(,*)/g, '');
            },
            style: styles.input,
            size: 'large',
            disabled: this.props.loading
          }))
        ),
        _react2.default.createElement(
          FormItem,
          {
            label: 'Precio Triple:'
          },
          getFieldDecorator('triplePrice', {
            rules: [{ required: true, message: 'Este campo no puede estar vacio!' }],
            initialValue: 20
          })(_react2.default.createElement(_antd.InputNumber, {
            min: 1,
            max: 1000,
            formatter: function formatter(value) {
              return ('$ ' + value).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            },
            parser: function parser(value) {
              return value.replace(/\$\s?|(,*)/g, '');
            },
            style: styles.input,
            size: 'large',
            disabled: this.props.loading
          }))
        ),
        _react2.default.createElement(
          FormItem,
          {
            label: 'Precio Electronico:'
          },
          getFieldDecorator('electronicPrice', {
            rules: [{ required: true, message: 'Este campo no puede estar vacio!' }],
            initialValue: 10
          })(_react2.default.createElement(_antd.InputNumber, {
            min: 10,
            max: 1000,
            formatter: function formatter(value) {
              return ('$ ' + value).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            },
            parser: function parser(value) {
              return value.replace(/\$\s?|(,*)/g, '');
            },
            style: styles.input,
            size: 'large',
            disabled: this.props.loading
          }))
        ),
        _react2.default.createElement(
          _antd.Divider,
          { orientation: 'left' },
          'Premios'
        ),
        _react2.default.createElement(
          FormItem,
          {
            label: 'Patron de Premio de L\xEDnea:'
          },
          getFieldDecorator('linePattern', {
            rules: [{ required: true, message: 'Este campo no puede estar vacio!' }]
          })(_react2.default.createElement(
            _antd.Select,
            {
              placeholder: 'Seleccione un patron',
              size: 'large',
              disabled: this.props.loading
            },
            _react2.default.createElement(
              Option,
              { value: 'LINEA' },
              'LINEA'
            )
          ))
        ),
        _react2.default.createElement(
          FormItem,
          {
            label: 'Patron de Premio de Loter\xEDa:'
          },
          getFieldDecorator('lotteryPattern', {
            rules: [{ required: true, message: 'Este campo no puede estar vacio!' }]
          })(_react2.default.createElement(
            _antd.Select,
            {
              placeholder: 'Seleccione un patron',
              size: 'large',
              disabled: this.props.loading
            },
            _react2.default.createElement(
              Option,
              { value: 'DOBLE LINEA' },
              'DOBLE LINEA'
            )
          ))
        ),
        _react2.default.createElement(
          FormItem,
          {
            label: 'Premio de Linea:'
          },
          getFieldDecorator('linePrize', {
            rules: [{ required: true, message: 'Este campo no puede estar vacio!' }],
            initialValue: 50
          })(_react2.default.createElement(_antd.InputNumber, {
            min: 1,
            max: 1000,
            formatter: function formatter(value) {
              return ('$ ' + value).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            },
            parser: function parser(value) {
              return value.replace(/\$\s?|(,*)/g, '');
            },
            style: styles.input,
            size: 'large',
            disabled: this.props.loading
          }))
        ),
        _react2.default.createElement(
          FormItem,
          {
            label: '% Premio de Consolaci\xF3n de Linea:'
          },
          getFieldDecorator('lineConsPrize', {
            rules: [{ required: true, message: 'Este campo no puede estar vacio!' }]
          })(_react2.default.createElement(_antd.InputNumber, {
            min: 1,
            max: 100,
            style: styles.input,
            size: 'large',
            disabled: this.props.loading
          }))
        ),
        _react2.default.createElement(
          FormItem,
          {
            label: 'Premio de Loter\xEDa:'
          },
          getFieldDecorator('lotteryPrize', {
            rules: [{ required: true, message: 'Este campo no puede estar vacio!' }],
            initialValue: 150
          })(_react2.default.createElement(_antd.InputNumber, {
            min: 1,
            max: 1000,
            formatter: function formatter(value) {
              return ('$ ' + value).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            },
            parser: function parser(value) {
              return value.replace(/\$\s?|(,*)/g, '');
            },
            style: styles.input,
            size: 'large',
            disabled: this.props.loading
          }))
        ),
        _react2.default.createElement(
          FormItem,
          {
            label: '% Premio de Consolaci\xF3n de Loter\xEDa:'
          },
          getFieldDecorator('lotteryConsoPrize', {
            rules: [{ required: true, message: 'Este campo no puede estar vacio!' }]
          })(_react2.default.createElement(_antd.InputNumber, {
            min: 0,
            max: 100,
            style: styles.input,
            size: 'large',
            disabled: this.props.loading
          }))
        ),
        _react2.default.createElement(
          _antd.Button,
          {
            type: 'primary',
            size: 'large',
            htmlType: 'submit',
            icon: 'plus',
            loading: this.props.loading
          },
          'Crear Partida'
        )
      );
    }
  }]);

  return CreateGame;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state) {
  return {
    loading: state.dsh.loading,
    error: state.dsh.error
  };
};

var mapDispatchToProps = function mapDispatchToProps(disparch) {
  return {
    onCreateGame: function onCreateGame(gameInfo, onResetFields) {
      return disparch((0, _index.createGame)(gameInfo, onResetFields));
    }
  };
};

var WrappedCreateGameForm = _antd.Form.create()(CreateGame);
exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(WrappedCreateGameForm);

/***/ })

});