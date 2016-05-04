define('pagelet/top/components/top7UpList.jsx', function(require, exports, module) {

  /**
    * @require pagelet/top/top.less
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
  
  var _pageletWidgetComponentsTabs = require("pagelet/widget/components/tabs.jsx");
  
  var _pageletWidgetComponentsTabs2 = _interopRequireDefault(_pageletWidgetComponentsTabs);
  
  var _pageletWidgetComponentsAppItem = require("pagelet/widget/components/appItem.jsx");
  
  var _pageletWidgetComponentsAppItem2 = _interopRequireDefault(_pageletWidgetComponentsAppItem);
  
  var _pageletWidgetComponentsFilter = require("pagelet/widget/components/filter.jsx");
  
  var _pageletWidgetComponentsFilter2 = _interopRequireDefault(_pageletWidgetComponentsFilter);
  
  var Top7UpList = _react2["default"].createClass({
    displayName: "Top7UpList",
  
    mixins: [_staticLibReactRouter.History],
  
    getInitialState: function getInitialState() {
      return {
        tabs: [{ name: "免费榜", typeid: "" }, { name: "付费榜", typeid: "" }, { name: "畅销榜", typeid: "" }],
  
        topList: [],
  
        curTypeId: "", //免费、付费和畅销三大榜单的排名数据
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
  
    onItemClick: function onItemClick(data) {
      var query = Object.assign({}, data);
      this.history.pushState("", "detail/1", query);
    },
  
    render: function render() {
      var query = this.props.location.query;
  
      if (query.filter) {
        return _react2["default"].createElement(_pageletWidgetComponentsFilter2["default"], null);
      } else {
        return this.renderTop();
      }
    },
  
    renderTop: function renderTop() {
      return _react2["default"].createElement(
        "div",
        { className: "c-page top7-up-list" },
        _react2["default"].createElement(
          _pageletWidgetComponentsHeader2["default"],
          {
            filterEnabled: true,
            showSideNav: this.props.showSideNav },
          "七日排名上升榜"
        ),
        _react2["default"].createElement(
          "div",
          { className: "c-body" },
          _react2["default"].createElement(_pageletWidgetComponentsTabs2["default"], { tabs: this.state.tabs }),
          _react2["default"].createElement(
            "p",
            { className: "f12 center f-txt" },
            "所有分类，中国，iPhone, 2016-04-29"
          ),
          _react2["default"].createElement(
            "ul",
            { className: "list" },
            _react2["default"].createElement(_pageletWidgetComponentsAppItem2["default"], {
              type: 2,
              onItemClick: this.onItemClick,
              index: 1,
              data: {} }),
            _react2["default"].createElement(_pageletWidgetComponentsAppItem2["default"], { type: 2 }),
            _react2["default"].createElement(_pageletWidgetComponentsAppItem2["default"], { type: 2 }),
            _react2["default"].createElement(_pageletWidgetComponentsAppItem2["default"], { type: 2 }),
            _react2["default"].createElement(_pageletWidgetComponentsAppItem2["default"], { type: 2 }),
            _react2["default"].createElement(_pageletWidgetComponentsAppItem2["default"], { type: 2 }),
            _react2["default"].createElement(_pageletWidgetComponentsAppItem2["default"], { type: 2 }),
            _react2["default"].createElement(_pageletWidgetComponentsAppItem2["default"], { type: 2 }),
            _react2["default"].createElement(_pageletWidgetComponentsAppItem2["default"], { type: 2 }),
            _react2["default"].createElement(_pageletWidgetComponentsAppItem2["default"], { type: 2 }),
            _react2["default"].createElement(_pageletWidgetComponentsAppItem2["default"], { type: 2 }),
            _react2["default"].createElement(_pageletWidgetComponentsAppItem2["default"], { type: 2 }),
            _react2["default"].createElement(_pageletWidgetComponentsAppItem2["default"], { type: 2 }),
            _react2["default"].createElement(_pageletWidgetComponentsAppItem2["default"], { type: 2 })
          )
        )
      );
    }
  });
  
  exports["default"] = Top7UpList;
  module.exports = exports["default"];

});
