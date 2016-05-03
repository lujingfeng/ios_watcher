define('pagelet/widget/components/tabs.jsx', function(require, exports, module) {

  /**
    * @require pagelet/widget/tabs.less
    */
  
  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
  
  var _react = require("react");
  
  var _react2 = _interopRequireDefault(_react);
  
  var Tabs = _react2["default"].createClass({
    displayName: "Tabs",
  
    getInitialState: function getInitialState() {
      return {
        index: 0
      };
    },
  
    onSelect: function onSelect(tab, idx) {
      this.setState({
        index: idx
      });
      this.props.onSelect && this.props.onSelect(tab, idx);
    },
  
    render: function render() {
      var _this = this;
  
      var tabs = this.props.tabs || [];
      var curIndex = this.state.index;
      var width = 100 / tabs.length + "%";
  
      return _react2["default"].createElement(
        "ul",
        { className: "c-tabs clearfix" },
        tabs.map(function (tab, idx) {
          return _react2["default"].createElement(
            "li",
            {
              onClick: function (e) {
                return _this.onSelect(tab, idx);
              },
              style: { width: width },
              className: idx === curIndex ? "cur" : null },
            tab.name
          );
        })
      );
    }
  });
  
  exports["default"] = Tabs;
  module.exports = exports["default"];

});
