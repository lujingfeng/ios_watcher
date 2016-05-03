define('pagelet/top/components/topList.jsx', function(require, exports, module) {

  /**
    * @require ../top.less
    */
  
  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
  
  var _react = require("react");
  
  var _react2 = _interopRequireDefault(_react);
  
  var _staticLibReactRouter = require("reactRouter");
  
  var _pageletWidgetComponentsHeader = require("pagelet/widget/components/header.jsx");
  
  var _pageletWidgetComponentsHeader2 = _interopRequireDefault(_pageletWidgetComponentsHeader);
  
  var _pageletWidgetComponentsRank = require("pagelet/widget/components/rank.jsx");
  
  var _pageletWidgetComponentsRank2 = _interopRequireDefault(_pageletWidgetComponentsRank);
  
  var _pageletWidgetComponentsLoading = require("pagelet/widget/components/loading.jsx");
  
  var _pageletWidgetComponentsLoading2 = _interopRequireDefault(_pageletWidgetComponentsLoading);
  
  var TopList = _react2["default"].createClass({
    displayName: "TopList",
  
    mixins: [_staticLibReactRouter.History],
  
    getInitialState: function getInitialState() {
      return {
        topList: [],
  
        page: 1,
        total: 0
      };
    },
  
    componentDidMount: function componentDidMount() {
      //this.unSubscribe = SearchStore.listen(this.onStateChange.bind(this));
    },
  
    componentWillUnmount: function componentWillUnmount() {
      //this.unSubscribe();
    },
  
    onStateChange: function onStateChange(state) {
      this.setState(state);
    },
  
    handleScroll: function handleScroll(e) {
      var _target = e.target;
  
      if (_target.offsetHeight + _target.scrollTop + 10 >= _target.scrollHeight && !this.state.loading && this.state.searchResultList.length < this.state.total) {
        this.loadMore();
      }
    },
  
    loadMore: function loadMore() {
      var page = this.state.page + 1;
      this.setState({
        page: page
      });
  
      SearchAction.search(this.state.searchKey, page);
    },
  
    render: function render() {
      return _react2["default"].createElement(
        "div",
        { className: "c-page top-list" },
        _react2["default"].createElement(
          _pageletWidgetComponentsHeader2["default"],
          { showSideNav: this.props.showSideNav },
          "iOS榜单排名"
        ),
        _react2["default"].createElement(
          "div",
          { className: "c-body" },
          _react2["default"].createElement(
            "ul",
            { className: "top-nav" },
            _react2["default"].createElement(
              "li",
              null,
              "免费榜"
            ),
            _react2["default"].createElement(
              "li",
              null,
              "付费榜"
            ),
            _react2["default"].createElement(
              "li",
              null,
              "畅销榜"
            )
          ),
          _react2["default"].createElement(
            "p",
            { className: "f12" },
            "所有分类，中国，iPhone, 2016-04-29"
          ),
          _react2["default"].createElement("div", { className: "list" })
        )
      );
    }
  });
  
  exports["default"] = TopList;
  module.exports = exports["default"];

});
