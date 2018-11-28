webpackJsonp([2],{

/***/ "/lIq":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _warning = __webpack_require__("vNba");

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var warned = {};

exports['default'] = function (valid, message) {
    if (!valid && !warned[message]) {
        (0, _warning2['default'])(false, message);
        warned[message] = true;
    }
};

module.exports = exports['default'];

/***/ }),

/***/ "6Tso":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__("GiK3");

var _react2 = _interopRequireDefault(_react);

var _antd = __webpack_require__("nFWT");

__webpack_require__("rZbN");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PageHeader = function (_Component) {
  _inherits(PageHeader, _Component);

  function PageHeader() {
    _classCallCheck(this, PageHeader);

    return _possibleConstructorReturn(this, (PageHeader.__proto__ || Object.getPrototypeOf(PageHeader)).apply(this, arguments));
  }

  _createClass(PageHeader, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return nextProps.title !== this.props.title;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'page-header' },
        _react2.default.createElement(
          _antd.Breadcrumb,
          { className: 'breadcrumb' },
          _react2.default.createElement(
            _antd.Breadcrumb.Item,
            null,
            'Dashboard'
          ),
          this.props.path.map(function (item, index) {
            return _react2.default.createElement(
              _antd.Breadcrumb.Item,
              { key: index },
              item
            );
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'detail' },
          _react2.default.createElement(
            'div',
            { className: 'main' },
            _react2.default.createElement(
              'div',
              { className: 'row' },
              _react2.default.createElement(
                'h1',
                { className: 'title' },
                ' ',
                this.props.title,
                ' '
              )
            )
          )
        )
      );
    }
  }]);

  return PageHeader;
}(_react.Component);

exports.default = PageHeader;

/***/ }),

/***/ "BiMA":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(false);
// imports


// module
exports.push([module.i, ".page-header {\n  background: #fff;\n  padding: 16px 32px 0;\n  border-bottom: 1px solid #e8e8e8;\n}\n\n.page-header .breadcrumb {\n  margin-bottom: 16px;\n}\n\n.page-header .detail {\n  display: flex;\n}\n\n.page-header .main {\n  flex: auto;\n}\n\n.page-header .row {\n  display: flex;\n}\n\n.title {\n  font-weight: 500;\n  color: rgba(0,0,0,.85);\n}\n", ""]);

// exports


/***/ }),

/***/ "EfE8":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.svgBaseProps = undefined;

var _defineProperty2 = __webpack_require__("bOdI");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

exports.getThemeFromTypeName = getThemeFromTypeName;
exports.removeTypeTheme = removeTypeTheme;
exports.withThemeSuffix = withThemeSuffix;

var _warning = __webpack_require__("/lIq");

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// These props make sure that the SVG behaviours like general text.
// Reference: https://blog.prototypr.io/align-svg-icons-to-text-and-say-goodbye-to-font-icons-d44b3d7b26b4
var svgBaseProps = exports.svgBaseProps = (0, _defineProperty3["default"])({
    width: "1em",
    height: "1em",
    fill: "currentColor"
}, "aria-hidden", "true");
var fillTester = /-fill$/;
var outlineTester = /-o$/;
var twoToneTester = /-twotone$/;
function getThemeFromTypeName(type) {
    var result = null;
    if (fillTester.test(type)) {
        result = "filled";
    } else if (outlineTester.test(type)) {
        result = "outlined";
    } else if (twoToneTester.test(type)) {
        result = "twoTone";
    }
    return result;
}
function removeTypeTheme(type) {
    return type.replace(fillTester, "").replace(outlineTester, "").replace(twoToneTester, "");
}
function withThemeSuffix(type, theme) {
    var result = type;
    if (theme === "filled") {
        result += "-fill";
    } else if (theme === "outlined") {
        result += "-o";
    } else if (theme === "twoTone") {
        result += "-twotone";
    } else {
        (0, _warning2["default"])(false, "This icon '" + type + "' has unknown theme '" + theme + "'");
    }
    return result;
}

/***/ }),

/***/ "M42p":
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__("aR/k");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__("MTIv")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../../../node_modules/css-loader/index.js??ref--1-1!./GlobalHeader.css", function() {
		var newContent = require("!!../../../../node_modules/css-loader/index.js??ref--1-1!./GlobalHeader.css");

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

/***/ "Q3ZY":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = __webpack_require__("bOdI");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends2 = __webpack_require__("Dd8w");

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = __webpack_require__("Zrlr");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__("wxAW");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__("zwoO");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__("Pf15");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__("GiK3");

var React = _interopRequireWildcard(_react);

var _reactLifecyclesCompat = __webpack_require__("R8mX");

var _classnames = __webpack_require__("HW6M");

var _classnames2 = _interopRequireDefault(_classnames);

var _omit = __webpack_require__("JkBm");

