define('pagelet/search/components/index.jsx', function(require, exports, module) {

  /**
    * @require pagelet/search/search.less
    */
  
  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
  
  var _react = require("react");
  
  var _react2 = _interopRequireDefault(_react);
  
  var _staticLibReactRouter = require("reactRouter");
  
  var _staticMinxinsUtils = require("static/minxins/utils");
  
  var _pageletWidgetComponentsHeader = require("pagelet/widget/components/header.jsx");
  
  var _pageletWidgetComponentsHeader2 = _interopRequireDefault(_pageletWidgetComponentsHeader);
  
  var Search = _react2["default"].createClass({
    displayName: "Search",
  
    mixins: [_staticLibReactRouter.History],
  
    getInitialState: function getInitialState() {
      return {};
    },
  
    componentDidMount: function componentDidMount() {
      (0, _staticMinxinsUtils.send)({
        type: "search",
        opra: "pv",
        label: "首页"
      });
    },
  
    componentWillUnmount: function componentWillUnmount() {},
  
    onStateChange: function onStateChange(state) {},
  
    onDefaultSearchTouch: function onDefaultSearchTouch(e) {
      e.preventDefault();
      this.history.pushState("", '/search/input');
    },
  
    render: function render() {
      var _this = this;
  
      return _react2["default"].createElement(
        "div",
        { className: "c-page c-search" },
        _react2["default"].createElement("div", { className: "icon-menu", onClick: function (e) {
            return _this.props.showSideNav();
          } }),
        _react2["default"].createElement(
          "i",
          { className: "ver f12" },
          "iOS版"
        ),
        _react2["default"].createElement(
          "div",
          { className: "default" },
          _react2["default"].createElement("div", { className: "coolchuan" }),
          _react2["default"].createElement(
            "div",
            {
              className: "input-search" },
            _react2["default"].createElement("input", {
              onClick: this.onDefaultSearchTouch,
              placeholder: "支持应用名称或AppID搜索",
              type: "text" }),
            _react2["default"].createElement("i", {
              onClick: this.onDefaultSearchTouch,
              className: "icon-query" })
          )
        )
      );
    }
  });
  
  exports["default"] = Search;
  module.exports = exports["default"];

});
