define('pagelet/widget/components/dialog.jsx', function(require, exports, module) {

  /**
   * @require pagelet/widget/dialog.less
   */
  
  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  var React = require("react");
  var $ = require("jquery");
  var Popup = require("pagelet/widget/components/popup.jsx");
  
  var buttonKeys = {
      OK: "ok",
      CANCEL_OK: "cancel_ok",
      EDIT_CANCEL: "edit_cancel"
  };
  
  var Dialog = React.createClass({
      displayName: "Dialog",
  
      getInitialState: function getInitialState() {
          return {
              buttonkey: this.props.buttonkey || buttonKeys.OK,
              visible: false,
              height: "auto"
          };
      },
  
      show: function show() {
          this.setState({ visible: true });
      },
  
      hide: function hide() {
          this.setState({ visible: false });
      },
  
      onTapMasker: function onTapMasker() {
          this.hide();
      },
  
      onOk: function onOk() {
          this.hide();
          this.props.onOk && this.props.onOk();
      },
  
      onCancel: function onCancel() {
          this.hide();
          this.props.cancel && this.props.cancel();
      },
  
      render: function render() {
          var footer;
  
          if (!this.state.visible) {
              return null;
          }
  
          if (this.state.buttonkey == buttonKeys.OK) {
              footer = React.createElement(
                  "div",
                  { className: "footer" },
                  React.createElement(
                      "button",
                      { style: { width: "100%" }, onClick: this.onOk },
                      "确定"
                  )
              );
          } else if (this.state.buttonkey == buttonKeys.CANCEL_OK) {
              footer = React.createElement(
                  "div",
                  { className: "footer" },
                  React.createElement(
                      "button",
                      { style: { width: "50%" }, onClick: this.onCancel },
                      "取消"
                  ),
                  React.createElement("i", { className: "line" }),
                  React.createElement(
                      "button",
                      { style: { width: "50%" }, onClick: this.onOk },
                      this.props.okText || "确定"
                  )
              );
          } else if (this.state.buttonkey == buttonKeys.EDIT_CANCEL) {
              footer = React.createElement(
                  "div",
                  { className: "footer" },
                  React.createElement(
                      "button",
                      { style: { width: "50%" }, onClick: this.onOk },
                      "舍弃"
                  ),
                  React.createElement("i", { className: "line" }),
                  React.createElement(
                      "button",
                      { style: { width: "50%" }, onClick: this.onCancel },
                      "继续填写"
                  )
              );
          }
  
          return React.createElement(
              Popup,
              { onTapMasker: this.onTapMasker, width: 280, height: this.state.height },
              React.createElement(
                  "div",
                  { className: "m-dialog" },
                  React.createElement(
                      "div",
                      { className: "title" },
                      this.props.title
                  ),
                  React.createElement(
                      "div",
                      { className: "body" },
                      this.props.children
                  ),
                  footer
              )
          );
      }
  });
  
  Dialog.buttonKeys = buttonKeys;
  
  exports["default"] = Dialog;
  module.exports = exports["default"];

});
