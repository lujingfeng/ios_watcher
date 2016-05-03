define('pagelet/appdetail/components/appinfo.jsx', function(require, exports, module) {

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
  
  var AppInfo = _react2["default"].createClass({
    displayName: "AppInfo",
  
    render: function render() {
      var query = this.props.query;
  
      return _react2["default"].createElement(
        "div",
        { className: "app-info" },
        _react2["default"].createElement(
          "table",
          null,
          _react2["default"].createElement(
            "tr",
            null,
            _react2["default"].createElement(
              "td",
              null,
              "分类："
            ),
            _react2["default"].createElement(
              "td",
              null,
              "游戏"
            )
          ),
          _react2["default"].createElement(
            "tr",
            null,
            _react2["default"].createElement(
              "td",
              null,
              "设备："
            ),
            _react2["default"].createElement(
              "td",
              null,
              "iPhone"
            )
          ),
          _react2["default"].createElement(
            "tr",
            null,
            _react2["default"].createElement(
              "td",
              null,
              "AppID:"
            ),
            _react2["default"].createElement(
              "td",
              null,
              query.appId
            )
          ),
          _react2["default"].createElement(
            "tr",
            null,
            _react2["default"].createElement(
              "td",
              null,
              "包名："
            ),
            _react2["default"].createElement(
              "td",
              null,
              query.packageName
            )
          ),
          _react2["default"].createElement(
            "tr",
            null,
            _react2["default"].createElement(
              "td",
              null,
              "当前版本："
            ),
            _react2["default"].createElement(
              "td",
              null,
              query.versionname
            )
          ),
          _react2["default"].createElement(
            "tr",
            null,
            _react2["default"].createElement(
              "td",
              null,
              "应用大小:"
            ),
            _react2["default"].createElement(
              "td",
              null,
              "2M"
            )
          ),
          _react2["default"].createElement(
            "tr",
            null,
            _react2["default"].createElement(
              "td",
              null,
              "最后更新时间:"
            ),
            _react2["default"].createElement(
              "td",
              null,
              "2014.01.12"
            )
          ),
          _react2["default"].createElement(
            "tr",
            null,
            _react2["default"].createElement(
              "td",
              null,
              "应用描述:"
            ),
            _react2["default"].createElement("td", null)
          )
        ),
        _react2["default"].createElement(
          "div",
          { className: "app-description" },
          "XXXFSDFSAFSDF",
          _react2["default"].createElement("br", null),
          "XXXFSDFSAFSDF",
          _react2["default"].createElement("br", null),
          "XXXFSDFSAFSDF",
          _react2["default"].createElement("br", null),
          "XXXFSDFSAFSDF",
          _react2["default"].createElement("br", null),
          "XXXFSDFSAFSDF",
          _react2["default"].createElement("br", null),
          "XXXFSDFSAFSDF",
          _react2["default"].createElement("br", null),
          "XXXFSDFSAFSDF",
          _react2["default"].createElement("br", null),
          "XXXFSDFSAFSDF",
          _react2["default"].createElement("br", null),
          "XXXFSDFSAFSDF",
          _react2["default"].createElement("br", null),
          "XXXFSDFSAFSDF",
          _react2["default"].createElement("br", null),
          "XXXFSDFSAFSDF",
          _react2["default"].createElement("br", null)
        )
      );
    }
  });
  
  exports["default"] = AppInfo;
  module.exports = exports["default"];

});
