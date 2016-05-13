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
  
  var _pageletWidgetComponentsLoading = require("pagelet/widget/components/loading.jsx");
  
  var _pageletWidgetComponentsLoading2 = _interopRequireDefault(_pageletWidgetComponentsLoading);
  
  var VersionLog = _react2["default"].createClass({
    displayName: "VersionLog",
  
    getInitialState: function getInitialState() {
      return {
        loading: true,
        versions: []
      };
    },
  
    componentDidMount: function componentDidMount() {
      this.unSubscribe = _storeStore2["default"].listen(this.onStateChange.bind(this));
      var query = this.props.query;
  
      _actionAction2["default"].detailVersion({
        country: query.country,
        device: query.device,
        appId: query.id
      });
    },
  
    componentWillUnmount: function componentWillUnmount() {
      this.unSubscribe();
    },
  
    onStateChange: function onStateChange(state) {
      this.setState(state);
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
          { className: "border" },
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
          this.state.versions.map(function (item, idx) {
            return _react2["default"].createElement(
              "tr",
              null,
              _react2["default"].createElement(
                "td",
                null,
                item.version
              ),
              _react2["default"].createElement(
                "td",
                null,
                item.date
              ),
              _react2["default"].createElement("td", null)
            );
          })
        ),
        this.state.loading ? _react2["default"].createElement(_pageletWidgetComponentsLoading2["default"], null) : null
      );
    }
  });
  
  exports["default"] = VersionLog;
  module.exports = exports["default"];

});