var _omit2 = _interopRequireDefault(_omit);

var _propTypes = __webpack_require__("KSGD");

var PropTypes = _interopRequireWildcard(_propTypes);

var _icon = __webpack_require__("vgHw");

var _icon2 = _interopRequireDefault(_icon);

var _isNumeric = __webpack_require__("m9c7");

var _isNumeric2 = _interopRequireDefault(_isNumeric);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var __rest = undefined && undefined.__rest || function (s, e) {
    var t = {};
    for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    }if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
    }return t;
};
// matchMedia polyfill for
// https://github.com/WickyNilliams/enquire.js/issues/82
if (typeof window !== 'undefined') {
    var matchMediaPolyfill = function matchMediaPolyfill(mediaQuery) {
        return {
            media: mediaQuery,
            matches: false,
            addListener: function addListener() {},
            removeListener: function removeListener() {}
        };
    };
    window.matchMedia = window.matchMedia || matchMediaPolyfill;
}

var dimensionMap = {
    xs: '480px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
    xxl: '1600px'
};
var generateId = function () {
    var i = 0;
    return function () {
        var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

        i += 1;
        return '' + prefix + i;
    };
}();

var Sider = function (_React$Component) {
    (0, _inherits3['default'])(Sider, _React$Component);

    function Sider(props) {
        (0, _classCallCheck3['default'])(this, Sider);

        var _this = (0, _possibleConstructorReturn3['default'])(this, (Sider.__proto__ || Object.getPrototypeOf(Sider)).call(this, props));

        _this.responsiveHandler = function (mql) {
            _this.setState({ below: mql.matches });
            var onBreakpoint = _this.props.onBreakpoint;

            if (onBreakpoint) {
                onBreakpoint(mql.matches);
            }
            if (_this.state.collapsed !== mql.matches) {
                _this.setCollapsed(mql.matches, 'responsive');
            }
        };
        _this.setCollapsed = function (collapsed, type) {
            if (!('collapsed' in _this.props)) {
                _this.setState({
                    collapsed: collapsed
                });
            }
            var onCollapse = _this.props.onCollapse;

            if (onCollapse) {
                onCollapse(collapsed, type);
            }
        };
        _this.toggle = function () {
            var collapsed = !_this.state.collapsed;
            _this.setCollapsed(collapsed, 'clickTrigger');
        };
        _this.belowShowChange = function () {
            _this.setState({ belowShow: !_this.state.belowShow });
        };
        _this.uniqueId = generateId('ant-sider-');
        var matchMedia = void 0;
        if (typeof window !== 'undefined') {
            matchMedia = window.matchMedia;
        }
        if (matchMedia && props.breakpoint && props.breakpoint in dimensionMap) {
            _this.mql = matchMedia('(max-width: ' + dimensionMap[props.breakpoint] + ')');
        }
        var collapsed = void 0;
        if ('collapsed' in props) {
            collapsed = props.collapsed;
        } else {
            collapsed = props.defaultCollapsed;
        }
        _this.state = {
            collapsed: collapsed,
            below: false
        };
        return _this;
    }

    (0, _createClass3['default'])(Sider, [{
        key: 'getChildContext',
        value: function getChildContext() {
            return {
                siderCollapsed: this.state.collapsed,
                collapsedWidth: this.props.collapsedWidth
            };
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (this.mql) {
                this.mql.addListener(this.responsiveHandler);
                this.responsiveHandler(this.mql);
            }
            if (this.context.siderHook) {
                this.context.siderHook.addSider(this.uniqueId);
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.mql) {
                this.mql.removeListener(this.responsiveHandler);
            }
            if (this.context.siderHook) {
                this.context.siderHook.removeSider(this.uniqueId);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _classNames;

            var _a = this.props,
                prefixCls = _a.prefixCls,
                className = _a.className,
                theme = _a.theme,
                collapsible = _a.collapsible,
                reverseArrow = _a.reverseArrow,
                trigger = _a.trigger,
                style = _a.style,
                width = _a.width,
                collapsedWidth = _a.collapsedWidth,
                others = __rest(_a, ["prefixCls", "className", "theme", "collapsible", "reverseArrow", "trigger", "style", "width", "collapsedWidth"]);
            var divProps = (0, _omit2['default'])(others, ['collapsed', 'defaultCollapsed', 'onCollapse', 'breakpoint', 'onBreakpoint']);
            var rawWidth = this.state.collapsed ? collapsedWidth : width;
            // use "px" as fallback unit for width
            var siderWidth = (0, _isNumeric2['default'])(rawWidth) ? rawWidth + 'px' : String(rawWidth);
            // special trigger when collapsedWidth == 0
            var zeroWidthTrigger = parseFloat(String(collapsedWidth || 0)) === 0 ? React.createElement(
                'span',
                { onClick: this.toggle, className: prefixCls + '-zero-width-trigger' },
                React.createElement(_icon2['default'], { type: 'bars' })
            ) : null;
            var iconObj = {
                'expanded': reverseArrow ? React.createElement(_icon2['default'], { type: 'right' }) : React.createElement(_icon2['default'], { type: 'left' }),
                'collapsed': reverseArrow ? React.createElement(_icon2['default'], { type: 'left' }) : React.createElement(_icon2['default'], { type: 'right' })
            };
            var status = this.state.collapsed ? 'collapsed' : 'expanded';
            var defaultTrigger = iconObj[status];
            var triggerDom = trigger !== null ? zeroWidthTrigger || React.createElement(
                'div',
                { className: prefixCls + '-trigger', onClick: this.toggle, style: { width: siderWidth } },
                trigger || defaultTrigger
            ) : null;
            var divStyle = (0, _extends3['default'])({}, style, { flex: '0 0 ' + siderWidth, maxWidth: siderWidth, minWidth: siderWidth, width: siderWidth });
            var siderCls = (0, _classnames2['default'])(className, prefixCls, prefixCls + '-' + theme, (_classNames = {}, (0, _defineProperty3['default'])(_classNames, prefixCls + '-collapsed', !!this.state.collapsed), (0, _defineProperty3['default'])(_classNames, prefixCls + '-has-trigger', collapsible && trigger !== null && !zeroWidthTrigger), (0, _defineProperty3['default'])(_classNames, prefixCls + '-below', !!this.state.below), (0, _defineProperty3['default'])(_classNames, prefixCls + '-zero-width', parseFloat(siderWidth) === 0), _classNames));
            return React.createElement(
                'div',
                (0, _extends3['default'])({ className: siderCls }, divProps, { style: divStyle }),
                React.createElement(
                    'div',
                    { className: prefixCls + '-children' },
                    this.props.children
                ),
                collapsible || this.state.below && zeroWidthTrigger ? triggerDom : null
            );
        }
    }], [{
        key: 'getDerivedStateFromProps',
        value: function getDerivedStateFromProps(nextProps) {
            if ('collapsed' in nextProps) {
                return {
                    collapsed: nextProps.collapsed
                };
            }
            return null;
        }
    }]);
    return Sider;
}(React.Component);

Sider.__ANT_LAYOUT_SIDER = true;
Sider.defaultProps = {
    prefixCls: 'ant-layout-sider',
    collapsible: false,
    defaultCollapsed: false,
    reverseArrow: false,
    width: 200,
    collapsedWidth: 80,
    style: {},
    theme: 'dark'
};
Sider.childContextTypes = {
    siderCollapsed: PropTypes.bool,
    collapsedWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};
Sider.contextTypes = {
    siderHook: PropTypes.object
};
(0, _reactLifecyclesCompat.polyfill)(Sider);
exports['default'] = Sider;
module.exports = exports['default'];

/***/ }),

