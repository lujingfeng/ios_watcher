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
  
  var _actionAction = require("pagelet/appdetail/action/action");
  
  var _actionAction2 = _interopRequireDefault(_actionAction);
  
  var _storeStore = require("pagelet/appdetail/store/store");
  
  var _storeStore2 = _interopRequireDefault(_storeStore);
  
  var _pageletWidgetComponentsLoading = require("pagelet/widget/components/loading.jsx");
  
  var _pageletWidgetComponentsLoading2 = _interopRequireDefault(_pageletWidgetComponentsLoading);
  
  var Keywords = _react2["default"].createClass({
    displayName: "Keywords",
  
    getInitialState: function getInitialState() {
      return {
        loading: false,
        keywords: []
      };
    },
    componentDidMount: function componentDidMount() {
      _actionAction2["default"].keywordCover(this.props.query.appId);
      this.unSubscribe = _storeStore2["default"].listen(this.onStateChange.bind(this));
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
        { className: "keywords-overide" },
        _react2["default"].createElement(
          "h5",
          { className: "title" },
          _react2["default"].createElement("i", null),
          "关键词覆盖数（共覆盖",
          _react2["default"].createElement(
            "a",
            null,
            this.state.keywords.length
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
          this.state.keywords.map(function (item) {
            return _react2["default"].createElement(
              "tr",
              null,
              _react2["default"].createElement(
                "td",
                null,
                item.keyword
              ),
              _react2["default"].createElement(
                "td",
                null,
                item.rank
              ),
              _react2["default"].createElement(
                "td",
                null,
                item.hot
              ),
              _react2["default"].createElement(
                "td",
                null,
                item.count
              )
            );
          })
        ),
        this.state.loading ? _react2["default"].createElement(_pageletWidgetComponentsLoading2["default"], null) : null
      );
    }
  });
  
  exports["default"] = Keywords;
  module.exports = exports["default"];

});
