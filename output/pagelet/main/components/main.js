define('pagelet/main/components/main.jsx', function(require, exports, module) {

  /**
    * @require pagelet/main/main.less
    */
  
  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
  
  var _react = require("react");
  
  var _react2 = _interopRequireDefault(_react);
  
  var _staticLibReactRouter = require("reactRouter");
  
  var _side_nav = require("pagelet/main/components/side_nav.jsx");
  
  var _side_nav2 = _interopRequireDefault(_side_nav);
  
  var MainView = _react2["default"].createClass({
    displayName: "MainView",
  
    mixins: [_staticLibReactRouter.History],
  
    getInitialState: function getInitialState() {
      var _this = this;
  
      return {
        showSideNav: function showSideNav() {
          _this.refs.sideNav.show();
        }
      };
    },
  
    componentDidMount: function componentDidMount() {},
  
    componentWillUnmount: function componentWillUnmount() {},
  
    onStateChange: function onStateChange(state) {},
  
    renderChildren: function renderChildren() {
      return _react2["default"].Children.map(this.props.children, (function (child) {
        return _react2["default"].cloneElement(child, this.state);
      }).bind(this));
    },
  
    render: function render() {
  
      return _react2["default"].createElement(
        "div",
        { className: "__runtime__" },
        this.renderChildren(),
        _react2["default"].createElement(_side_nav2["default"], { ref: "sideNav" })
      );
    }
  });
  
  exports["default"] = MainView;
  module.exports = exports["default"];

});