/***/ "Z/iH":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setTwoToneColor = setTwoToneColor;
exports.getTwoToneColor = getTwoToneColor;

var _iconsReact = __webpack_require__("NNZT");

var _iconsReact2 = _interopRequireDefault(_iconsReact);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function setTwoToneColor(primaryColor) {
    return _iconsReact2['default'].setTwoToneColors({
        primaryColor: primaryColor
    });
}
function getTwoToneColor() {
    var colors = _iconsReact2['default'].getTwoToneColors();
    return colors.primaryColor;
}

/***/ }),

/***/ "aR/k":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(false);
// imports


// module
exports.push([module.i, "/* DASBOARD STYLE */\n.dashboard-layout{\n  height: 100vh;\n}\n\n.sider {\n  min-height: 100vh;\n  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);\n  position: relative;\n  z-index: 10;\n}\n\n.logo {\n  margin-top: 0 !important;\n  height: 64px;\n  position: relative;\n  line-height: 64px;\n  padding-left: 24px;\n  transition: all 0.3s;\n  background: #002140;\n  overflow: hidden;\n}\n\n.logo h1 {\n  color: white;\n  display: inline-block;\n  vertical-align: middle;\n  font-size: 20px;\n  margin: 0 0 0 12px;\n  font-family: 'Myriad Pro', 'Helvetica Neue', Arial, Helvetica, sans-serif;\n  font-weight: 600;\n}\n\n.logo img {\n  display: inline-block;\n  vertical-align: middle;\n  height: 32px;\n}\n\n.dashboard-header{\n  background: #FFFFFF !important;\n  height: 64px !important;\n  box-shadow: 0 1px 4px rgba(0, 21, 41, .08);\n  position: relative;\n  padding: 0 12px 0 0 !important;\n}\n\n.header-right-menu {\n  float: right;\n  height: 100%;\n}\n\n.header-right-menu .action {\n  cursor: pointer;\n  padding: 0 12px;\n  display: inline-block;\n  transition: all .3s;\n  height: 100%;\n}\n\n.header-right-menu .action > i {\n  font-size: 16px;\n  vertical-align: middle;\n  color: rgba(0,0,0,.65);\n}\n\n.header-right-menu .action:hover {\n  background: #e6f7ff;\n}\n\n.header-right-menu .account .avatar {\n  margin: 20px 8px 20px 0;\n  vertical-align: middle;\n}\n\n.user-menu .anticon {\n  margin-right: 8px;\n}\n\n.user-menu .ant-dropdown-menu-item {\n  width: 160px;\n}\n\ni.trigger {\n  font-size: 20px;\n  line-height: 64px;\n  cursor: pointer;\n  transition: all .3s, padding 0s;\n  padding: 0 24px;\n}\n\n.trigger:hover {\n  background: #e6f7ff;\n}\n\n.dashboard-header h1 {\n  float: right;\n  color: rgba(0,0,0,.25);\n}\n\n.dashboard-content {\n  margin: 24px 16px;\n  padding: 24px;\n  background: #FFFFFF;\n}\n\n.logo {\n  color: #ffffff;\n  padding: 10px 15px;\n  margin-top: 20px;\n  margin-bottom: 20px;\n}\n\n.login-error-message {\n  color: red;\n  margin: 0;\n}\n\n.data-table {\n  margin-top: 20px;\n}\n\n.logout-icon {\n  font-size: 20px;\n  margin-left: 20px;\n}\n\n/* TEST ANIMATIONS */\n.example-enter {\n  opacity: 0.01;\n}\n\n.example-enter.example-enter-active {\n  opacity: 1;\n  transition: opacity 500ms ease-in;\n}\n\n.example-leave {\n  opacity: 1;\n}\n\n.example-leave.example-leave-active {\n  opacity: 0.01;\n  transition: opacity 300ms ease-in;\n}\n\n/* CHIP SECTION */\n\n.chip-container {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n}\n\n.chip-form {\n  margin-top: 20px !important;\n}\n\n.chip-image {\n  width: 97px;\n}\n\n.chip-form .ant-form-item-label, .chip-form .ant-form-item-control-wrapper {\n  display: inline-block;\n}\n\n\n/* Mobile View */\n@media(max-width: 768px) {\n\n  /*LOGIN*/\n  .form-section {\n    width: 90%;\n    background: transparent;\n    padding-left: 25px;\n    padding-right: 25px;\n  }\n\n  /*DASHBOARD*/\n\n  .dashboard-header .ant-divider-vertical {\n    vertical-align: unset;\n  }\n\n  .name {\n    display: none;\n  }\n\n  i.trigger {\n    padding: 0 12px;\n  }\n\n  .header-right-menu {\n    position: absolute;\n    right: 12px;\n    top: 0;\n    background: #fff;\n  }\n\n  .header-right-menu .account .avatar {\n    margin-right: 0;\n  }\n\n  .drawer {\n    position: fixed !important;\n    top: 0;\n    transition: all .8s cubic-bezier(.78,.14,.15,.86),opacity .3s cubic-bezier(.78,.14,.15,.86),box-shaow .3s cubic-bezier(.78,.14,.15,.86),-webkit-transform .3s cubic-bezier(.78,.14,.15,.86);\n    width: 100%;\n    height: 100%;\n    z-index: 9999;\n    /*pointer-events: none;*/\n    left: -256px;\n  }\n\n  .drawer-hide {\n    left: -256px;\n  }\n\n  .drawer-expanded{\n    transition: all .2s;\n    transform: translateX(256px);\n  }\n\n}", ""]);

