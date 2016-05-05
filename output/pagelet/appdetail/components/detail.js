define('pagelet/appdetail/components/detail.jsx', function(require, exports, module) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
  
  var _react = require("react");
  
  var _react2 = _interopRequireDefault(_react);
  
  var _jquery = require("jquery");
  
  var _jquery2 = _interopRequireDefault(_jquery);
  
  var _reactRouter = require("reactRouter");
  
  var _pageletWidgetComponentsHeader = require("pagelet/widget/components/header.jsx");
  
  var _pageletWidgetComponentsHeader2 = _interopRequireDefault(_pageletWidgetComponentsHeader);
  
  var _baseinfo = require("pagelet/appdetail/components/baseinfo.jsx");
  
  var _baseinfo2 = _interopRequireDefault(_baseinfo);
  
  var _category = require("pagelet/appdetail/components/category.jsx");
  
  var _category2 = _interopRequireDefault(_category);
  
  var _appinfo = require("pagelet/appdetail/components/appinfo.jsx");
  
  var _appinfo2 = _interopRequireDefault(_appinfo);
  
  var _realrank = require("pagelet/appdetail/components/realrank.jsx");
  
  var _realrank2 = _interopRequireDefault(_realrank);
  
  var _version_log = require("pagelet/appdetail/components/version_log");
  
  var _version_log2 = _interopRequireDefault(_version_log);
  
  var _keywords = require("pagelet/appdetail/components/keywords.jsx");
  
  var _keywords2 = _interopRequireDefault(_keywords);
  
  var _comment = require("pagelet/appdetail/components/comment.jsx");
  
  var _comment2 = _interopRequireDefault(_comment);
  
  var AppDetail = _react2["default"].createClass({
    displayName: "AppDetail",
  
    getInitialState: function getInitialState() {
      return {};
    },
  
    handleScroll: function handleScroll(e) {
      var _target = e.target;
  
      if (_target.offsetHeight + _target.scrollTop + 10 >= _target.scrollHeight && !this.state.loading && this.state.searchResultList.length < this.state.total) {
        this.loadMore();
      }
    },
  
    render: function render() {
      var query = this.props.location.query;
      var params = this.props.params;
      var bottomView;
  
      if (params.module == 1) {
        bottomView = _react2["default"].createElement(_appinfo2["default"], { query: query });
      } else if (params.module == 2) {
        bottomView = _react2["default"].createElement(_realrank2["default"], null);
      } else if (params.module == 3) {
        bottomView = _react2["default"].createElement(_version_log2["default"], null);
      } else if (params.module == 4) {
        bottomView = _react2["default"].createElement(_keywords2["default"], null);
      } else if (params.module == 5) {
        bottomView = _react2["default"].createElement(_comment2["default"], null);
      }
  
      return _react2["default"].createElement(
        "div",
        { className: "c-page c-app-detail" },
        _react2["default"].createElement(
          _pageletWidgetComponentsHeader2["default"],
          { showSideNav: this.props.showSideNav },
          "应用详情"
        ),
        _react2["default"].createElement(
          "div",
          { className: "c-body" },
          _react2["default"].createElement(_baseinfo2["default"], { query: query }),
          _react2["default"].createElement(_category2["default"], {
            query: query,
            ctyValue: params.module }),
          _react2["default"].createElement(
            "div",
            {
              onScroll: this.handleScroll.bind(this),
              className: "category-detail" },
            bottomView
          )
        )
      );
    }
  });
  
  exports["default"] = AppDetail;
  module.exports = exports["default"];

});
