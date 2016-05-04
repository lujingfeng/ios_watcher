define('pagelet/appdetail/components/keywords.jsx', function(require, exports, module) {

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
  
  var Keywords = _react2["default"].createClass({
    displayName: "Keywords",
  
    render: function render() {
  
      return _react2["default"].createElement(
        "div",
        { className: "keywords-overide" },
        _react2["default"].createElement(
          "h5",
          { className: "title" },
          _react2["default"].createElement("i", null),
          "关键词覆盖数（共覆盖",
          _react2["default"].createElement(
            "a",
            null,
            "1286"
          ),
          "个词）"
        ),
        _react2["default"].createElement(
          "table",
          { className: "border" },
          _react2["default"].createElement(
            "tr",
            null,
            _react2["default"].createElement(
              "th",
              null,
              "关键词"
            ),
            _react2["default"].createElement(
              "th",
              { style: { width: 50 } },
              "排名"
            ),
            _react2["default"].createElement(
              "th",
              null,
              "搜索指数"
            ),
            _react2["default"].createElement(
              "th",
              null,
              "搜索结果数"
            )
          ),
          _react2["default"].createElement(
            "tr",
            null,
            _react2["default"].createElement(
              "td",
              null,
              "微信"
            ),
            _react2["default"].createElement(
              "td",
              null,
              "1"
            ),
            _react2["default"].createElement(
              "td",
              null,
              "10500"
            ),
            _react2["default"].createElement(
              "td",
              null,
              "100"
            )
          )
        )
      );
    }
  });
  
  exports["default"] = Keywords;
  module.exports = exports["default"];

});
