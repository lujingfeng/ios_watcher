define('pagelet/main/components/side_nav.jsx', function(require, exports, module) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
  
  var _react = require("react");
  
  var _react2 = _interopRequireDefault(_react);
  
  var _staticLibReactRouter = require("reactRouter");
  
  var _staticMinxinsUtils = require("static/minxins/utils");
  
  var SideNav = _react2["default"].createClass({
    displayName: "SideNav",
  
    mixins: [_staticLibReactRouter.History],
  
    getInitialState: function getInitialState() {
      return {
        visible: false
      };
    },
  
    componentDidMount: function componentDidMount() {},
  
    componentWillUnmount: function componentWillUnmount() {},
  
    onStateChange: function onStateChange(state) {},
  
    show: function show() {
      var _this = this;
  
      this.setState({
        visible: true
      }, function () {
        setTimeout(function () {
          _this.refs.root.className += " visible";
        }, 20);
      });
    },
  
    hide: function hide() {
      this.setState({
        visible: false
      });
    },
  
    onMask: function onMask(e) {
      if (e.target == this.refs.root) {
        this.hide();
      }
    },
  
    onNav: function onNav(path, query) {
      this.hide();
      this.history.pushState(null, path, query);
    },
  
    onClose: function onClose(e) {
      e.stopPropagation();
      this.hide();
    },
  
    onClickLogin: function onClickLogin() {
      if (!(0, _staticMinxinsUtils.getCookie)("uname")) {
        location.replace("/check/login-page");
      }
    },
  
    onLogout: function onLogout() {
      (0, _staticMinxinsUtils.setCookie)("uname", "", 0);
      location.replace("/#/search");
      this.hide();
    },
  
    render: function render() {
      var _this2 = this;
  
      if (!this.state.visible) {
        return null;
      }
  
      var uname = (0, _staticMinxinsUtils.getCookie)("uname");
  
      return _react2["default"].createElement(
        "div",
        { className: "c-page side-page", ref: "root", onClick: this.onMask },
        _react2["default"].createElement(
          "div",
          { className: "side-nav" },
          _react2["default"].createElement(
            "div",
            { className: "profile", onClick: this.onClickLogin },
            _react2["default"].createElement("i", { className: "awatar" }),
            _react2["default"].createElement(
              "span",
              { className: "ellipsis" },
              (0, _staticMinxinsUtils.getCookie)("uname") || "登录 / 注册"
            ),
            _react2["default"].createElement("div", { className: "close", onClick: this.onClose })
          ),
          _react2["default"].createElement(
            "ul",
            { className: "nav1" },
            _react2["default"].createElement(
              "li",
              { onClick: function (e) {
                  return _this2.onNav("/toplist");
                } },
              _react2["default"].createElement("i", { className: "icon" }),
              "iOS榜单排名"
            ),
            _react2["default"].createElement(
              "li",
              { onClick: function (e) {
                  return _this2.onNav("/top7uplist");
                } },
              _react2["default"].createElement("i", { className: "icon" }),
              "七日排名上升榜"
            ),
            _react2["default"].createElement(
              "li",
              { onClick: function (e) {
                  return _this2.onNav("/top7downlist");
                } },
              _react2["default"].createElement("i", { className: "icon" }),
              "七日排名下降榜"
            ),
            _react2["default"].createElement(
              "li",
              { onClick: function (e) {
                  return _this2.onNav("/under_app_monitor");
                } },
              _react2["default"].createElement("i", { className: "icon" }),
              "下架应用监控"
            ),
            _react2["default"].createElement(
              "li",
              { onClick: function (e) {
                  return _this2.onNav("/hotkeywords");
                }, style: { display: "none" } },
              _react2["default"].createElement("i", { className: "icon" }),
              "关键词热度排行榜"
            ),
            _react2["default"].createElement(
              "li",
              { onClick: function (e) {
                  return _this2.onNav("/search/input", { overlay: true });
                }, style: { display: "none" } },
              _react2["default"].createElement("i", { className: "icon" }),
              "App关键词覆盖数"
            ),
            _react2["default"].createElement(
              "li",
              { onClick: function (e) {
                  return _this2.onNav("/aso_service");
                } },
              _react2["default"].createElement("i", { className: "icon" }),
              "ASO优化服务"
            )
          ),
          _react2["default"].createElement(
            "ul",
            null,
            _react2["default"].createElement(
              "li",
              { onClick: function (e) {
                  return _this2.onNav("/myfavlist");
                } },
              _react2["default"].createElement("i", { className: "icon fav" }),
              "我的关注"
            )
          ),
          _react2["default"].createElement(
            "ul",
            null,
            _react2["default"].createElement(
              "li",
              { onClick: function (e) {
                  return _this2.onNav("/about");
                } },
              _react2["default"].createElement("i", { className: "icon about" }),
              "关于我们"
            ),
            _react2["default"].createElement(
              "li",
              { style: { dislay: "none" } },
              _react2["default"].createElement("i", { className: "icon callin" }),
              _react2["default"].createElement(
                "a",
                { href: "tel:4006343800" },
                "400-6343-800"
              )
            ),
            uname ? _react2["default"].createElement(
              "li",
              { style: { color: "red", paddingLeft: 50 }, onClick: function (e) {
                  return _this2.props.showConfirm();
                } },
              "退出"
            ) : null
          )
        )
      );
    }
  });
  
  exports["default"] = SideNav;
  module.exports = exports["default"];

});
