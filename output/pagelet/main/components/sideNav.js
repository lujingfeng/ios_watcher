define('pagelet/main/components/sideNav.jsx', function(require, exports, module) {

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
      return {};
    },
  
    componentDidMount: function componentDidMount() {},
  
    componentWillUnmount: function componentWillUnmount() {},
  
    onStateChange: function onStateChange(state) {},
  
    render: function render() {
  
      return _react2["default"].createElement(
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
            null,
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
            null,
            _react2["default"].createElement("i", { className: "icon" }),
            "退出"
          )
        )
      );
    }
  });
  
  exports["default"] = SideNav;
  module.exports = exports["default"];

});
