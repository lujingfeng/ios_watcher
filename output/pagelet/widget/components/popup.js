define('pagelet/widget/components/popup.jsx', function(require, exports, module) {

  /**
   * @require pagelet/widget/popup.less
   */
  
  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  var React = require("react");
  var $ = require("jquery");
  
  var Popup = React.createClass({
      displayName: "Popup",
  
      getInitialState: function getInitialState() {
          return {};
      },
  
      componentDidMount: function componentDidMount() {},
  
      onTapMasker: function onTapMasker(e) {
          if (this.getDOMNode() == e.target) {
              this.props.onTapMasker && this.props.onTapMasker();
          }
      },
  
      render: function render() {
          var w = this.props.width || 250;
          var h = this.props.height || 100;
  
          var popupStyle = {
              width: w,
              height: h
          };
  
          return React.createElement(
              "div",
              { className: "m-mask m-popup-mask", onClick: this.onTapMasker },
              React.createElement(
                  "div",
                  { className: "m-pupop", style: popupStyle },
                  this.props.children
              )
          );
      }
  });
  
  exports["default"] = Popup;
  module.exports = exports["default"];

});
