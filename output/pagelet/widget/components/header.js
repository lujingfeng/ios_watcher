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
      var filterVisible = undefined;
  
      if (typeof this.props.filterVisible == "undefined") {
        filterVisible = true;
      } else {
        filterVisible = !!this.props.filterVisible;
      }
  
      return {
        type: this.props.type || "normal",
        searchKey: this.props.searchValue || "",
  
        filterEnabled: !!this.props.filterEnabled,
        filterVisible: filterVisible
      };
    },
  
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
      var state = {};
  
      if (nextProps.searchValue != this.props.searchValue) {
        state.searchKey = nextProps.searchValue;
      }
      if (nextProps.type != this.props.type) {
        state.type = nextProps.type;
      }
      if (nextProps.filterEnabled != this.props.filterEnabled) {
        state.filterEnabled = nextProps.filterEnabled;
      }
      if (nextProps.filterVisible != this.props.filterVisible) {
        state.filterVisible = nextProps.filterVisible;
      }
      this.setState(state);
    },
  
    componentDidMount: function componentDidMount() {},
  
    componentWillUnmount: function componentWillUnmount() {},
  
    onStateChange: function onStateChange(state) {},
  
    onSearch: function onSearch() {
      if (this.state.searchKey && this.props.onSearch) {
        this.props.onSearch(this.state.searchKey);
      }
    },
  
    onCancelSearch: function onCancelSearch() {
      this.props.onCancelSearch && this.props.onCancelSearch();
    },
  
    toSearch: function toSearch() {
      this.history.pushState(null, "/search/input");
    },
  
    toFilter: function toFilter() {
      var toFilter = this.props.toFilter;
      var filterEnabled = this.state.filterEnabled;
  
      var loc = this.props.location;
  
      if (filterEnabled && toFilter) {
        toFilter();
      }
  
      if (filterEnabled) {
        var pathname = location.hash.slice(2, location.hash.indexOf("?"));
        this.history.pushState(null, pathname, Object.assign({ filter: true }, loc.query));
      }
    },
  
    render: function render() {
      var _this = this;
  
      var type = this.state.type;
      var filterStyle = {};
      var state = this.state;
  
      if (!state.filterEnabled) {
        filterStyle.opacity = 0.5;
      }
      if (!state.filterVisible) {
        filterStyle.display = "none";
      }
  
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
              placeholder: this.props.placeholder,
              value: this.state.searchKey,
              onChange: function (e) {
                return _this.setState({ searchKey: e.target.value });
              },
              type: "text" }),
            _react2["default"].createElement("i", { className: "icon-q", onClick: this.onSearch })
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
            {
              style: !state.filterVisible ? { right: 40 } : null,
              className: "middle" },
            this.props.children
          ),
          _react2["default"].createElement(
            "div",
            { className: "right" },
            _react2["default"].createElement("i", { className: "icon-q", onClick: this.toSearch }),
            _react2["default"].createElement("i", {
              style: filterStyle,
              className: "icon-filter",
              onClick: this.toFilter })
          )
        ) : null
      );
    }
  });
  
  exports["default"] = Header;
  module.exports = exports["default"];

});
