define('pagelet/widget/components/header.jsx', function(require, exports, module) {

  /**
    * @require pagelet/widget/header.less
    */
  
  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
  
  var _react = require("react");
  
  var _react2 = _interopRequireDefault(_react);
  
  var _jquery = require("jquery");
  
  var _jquery2 = _interopRequireDefault(_jquery);
  
  var _reactRouter = require("reactRouter");
  
  var Header = _react2["default"].createClass({
    displayName: "Header",
  
    mixins: [_reactRouter.History],
  
    getInitialState: function getInitialState() {
      return {
        type: this.props.type || "normal",
        searchKey: this.props.searchValue || ""
      };
    },
  
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
      if (nextProps.searchValue != this.props.searchValue) {
        this.setState({
          searchKey: nextProps.searchValue
        });
      }
      if (nextProps.type != this.props.type) {
        this.setState({
          type: nextProps.type
        });
      }
    },
  
    componentDidMount: function componentDidMount() {},
  
    componentWillUnmount: function componentWillUnmount() {},
  
    onStateChange: function onStateChange(state) {},
  
    onSearch: function onSearch() {
      console.log(this.state.searchKey);
      this.props.onSearch && this.props.onSearch(this.state.searchKey);
    },
  
    onCancelSearch: function onCancelSearch() {
      this.props.onCancelSearch && this.props.onCancelSearch();
    },
  
    toSearch: function toSearch() {
      this.history.pushState(null, "/search/input");
    },
  
    render: function render() {
      var _this = this;
  
      var type = this.state.type;
  
      return _react2["default"].createElement(
        "div",
        { className: "c-header" },
        type == "search" ? _react2["default"].createElement(
          "div",
          { className: "search" },
          _react2["default"].createElement(
            "div",
            { className: "input-con" },
            _react2["default"].createElement("input", {
              value: this.state.searchKey,
              onChange: function (e) {
                return _this.setState({ searchKey: e.target.value });
              },
              type: "text" }),
            _react2["default"].createElement("i", { className: "icon-query", onClick: this.onSearch })
          ),
          _react2["default"].createElement(
            "i",
            { className: "cl", onClick: this.onCancelSearch },
            "取消"
          )
        ) : null,
        type == "normal" ? _react2["default"].createElement(
          "div",
          { className: "normal" },
          _react2["default"].createElement("div", { className: "icon-menu", onClick: function (e) {
              return _this.props.showSideNav();
            } }),
          _react2["default"].createElement(
            "div",
            { className: "middle" },
            this.props.children
          ),
          _react2["default"].createElement(
            "div",
            { className: "right" },
            _react2["default"].createElement("i", { className: "icon-query", onClick: this.toSearch }),
            _react2["default"].createElement("i", { className: "icon-filter" })
          )
        ) : null
      );
    }
  });
  
  exports["default"] = Header;
  module.exports = exports["default"];

});