// exports


/***/ }),

/***/ "gcjk":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__("GiK3");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__("RH2O");

var _antd = __webpack_require__("nFWT");

__webpack_require__("M42p");

var _index = __webpack_require__("cl7k");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Header = _antd.Layout.Header,
    Sider = _antd.Layout.Sider,
    Content = _antd.Layout.Content;

var GlobalHeader = function (_Component) {
  _inherits(GlobalHeader, _Component);

  function GlobalHeader() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, GlobalHeader);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = GlobalHeader.__proto__ || Object.getPrototypeOf(GlobalHeader)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      isLogOutModalShowing: false
    }, _this.showLogOutModal = function () {
      _this.setState({
        isLogOutModalShowing: !_this.state.isLogOutModalShowing
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(GlobalHeader, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return nextState.isLogOutModalShowing !== this.state.isLogOutModalShowing;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          collapsed = _props.collapsed,
          toggle = _props.toggle;

      var hoverMenu = _react2.default.createElement(
        _antd.Menu,
        { className: 'user-menu', selectedKeys: [], onClick: this.showLogOutModal },
        _react2.default.createElement(_antd.Menu.Divider, null),
        _react2.default.createElement(
          _antd.Menu.Item,
          { key: 'logout' },
          _react2.default.createElement(_antd.Icon, { type: 'logout', onClick: this.showLogOutModal }),
          'Cerrar Sesi\xF3n'
        )
      );

      return _react2.default.createElement(
        Header,
        { className: 'dashboard-header' },
        _react2.default.createElement(_antd.Icon, {
          className: 'trigger',
          type: collapsed ? 'menu-unfold' : 'menu-fold',
          onClick: toggle
        }),
        _react2.default.createElement(
          'div',
          { className: 'header-right-menu' },
          _react2.default.createElement(
            _antd.Dropdown,
            { overlay: hoverMenu },
            _react2.default.createElement(
              'span',
              { className: 'action account' },
              _react2.default.createElement(_antd.Avatar, { size: 'small', className: 'avatar', icon: 'user' })
            )
          ),
          _react2.default.createElement(
            _antd.Modal,
            {
              title: 'Cerrar Sesi\xF3n',
              visible: this.state.isLogOutModalShowing,
              onOk: function onOk() {
                return _this2.props.onLogout(_this2.props.history.push);
              },
              onCancel: this.showLogOutModal
            },
            _react2.default.createElement(
              'p',
              null,
              '\xBFDeseas cerrar sesi\xF3n?'
            )
          )
        )
      );
    }
  }]);

  return GlobalHeader;
}(_react.Component);

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    onLogout: function onLogout(push) {
      return dispatch((0, _index.logout)(push));
    }
  };
};

