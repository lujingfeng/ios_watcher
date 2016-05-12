define('pagelet/compproduct/components/my_fav_item.jsx', function(require, exports, module) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
  
  var _react = require("react");
  
  var _react2 = _interopRequireDefault(_react);
  
  var MyFavItem = _react2["default"].createClass({
    displayName: "MyFavItem",
  
    getInitialState: function getInitialState() {
      return {
        data: this.props.data
      };
    },
  
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
      if (nextProps.data != this.props.data) {
        this.setState({
          data: nextProps.data
        });
      }
    },
  
    render: function render() {
      var _this = this;
  
      var data = this.props.data || {};
      var type = this.props.type || "fav";
  
      return _react2["default"].createElement(
        "li",
        { className: "my-fav-item", onClick: function (e) {
            return _this.props.onClick(data);
          } },
        _react2["default"].createElement("img", { src: data.icon }),
        _react2["default"].createElement(
          "p",
          { className: "ellipsis mt6" },
          data.title
        ),
        _react2["default"].createElement(
          "p",
          { className: "ellipsis f12 c999" },
          data.developer
        ),
        type == "fav" ? _react2["default"].createElement(
          "div",
          { className: "f10 center mt6" },
          _react2["default"].createElement("i", { className: "icon-vs" }),
          _react2["default"].createElement(
            "p",
            null,
            "排名对比"
          )
        ) : null,
        type == "fav" ? _react2["default"].createElement(
          "i",
          { className: "icon-myfav" },
          _react2["default"].createElement(
            "p",
            null,
            "已关注"
          )
        ) : null
      );
    }
  });
  
  exports["default"] = MyFavItem;
  module.exports = exports["default"];

});
