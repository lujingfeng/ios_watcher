define('pagelet/appdetail/components/category.jsx', function(require, exports, module) {

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
  
  var _staticLibReactRouter = require("reactRouter");
  
  var DetailCategory = _react2["default"].createClass({
    displayName: "DetailCategory",
  
    mixins: [_staticLibReactRouter.History],
  
    getInitialState: function getInitialState() {
      return {
        category: this.props.ctyValue
      };
    },
  
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
      if (nextProps.ctyValue != this.props.ctyValue) {
        this.setState({
          category: nextProps.ctyValue
        });
      }
    },
  
    onCategofy: function onCategofy(category) {
      this.history.pushState("", "/detail/" + category, this.props.query);
    },
  
    render: function render() {
      var _this = this;
  
      var query = this.props.query;
      var category = this.state.category;
  
      return _react2["default"].createElement(
        "div",
        { className: "c-category" },
        _react2["default"].createElement(
          "div",
          { className: "tabs" },
          _react2["default"].createElement(
            "div",
            {
              className: category == 1 ? "cur" : null,
              onClick: function (e) {
                _this.onCategofy(1);
              } },
            "应用信息"
          ),
          _react2["default"].createElement(
            "div",
            {
              className: category == 2 ? "cur" : null,
              onClick: function (e) {
                _this.onCategofy(2);
              } },
            "实时排名"
          ),
          _react2["default"].createElement(
            "div",
            {
              className: category == 3 ? "cur" : null,
              onClick: function (e) {
                _this.onCategofy(3);
              } },
            "版本记录"
          ),
          _react2["default"].createElement(
            "div",
            {
              style: { display: "none" },
              className: category == 4 ? "cur" : null,
              onClick: function (e) {
                _this.onCategofy(4);
              } },
            "关键词覆盖数"
          ),
          _react2["default"].createElement(
            "div",
            {
              className: category == 5 ? "cur" : null,
              onClick: function (e) {
                _this.onCategofy(5);
              } },
            "评论详情"
          ),
          _react2["default"].createElement(
            "div",
            {
              className: category == 6 ? "cur" : null,
              onClick: function (e) {
                _this.onCategofy(6);
              } },
            "应用评级"
          )
        )
      );
    }
  });
  
  exports["default"] = DetailCategory;
  module.exports = exports["default"];

});