exports.default = (0, _reactRedux.connect)(null, mapDispatchToProps)(GlobalHeader);

/***/ }),

/***/ "m6UK":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = __webpack_require__("Dd8w");

var _extends3 = _interopRequireDefault(_extends2);

exports['default'] = create;

var _index = __webpack_require__("vgHw");

var _index2 = _interopRequireDefault(_index);

var _react = __webpack_require__("GiK3");

var React = _interopRequireWildcard(_react);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var __rest = undefined && undefined.__rest || function (s, e) {
    var t = {};
    for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    }if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
    }return t;
};

var customCache = new Set();
function create() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var scriptUrl = options.scriptUrl,
        _options$extraCommonP = options.extraCommonProps,
        extraCommonProps = _options$extraCommonP === undefined ? {} : _options$extraCommonP;
    /**
     * DOM API required.
     * Make sure in browser environment.
     * The Custom Icon will create a <script/>
     * that loads SVG symbols and insert the SVG Element into the document body.
     */

    if (typeof document !== 'undefined' && typeof window !== 'undefined' && typeof document.createElement === 'function' && typeof scriptUrl === 'string' && scriptUrl.length && !customCache.has(scriptUrl)) {
        var script = document.createElement('script');
        script.setAttribute('src', 'https:' + scriptUrl);
        script.setAttribute('data-namespace', scriptUrl);
        customCache.add(scriptUrl);
        document.body.appendChild(script);
    }
    var Iconfont = function Iconfont(props) {
        var type = props.type,
            children = props.children,
            restProps = __rest(props, ["type", "children"]);
        // component > children > type


        var content = null;
        if (props.type) {
            content = React.createElement('use', { xlinkHref: '#' + type });
        }
        if (children) {
            content = children;
        }
        return React.createElement(
            _index2['default'],
            (0, _extends3['default'])({}, restProps, extraCommonProps),
            content
        );
    };
    Iconfont.displayName = 'Iconfont';
    return Iconfont;
}
module.exports = exports['default'];

/***/ }),

/***/ "m9c7":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var isNumeric = function isNumeric(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
};
exports["default"] = isNumeric;
module.exports = exports["default"];

/***/ }),

/***/ "nlX6":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__("GiK3");

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__("F8kA");

var _antd = __webpack_require__("nFWT");

var _GlobalHeader = __webpack_require__("gcjk");

var _GlobalHeader2 = _interopRequireDefault(_GlobalHeader);

var _PageHeader = __webpack_require__("6Tso");

var _PageHeader2 = _interopRequireDefault(_PageHeader);

__webpack_require__("o9VT");

var _Sider = __webpack_require__("Q3ZY");

var _Sider2 = _interopRequireDefault(_Sider);

var _routes = __webpack_require__("dth0");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SubMenu = _antd.Menu.SubMenu;

