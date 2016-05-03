define('pagelet/main/components/side_nav.jsx', function(require, exports, module) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
  
  var _react = require("react");
  
  var _react2 = _interopRequireDefault(_react);
  
  var _staticLibReactRouter = require("reactRouter");
  
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
  
    onNav: function onNav(path) {
      this.hide();
      this.history.pushState(null, path);
    },
  
    render: function render() {
      var _this2 = this;
  
      if (!this.state.visible) {
        return null;
      }
  
      return _react2["default"].createElement(
        "div",
        { className: "c-page side-page", ref: "root", onClick: this.onMask },
        _react2["default"].createElement(
          "div",
          { className: "side-nav" },
          _react2["default"].createElement(
            "div",
            { className: "profile" },
            "123@gmail.com"
          ),
          _react2["default"].createElement(
            "ul",
            null,
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
              null,
              _react2["default"].createElement("i", { className: "icon" }),
              "七日排名上升榜"
            ),
            _react2["default"].createElement(
              "li",
              null,
              _react2["default"].createElement("i", { className: "icon" }),
              "七日排名下降榜"
            ),
            _react2["default"].createElement(
              "li",
              null,
              _react2["default"].createElement("i", { className: "icon" }),
              "关键词热度排行榜"
            ),
            _react2["default"].createElement(
              "li",
              null,
              _react2["default"].createElement("i", { className: "icon" }),
              "App关键词覆盖数"
            ),
            _react2["default"].createElement(
              "li",
              null,
              _react2["default"].createElement("i", { className: "icon" }),
              "ASO优化服务"
            )
          ),
          _react2["default"].createElement(
            "ul",
            null,
            _react2["default"].createElement(
              "li",
              null,
              _react2["default"].createElement("i", { className: "icon" }),
              "我的关注"
            )
          ),
          _react2["default"].createElement(
            "ul",
            null,
            _react2["default"].createElement(
              "li",
              null,
              _react2["default"].createElement("i", { className: "icon" }),
              "关于我们"
            ),
            _react2["default"].createElement(
              "li",
              null,
              _react2["default"].createElement(
                "a",
                { href: "tel:4006343800" },
                _react2["default"].createElement("i", { className: "icon" }),
                "400-6343-800"
              )
            ),
            _react2["default"].createElement(
              "li",
              { style: { color: "red" } },
              _react2["default"].createElement("i", { className: "icon" }),
              "退出"
            )
          )
        )
      );
    }
  });
  
  exports["default"] = SideNav;
  module.exports = exports["default"];

});
