define('pagelet/hotkeyword/components/hotkeyword.jsx', function(require, exports, module) {

  /**
    * @require ../top.less
    */
  
  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
  
  var _react = require("react");
  
  var _react2 = _interopRequireDefault(_react);
  
  var _staticLibReactRouter = require("reactRouter");
  
  var _pageletWidgetComponentsHeader = require("pagelet/widget/components/header.jsx");
  
  var _pageletWidgetComponentsHeader2 = _interopRequireDefault(_pageletWidgetComponentsHeader);
  
  var _pageletWidgetComponentsRank = require("pagelet/widget/components/rank.jsx");
  
  var _pageletWidgetComponentsRank2 = _interopRequireDefault(_pageletWidgetComponentsRank);
  
  var _pageletWidgetComponentsLoading = require("pagelet/widget/components/loading.jsx");
  
  var _pageletWidgetComponentsLoading2 = _interopRequireDefault(_pageletWidgetComponentsLoading);
  
  var _pageletWidgetComponentsTabs = require("pagelet/widget/components/tabs.jsx");
  
  var _pageletWidgetComponentsTabs2 = _interopRequireDefault(_pageletWidgetComponentsTabs);
  
  var _pageletWidgetComponentsAppItem = require("pagelet/widget/components/appItem.jsx");
  
  var _pageletWidgetComponentsAppItem2 = _interopRequireDefault(_pageletWidgetComponentsAppItem);
  
  var _pageletWidgetComponentsFilter = require("pagelet/widget/components/filter.jsx");
  
  var _pageletWidgetComponentsFilter2 = _interopRequireDefault(_pageletWidgetComponentsFilter);
  
  var UnderAppList = _react2["default"].createClass({
    displayName: "UnderAppList",
  
    mixins: [_staticLibReactRouter.History],
  
    getInitialState: function getInitialState() {
      return {};
    },
  
    componentDidMount: function componentDidMount() {
      //this.unSubscribe = SearchStore.listen(this.onStateChange.bind(this));
    },
  
    componentWillUnmount: function componentWillUnmount() {
      //this.unSubscribe();
    },
  
    onStateChange: function onStateChange(state) {
      this.setState(state);
    },
  
    render: function render() {
      var query = this.props.location.query;
  
      if (query.filter) {
        return _react2["default"].createElement(_pageletWidgetComponentsFilter2["default"], null);
      } else {
        return this.renderTop();
      }
    },
  
    renderTop: function renderTop() {
      return _react2["default"].createElement(
        "div",
        { className: "c-page under-app-list" },
        _react2["default"].createElement(
          _pageletWidgetComponentsHeader2["default"],
          {
            filterEnabled: true,
            showSideNav: this.props.showSideNav },
          "关键词热度排行榜"
        ),
        _react2["default"].createElement(
          "div",
          { className: "c-body" },
          _react2["default"].createElement(
            "p",
            { className: "f12 center f-txt" },
            "所有分类，中国，iPhone, 2016-04-29"
          ),
          _react2["default"].createElement(
            "div",
            { className: "ml12 mt12 mr12 mb12" },
            _react2["default"].createElement(
              "table",
              { className: "border" },
              _react2["default"].createElement(
                "tr",
                null,
                _react2["default"].createElement(
                  "th",
                  null,
                  "排名"
                ),
                _react2["default"].createElement(
                  "th",
                  null,
                  "关键词"
                ),
                _react2["default"].createElement(
                  "th",
                  null,
                  "搜索热度"
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
                  { style: { width: 37 } },
                  "1"
                ),
                _react2["default"].createElement(
                  "td",
                  { className: "cmain" },
                  "微信"
                ),
                _react2["default"].createElement(
                  "td",
                  { style: { width: 65 } },
                  "10500"
                ),
                _react2["default"].createElement(
                  "td",
                  { style: { width: 65 } },
                  "200"
                )
              )
            )
          )
        )
      );
    }
  });
  
  exports["default"] = UnderAppList;
  module.exports = exports["default"];

});
