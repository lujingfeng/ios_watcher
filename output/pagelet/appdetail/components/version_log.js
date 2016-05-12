define('pagelet/appdetail/components/version_log', function(require, exports, module) {

  /**
    * @require pagelet/appdetail/detail.less
    */
  
  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
  
  var _actionAction = require("pagelet/appdetail/action/action");
  
  var _actionAction2 = _interopRequireDefault(_actionAction);
  
  var _storeStore = require("pagelet/appdetail/store/store");
  
  var _storeStore2 = _interopRequireDefault(_storeStore);
  
  var _react = require("react");
  
  var _react2 = _interopRequireDefault(_react);
  
  var VersionLog = _react2["default"].createClass({
    displayName: "VersionLog",
  
    componentDidMount: function componentDidMount() {
      var query = this.props.query;
  
      _actionAction2["default"].detailVersion({
        country: query.country,
        device: query.device,
        id: query.id
      });
    },
    render: function render() {
      return _react2["default"].createElement(
        "div",
        { className: "version-log" },
        _react2["default"].createElement(
          "h5",
          { className: "title" },
          _react2["default"].createElement("i", null),
          "版本记录"
        ),
        _react2["default"].createElement(
          "table",
          null,
          _react2["default"].createElement(
            "tr",
            null,
            _react2["default"].createElement(
              "th",
              null,
              "版本"
            ),
            _react2["default"].createElement(
              "th",
              { style: { width: 100 } },
              "更新时间"
            ),
            _react2["default"].createElement(
              "th",
              null,
              "更新说明"
            )
          ),
          _react2["default"].createElement(
            "tr",
            null,
            _react2["default"].createElement(
              "td",
              null,
              "6.2.2.1"
            ),
            _react2["default"].createElement(
              "td",
              null,
              "2016-04-25"
            ),
            _react2["default"].createElement(
              "td",
              null,
              "sdfsdaf福建省嫡福晋阿发就看见发了多少，疯狂的撒分流k1辅导书开房间离开 sdfsdaf福建省嫡福晋阿发就看见发了多少，疯狂的撒分流k1辅导书开房间离开 sdfsdaf福建省嫡福晋阿发就看见发了多少，疯狂的撒分流k1辅导书开房间离开 sdfsdaf福建省嫡福晋阿发就看见发了多少，疯狂的撒分流k1辅导书开房间离开"
            )
          )
        )
      );
    }
  });
  
  exports["default"] = VersionLog;
  module.exports = exports["default"];

});