var Dashboard = function (_Component) {
  _inherits(Dashboard, _Component);

  function Dashboard(props) {
    _classCallCheck(this, Dashboard);

    var _this = _possibleConstructorReturn(this, (Dashboard.__proto__ || Object.getPrototypeOf(Dashboard)).call(this, props));

    _this.onToggle = function () {
      _this.setState(function (prevState) {
        return _extends({}, prevState, { collapsed: !prevState.collapsed });
      });
    };

    _this.changePanelHeader = function (panel) {
      var panelKey = panel.key;
      var newTitle = _this.titlesDictionary[panelKey];

      _this.setState({ currentSection: newTitle });
    };

    _this.state = {
      collapsed: false,
      isMobile: false,
      currentSection: 'Control de Partida'
    };

    _this.titlesDictionary = {
      bingo_submenu_control: 'Control de Partida',
      bingo_submenu_create: 'Crear Partida',
      bingo_menu_cardboards: 'Manejo de cartones'
    };
    return _this;
  }

  _createClass(Dashboard, [{
    key: 'render',
    value: function render() {

      return _react2.default.createElement(
        _antd.Layout,
        { className: 'dashboard-layout' },
        _react2.default.createElement(
          _Sider2.default,
          {
            trigger: null,
            breakpoint: 'lg',
            width: 256,
            collapsible: true,
            collapsed: this.state.collapsed,
            className: this.state.collapsed ? 'sider drawer drawer-hide' : 'sider drawer drawer-expanded'
          },
          _react2.default.createElement(
            'div',
            { className: 'logo' },
            _react2.default.createElement(
              'h1',
              null,
              'Bingo'
            )
          ),
          _react2.default.createElement(
            _antd.Menu,
            {
              theme: 'dark',
              mode: 'inline',
              style: { padding: '16px 0', width: '100%' },
              onSelect: this.changePanelHeader
            },
            _react2.default.createElement(
              SubMenu,
              {
                key: 'bingo_submenu',
                title: _react2.default.createElement(
                  'span',
                  null,
                  _react2.default.createElement(_antd.Icon, { type: 'crown' }),
                  _react2.default.createElement(
                    'span',
                    null,
                    'Bingo'
                  )
                )
              },
              _react2.default.createElement(
                _antd.Menu.Item,
                { key: 'bingo_submenu_control' },
                _react2.default.createElement(
                  _reactRouterDom.Link,
                  { to: '/dashboard/game_control' },
                  'Control de partida'
                )
              ),
              _react2.default.createElement(
                _antd.Menu.Item,
                { key: 'bingo_submenu_create' },
                _react2.default.createElement(
                  _reactRouterDom.Link,
                  { to: '/dashboard/create_game' },
                  'Crear partida'
                )
              )
            ),
            _react2.default.createElement(
              _antd.Menu.Item,
              { key: 'bingo_menu_cardboards' },
              _react2.default.createElement(
                _reactRouterDom.Link,
                { to: '/dashboard/cardboard_managment' },
                _react2.default.createElement(_antd.Icon, { type: 'barcode' }),
                _react2.default.createElement(
                  'span',
                  null,
                  'Cartones'
                )
              )
            )
          )
        ),
        _react2.default.createElement(
          _antd.Layout,
          null,
          _react2.default.createElement(_GlobalHeader2.default, {
            toggle: this.onToggle,
            collapsed: this.state.collapsed,
            history: this.props.history
          }),
          _react2.default.createElement(_PageHeader2.default, {
            path: [this.state.currentSection],
            title: this.state.currentSection
          }),
          _react2.default.createElement(
            'div',
            { className: 'dashboard-content' },
            _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/dashboard/game_control', component: _routes.GameControl }),
            _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/dashboard/create_game', component: _routes.CreateGame }),
            _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/dashboard/cardboard_managment', component: _routes.CardboardManagment }),
            _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/', component: _routes.GameControl })
          )
        )
      );
    }
  }]);

  return Dashboard;
}(_react.Component);

exports.default = Dashboard;

/***/ }),

/***/ "o9VT":
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__("unDR");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__("MTIv")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../../../node_modules/css-loader/index.js??ref--1-1!./Dashboard.css", function() {
		var newContent = require("!!../../../../node_modules/css-loader/index.js??ref--1-1!./Dashboard.css");

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

/***/ "rZbN":
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__("BiMA");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__("MTIv")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../../../node_modules/css-loader/index.js??ref--1-1!./PageHeader.css", function() {
		var newContent = require("!!../../../../node_modules/css-loader/index.js??ref--1-1!./PageHeader.css");

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

/***/ "unDR":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(false);
// imports


