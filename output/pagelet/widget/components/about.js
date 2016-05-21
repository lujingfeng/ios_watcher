define('pagelet/widget/components/about.jsx', function(require, exports, module) {

  /**
    * @require pagelet/widget/about.less
    */
  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
  
  var _react = require("react");
  
  var _react2 = _interopRequireDefault(_react);
  
  var _pageletWidgetComponentsHeader = require("pagelet/widget/components/header.jsx");
  
  var _pageletWidgetComponentsHeader2 = _interopRequireDefault(_pageletWidgetComponentsHeader);
  
  var About = _react2["default"].createClass({
    displayName: "About",
  
    render: function render() {
  
      return _react2["default"].createElement(
        "div",
        { className: "c-page c-about" },
        _react2["default"].createElement(
          _pageletWidgetComponentsHeader2["default"],
          {
            filterVisible: false,
            showSideNav: this.props.showSideNav },
          "关于我们"
        ),
        _react2["default"].createElement(
          "div",
          { className: "c-body" },
          _react2["default"].createElement(
            "h5",
            null,
            " 酷传是国内最大的App发布与监控平台， 致力于为广大开发者提供一站式发布与监控服务。"
          ),
          _react2["default"].createElement(
            "p",
            null,
            "1、酷传网站（www.kuchuan.com）提供App代理上传、ASO优化、App推广等服务。"
          ),
          _react2["default"].createElement(
            "p",
            null,
            "2、查看iOS榜单排名、七日排名上升/下降榜、关键词热度排行榜及应用详情信息。"
          ),
          _react2["default"].createElement(
            "p",
            null,
            "3、关注酷传推广手册订阅号（tuiguangshouce）及酷传监控服务号（coolchuanhjk），了解移动互联网行业动态，洞察APP推广方法。"
          ),
          _react2["default"].createElement(
            "div",
            null,
            _react2["default"].createElement("img", { src: "/static/image/icon_1.png" }),
            _react2["default"].createElement("img", { src: "/static/image/icon_2.png" })
          )
        )
      );
    }
  });
  
  exports["default"] = About;
  module.exports = exports["default"];

});
