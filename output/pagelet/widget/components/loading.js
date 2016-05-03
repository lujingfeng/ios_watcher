define('pagelet/widget/components/loading.jsx', function(require, exports, module) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
  
  var _react = require("react");
  
  var _react2 = _interopRequireDefault(_react);
  
  var Loading = _react2["default"].createClass({
    displayName: "Loading",
  
    render: function render() {
  
      return _react2["default"].createElement("div", { className: "c-loading icon-spinner" });
    }
  });
  
  exports["default"] = Loading;
  module.exports = exports["default"];

});
