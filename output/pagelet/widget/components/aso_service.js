define('pagelet/widget/components/aso_service', function(require, exports, module) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
  
  var _react = require("react");
  
  var _react2 = _interopRequireDefault(_react);
  
  var _pageletWidgetComponentsHeader = require("pagelet/widget/components/header.jsx");
  
  var _pageletWidgetComponentsHeader2 = _interopRequireDefault(_pageletWidgetComponentsHeader);
  
  var ASOService = _react2["default"].createClass({
    displayName: "ASOService",
  
    onGotService: function onGotService() {
      location.href = "http://www.coolchuan.com/aso";
    },
  
    render: function render() {
      var sbg = "/static/image/service_bg.jpg";
      var bottom_bg = "/static/image/service_bottom.jpg";
  
      return _react2["default"].createElement(
        "div",
        { className: "c-page aso-service" },
        _react2["default"].createElement(
          _pageletWidgetComponentsHeader2["default"],
          {
            filterVisible: false,
            showSideNav: this.props.showSideNav },
          "ASO优化服务"
        ),
        _react2["default"].createElement(
          "div",
          { className: "c-body center" },
          _react2["default"].createElement("img", { src: sbg, style: { width: "100%" } }),
          _react2["default"].createElement("img", { src: bottom_bg, style: { width: "100%" } }),
          _react2["default"].createElement(
            "button",
            {
              onClick: this.onGotService,
              className: "btn main-btn",
              style: { marginBottom: 20 } },
            "获取ASO优化方案"
          )
        )
      );
    }
  });
  
  exports["default"] = ASOService;
  module.exports = exports["default"];

});
