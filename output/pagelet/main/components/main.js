define('pagelet/main/components/main.jsx', function(require, exports, module) {

  /**
    * @require pagelet/main/main.less
    */
  
  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
  
  var _react = require("react");
  
  var _react2 = _interopRequireDefault(_react);
  
  var _staticLibReactRouter = require("reactRouter");
  
  var _jquery = require("jquery");
  
  var _jquery2 = _interopRequireDefault(_jquery);
  
  var _staticMinxinsUtils = require("static/minxins/utils");
  
  var _side_nav = require("pagelet/main/components/side_nav.jsx");
  
  var _side_nav2 = _interopRequireDefault(_side_nav);
  
  var _pageletWidgetComponentsPopup = require("pagelet/widget/components/popup.jsx");
  
  var _pageletWidgetComponentsPopup2 = _interopRequireDefault(_pageletWidgetComponentsPopup);
  
  var MainView = _react2["default"].createClass({
    displayName: "MainView",
  
    mixins: [_staticLibReactRouter.History],
  
    getInitialState: function getInitialState() {
      var _this = this;
  
      return {
        confirmVisible: false,
        showSideNav: function showSideNav() {
          _this.refs.sideNav.show();
        },
        isLogin: function isLogin() {
          return _this.isLogin();
        }
      };
    },
  
    isLigin: function isLigin() {
      return (0, _staticMinxinsUtils.getCookie)("uname");
    },
  
    componentDidMount: function componentDidMount() {},
  
    componentWillUnmount: function componentWillUnmount() {},
  
    onStateChange: function onStateChange(state) {},
  
    renderChildren: function renderChildren() {
      return _react2["default"].Children.map(this.props.children, (function (child) {
        return _react2["default"].cloneElement(child, this.state);
      }).bind(this));
    },
  
    onTapMasker: function onTapMasker() {
      this.setState({
        confirmVisible: false
      });
    },
  
    logOut: function logOut() {
      this.refs.sideNav.onLogout();
      this.setState({
        confirmVisible: false
      });
    },
  
    showConfirm: function showConfirm() {
      this.setState({
        confirmVisible: true
      });
    },
  
    render: function render() {
  
      return _react2["default"].createElement(
        "div",
        { className: "__runtime__" },
        this.renderChildren(),
        _react2["default"].createElement(_side_nav2["default"], { ref: "sideNav", showConfirm: this.showConfirm }),
        this.state.confirmVisible ? _react2["default"].createElement(
          _pageletWidgetComponentsPopup2["default"],
          { ref: "confirm", onTapMasker: this.onTapMasker },
          _react2["default"].createElement(
            "div",
            { className: "c-confirm" },
            _react2["default"].createElement(
              "p",
              null,
              "您确认要退出登录吗？"
            ),
            _react2["default"].createElement(
              "div",
              null,
              _react2["default"].createElement(
                "button",
                { className: "btn normal", onClick: this.logOut },
                "退出"
              ),
              _react2["default"].createElement(
                "button",
                { className: "btn main-btn", onClick: this.onTapMasker },
                "取消"
              )
            )
          )
        ) : null
      );
    }
  });
  
  exports["default"] = MainView;
  module.exports = exports["default"];

});
