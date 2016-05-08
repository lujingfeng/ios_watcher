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
      var data = this.props.data || {};
      var type = this.props.type || "fav";
  
      return _react2["default"].createElement(
        "li",
        { className: "my-fav-item", onClick: this.props.onClick },
        _react2["default"].createElement("img", { src: "http://a4.mzstatic.com/us/r30/Purple30/v4/ec/46/1f/ec461f34-a901-4c03-5ddd-7cd7ba291790/icon72x72.jpeg" }),
        _react2["default"].createElement(
          "p",
          { className: "ellipsis mt6" },
          "TitleTitleTitleTitleTitleTitleTitleTitleTitle"
        ),
        _react2["default"].createElement(
          "p",
          { className: "ellipsis f12 c999" },
          "descript描述开发商描述descript描述开发商描述"
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