// module
exports.push([module.i, "/* DASBOARD STYLE */\n.dashboard-layout{\n  height: 100vh;\n}\n\n.sider {\n  min-height: 100vh;\n  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);\n  position: relative;\n  z-index: 10;\n}\n\n.logo {\n  margin-top: 0 !important;\n  height: 64px;\n  position: relative;\n  line-height: 64px;\n  padding-left: 24px;\n  transition: all 0.3s;\n  background: #002140;\n  overflow: hidden;\n}\n\n.logo h1 {\n  color: white;\n  display: inline-block;\n  vertical-align: middle;\n  font-size: 20px;\n  margin: 0 0 0 12px;\n  font-family: 'Myriad Pro', 'Helvetica Neue', Arial, Helvetica, sans-serif;\n  font-weight: 600;\n}\n\n.logo img {\n  display: inline-block;\n  vertical-align: middle;\n  height: 32px;\n}\n\n.dashboard-header{\n  background: #FFFFFF !important;\n  height: 64px !important;\n  box-shadow: 0 1px 4px rgba(0, 21, 41, .08);\n  position: relative;\n  padding: 0 12px 0 0 !important;\n}\n\n.header-right-menu {\n  float: right;\n  height: 100%;\n}\n\n.header-right-menu .action {\n  cursor: pointer;\n  padding: 0 12px;\n  display: inline-block;\n  transition: all .3s;\n  height: 100%;\n}\n\n.header-right-menu .action > i {\n  font-size: 16px;\n  vertical-align: middle;\n  color: rgba(0,0,0,.65);\n}\n\n.header-right-menu .action:hover {\n  background: #e6f7ff;\n}\n\n.header-right-menu .account .avatar {\n  margin: 20px 8px 20px 0;\n  vertical-align: middle;\n}\n\n.user-menu .anticon {\n  margin-right: 8px;\n}\n\n.user-menu .ant-dropdown-menu-item {\n  width: 160px;\n}\n\ni.trigger {\n  font-size: 20px;\n  line-height: 64px;\n  cursor: pointer;\n  transition: all .3s, padding 0s;\n  padding: 0 24px;\n}\n\n.trigger:hover {\n  background: #e6f7ff;\n}\n\n.dashboard-header h1 {\n  float: right;\n  color: rgba(0,0,0,.25);\n}\n\n.dashboard-content {\n  margin: 24px 16px;\n  padding: 24px;\n  background: #FFFFFF;\n}\n\n.logo {\n  color: #ffffff;\n  padding: 10px 15px;\n  margin-top: 20px;\n  margin-bottom: 20px;\n}\n\n.login-error-message {\n  color: red;\n  margin: 0;\n}\n\n.data-table {\n  margin-top: 20px;\n}\n\n.logout-icon {\n  font-size: 20px;\n  margin-left: 20px;\n}\n\n/* TEST ANIMATIONS */\n.example-enter {\n  opacity: 0.01;\n}\n\n.example-enter.example-enter-active {\n  opacity: 1;\n  transition: opacity 500ms ease-in;\n}\n\n.example-leave {\n  opacity: 1;\n}\n\n.example-leave.example-leave-active {\n  opacity: 0.01;\n  transition: opacity 300ms ease-in;\n}\n\n/* CHIP SECTION */\n\n.chip-container {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n}\n\n.chip-form {\n  margin-top: 20px !important;\n}\n\n.chip-image {\n  width: 97px;\n}\n\n.chip-form .ant-form-item-label, .chip-form .ant-form-item-control-wrapper {\n  display: inline-block;\n}\n\n\n/* Mobile View */\n@media(max-width: 768px) {\n\n  /*LOGIN*/\n  .form-section {\n    width: 90%;\n    background: transparent;\n    padding-left: 25px;\n    padding-right: 25px;\n  }\n\n  /*DASHBOARD*/\n\n  .dashboard-header .ant-divider-vertical {\n    vertical-align: unset;\n  }\n\n  .name {\n    display: none;\n  }\n\n  i.trigger {\n    padding: 0 12px;\n  }\n\n  .header-right-menu {\n    position: absolute;\n    right: 12px;\n    top: 0;\n    background: #fff;\n  }\n\n  .header-right-menu .account .avatar {\n    margin-right: 0;\n  }\n\n  .drawer {\n    position: fixed !important;\n    top: 0;\n    transition: all .8s cubic-bezier(.78,.14,.15,.86),opacity .3s cubic-bezier(.78,.14,.15,.86),box-shaow .3s cubic-bezier(.78,.14,.15,.86),-webkit-transform .3s cubic-bezier(.78,.14,.15,.86);\n    width: 100%;\n    height: 100%;\n    z-index: 9999;\n    /*pointer-events: none;*/\n    left: -256px;\n  }\n\n  .drawer-hide {\n    left: -256px;\n  }\n\n  .drawer-expanded{\n    transition: all .2s;\n    transform: translateX(256px);\n  }\n\n}", ""]);

// exports


/***/ }),

/***/ "vgHw":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = __webpack_require__("Dd8w");

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = __webpack_require__("bOdI");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _toConsumableArray2 = __webpack_require__("Gu7T");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _react = __webpack_require__("GiK3");

var React = _interopRequireWildcard(_react);

var _classnames = __webpack_require__("HW6M");

