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
  
  var _constants = require("constants");
  
  var _pageletWidgetComponentsLoading = require("pagelet/widget/components/loading.jsx");
  
  var _pageletWidgetComponentsLoading2 = _interopRequireDefault(_pageletWidgetComponentsLoading);
  
  var _staticMinxinsUtils = require("static/minxins/utils");
  
  var _actionAction = require("pagelet/appdetail/action/action");
  
  var _actionAction2 = _interopRequireDefault(_actionAction);
  
  var _storeStore = require("pagelet/appdetail/store/store");
  
  var _storeStore2 = _interopRequireDefault(_storeStore);
  
  var AppInfo = _react2["default"].createClass({
    displayName: "AppInfo",
  
    getInitialState: function getInitialState() {
      return {
        loading: true,
        detailInfo: {}
      };
    },
  
    componentDidMount: function componentDidMount() {
      var query = this.props.query;
  
      this.unSubscribe = _storeStore2["default"].listen(this.onStateChange.bind(this));
      _actionAction2["default"].appInfo(query.id, query.device, query.country);
    },
  
    componentWillUnmount: function componentWillUnmount() {
      this.unSubscribe();
    },
  
    onStateChange: function onStateChange(state) {
      if (state.detailInfo) {
        this.setState(state);
      }
    },
  
    render: function render() {
      var query = this.props.query;
      var detail = this.state.detailInfo;
      var updateTime = detail.begintime;
  
      if (updateTime) {
        var d = new Date(updateTime);
        updateTime = d.format("yyyy-MM-dd");
      }
  
      if (this.state.loading) {
        return _react2["default"].createElement(_pageletWidgetComponentsLoading2["default"], null);
      }
  
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
              detail.genres
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
              detail.device
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
              detail.appId
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
              detail.packageName
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
              detail.versionname
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
              (0, _staticMinxinsUtils.bytesToSize)(detail.filesize)
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
              updateTime
            )
          ),
          _react2["default"].createElement(
            "tr",
            { style: { display: "none" } },
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
          { className: "app-description", style: { display: "none" } },
          "后端暂没定这个字段"
        )
      );
    }
  });
  
  exports["default"] = AppInfo;
  module.exports = exports["default"];

});
