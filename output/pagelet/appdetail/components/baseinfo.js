define('pagelet/appdetail/components/baseinfo.jsx', function(require, exports, module) {

  /**
    * @require pagelet/appdetail/detail.less
    */
  
  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
  
  var _react = require("react");
  
  var _react2 = _interopRequireDefault(_react);
  
  var BaseInfo = _react2["default"].createClass({
    displayName: "BaseInfo",
  
    render: function render() {
      var query = this.props.query;
      var titleWidth = window.innerWidth - 180;
  
      return _react2["default"].createElement(
        "div",
        { className: "c-app-base-info" },
        _react2["default"].createElement(
          "table",
          null,
          _react2["default"].createElement(
            "tr",
            null,
            _react2["default"].createElement(
              "td",
              null,
              _react2["default"].createElement("img", {
                src: query.icon,
                className: "app-icon" })
            ),
            _react2["default"].createElement(
              "td",
              null,
              _react2["default"].createElement(
                "p",
                { className: "title ellipsis", style: { width: titleWidth } },
                query.title
              ),
              _react2["default"].createElement(
                "p",
                { className: "f12 c666" },
                query.developer
              )
            ),
            _react2["default"].createElement(
              "td",
              null,
              _react2["default"].createElement(
                "div",
                { className: "vs" },
                _react2["default"].createElement("div", { className: "icon-vs" }),
                _react2["default"].createElement(
                  "p",
                  { className: "f12" },
                  "排名对比"
                )
              )
            ),
            _react2["default"].createElement(
              "td",
              null,
              _react2["default"].createElement(
                "div",
                { className: "fav" },
                _react2["default"].createElement("div", { className: "icon-fav fav-un" }),
                _react2["default"].createElement(
                  "p",
                  { className: "f12" },
                  "添加关注"
                )
              )
            )
          )
        )
      );
    }
  });
  
  exports["default"] = BaseInfo;
  module.exports = exports["default"];

});