var _classnames2 = _interopRequireDefault(_classnames);

var _dist = __webpack_require__("BNls");

var allIcons = _interopRequireWildcard(_dist);

var _iconsReact = __webpack_require__("NNZT");

var _iconsReact2 = _interopRequireDefault(_iconsReact);

var _IconFont = __webpack_require__("m6UK");

var _IconFont2 = _interopRequireDefault(_IconFont);

var _utils = __webpack_require__("EfE8");

var _warning = __webpack_require__("/lIq");

var _warning2 = _interopRequireDefault(_warning);

var _twoTonePrimaryColor = __webpack_require__("Z/iH");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var __rest = undefined && undefined.__rest || function (s, e) {
    var t = {};
    for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    }if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
    }return t;
};

// Initial setting
_iconsReact2['default'].add.apply(_iconsReact2['default'], (0, _toConsumableArray3['default'])(Object.keys(allIcons).map(function (key) {
    return allIcons[key];
})));
(0, _twoTonePrimaryColor.setTwoToneColor)('#1890ff');
var defaultTheme = 'outlined';
var dangerousTheme = undefined;
var Icon = function Icon(props) {
    var _classNames;

    var className = props.className,
        type = props.type,
        Component = props.component,
        viewBox = props.viewBox,
        spin = props.spin,
        children = props.children,
        theme = props.theme,
        twoToneColor = props.twoToneColor,
        restProps = __rest(props, ["className", "type", "component", "viewBox", "spin", "children", "theme", "twoToneColor"]);

    (0, _warning2['default'])(Boolean(type || Component || children), 'Icon should have `type` prop or `component` prop or `children`.');
    var classString = (0, _classnames2['default'])((_classNames = {}, (0, _defineProperty3['default'])(_classNames, 'anticon', true), (0, _defineProperty3['default'])(_classNames, 'anticon-' + type, Boolean(type)), _classNames), className);
    var svgClassString = (0, _classnames2['default'])((0, _defineProperty3['default'])({}, 'anticon-spin', !!spin || type === 'loading'));
    var innerNode = void 0;
    // component > children > type
    if (Component) {
        var innerSvgProps = (0, _extends3['default'])({}, _utils.svgBaseProps, { className: svgClassString, viewBox: viewBox });
        if (!viewBox) {
            delete innerSvgProps.viewBox;
        }
        innerNode = React.createElement(
            Component,
            innerSvgProps,
            children
        );
    }
    if (children) {
        (0, _warning2['default'])(Boolean(viewBox) || React.Children.count(children) === 1 && React.Children.only(children).type === 'use', 'Make sure that you provide correct `viewBox`' + ' prop (default `0 0 1024 1024`) to the icon.');
        var _innerSvgProps = (0, _extends3['default'])({}, _utils.svgBaseProps, { className: svgClassString });
        innerNode = React.createElement(
            'svg',
            (0, _extends3['default'])({}, _innerSvgProps, { viewBox: viewBox }),
            children
        );
    }
    if (typeof type === 'string') {
        var computedType = type;
        if (theme) {
            var alreadyHaveTheme = (0, _utils.getThemeFromTypeName)(type);
            (0, _warning2['default'])(!alreadyHaveTheme, 'This icon already has a theme \'' + alreadyHaveTheme + '\'.' + (' The prop \'theme\' ' + theme + ' will be ignored.'));
        }
        computedType = (0, _utils.withThemeSuffix)((0, _utils.removeTypeTheme)(type), dangerousTheme || theme || defaultTheme);
        innerNode = React.createElement(_iconsReact2['default'], { className: svgClassString, type: computedType, primaryColor: twoToneColor });
    }
    return React.createElement(
        'i',
        (0, _extends3['default'])({}, restProps, { className: classString }),
        innerNode
    );
};
function unstable_ChangeThemeOfIconsDangerously(theme) {
    (0, _warning2['default'])(false, 'You are using the unstable method \'Icon.unstable_ChangeThemeOfAllIconsDangerously\', ' + ('make sure that all the icons with theme \'' + theme + '\' display correctly.'));
    dangerousTheme = theme;
}
function unstable_ChangeDefaultThemeOfIcons(theme) {
    (0, _warning2['default'])(false, 'You are using the unstable method \'Icon.unstable_ChangeDefaultThemeOfIcons\', ' + ('make sure that all the icons with theme \'' + theme + '\' display correctly.'));
    defaultTheme = theme;
}
Icon.displayName = 'Icon';
Icon.createFromIconfontCN = _IconFont2['default'];
Icon.getTwoToneColor = _twoTonePrimaryColor.getTwoToneColor;
Icon.setTwoToneColor = _twoTonePrimaryColor.setTwoToneColor;
exports['default'] = Icon;
module.exports = exports['default'];

/***/ })

});