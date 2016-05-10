define('pagelet/top/components/topList.jsx', function(require, exports, module) {

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
  
  var _constants = require("constants");
  
  var _actionAction = require("pagelet/top/action/action");
  
  var _actionAction2 = _interopRequireDefault(_actionAction);
  
  var _storeStore = require("pagelet/top/store/store");
  
  var _storeStore2 = _interopRequireDefault(_storeStore);
  
  var TopList = _react2["default"].createClass({
    displayName: "TopList",
  
    mixins: [_staticLibReactRouter.History],
  
    getInitialState: function getInitialState() {
      var tabs = [{ name: "免费榜", payType: _constants.payType.FREE }, { name: "付费榜", payType: _constants.payType.FEE }, { name: "畅销榜", payType: _constants.payType.HOT }];
  
      var now = new Date();
  
      return {
        tabs: tabs,
        list: [],
  
        genres: "",
        payType: _constants.payType.FREE,
        date: now.format("yyyy-MM-dd"),
        country: _constants.countryCode.CHINA,
        device: _constants.deviceType.IPHONE,
  
        page: 1,
        total: 0
      };
    },
  
    componentDidMount: function componentDidMount() {
      this.unSubscribe = _storeStore2["default"].listen(this.onStateChange.bind(this));
  
      var now = new Date();
  
      _actionAction2["default"].fetchList({
        genres: this.state.genres,
        date: this.state.date,
        country: this.state.country,
        device: this.state.device,
        type: this.state.payType,
        test: true
      });
    },
  
    componentWillUnmount: function componentWillUnmount() {
      this.unSubscribe();
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
  
    onSelectTab: function onSelectTab(tab) {
      var _this = this;
  
      this.setState({
        payType: tab.payType
      }, function () {
        _actionAction2["default"].fetchList({
          date: _this.state.date,
          country: _this.state.country,
          device: _this.state.device,
          type: _this.state.payType,
          test: true
        });
      });
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
      var _this2 = this;
  
      var list = this.state.list || [];
  
      return _react2["default"].createElement(
        "div",
        { className: "c-page top-list" },
        _react2["default"].createElement(
          _pageletWidgetComponentsHeader2["default"],
          {
            filterEnabled: true,
            showSideNav: this.props.showSideNav },
          "iOS榜单排名"
        ),
        _react2["default"].createElement(
          "div",
          { className: "c-body" },
          _react2["default"].createElement(_pageletWidgetComponentsTabs2["default"], {
            onSelect: this.onSelectTab,
            tabs: this.state.tabs }),
          _react2["default"].createElement(
            "p",
            { className: "f12 center f-txt" },
            "所有分类，中国，iPhone, 2016-04-29"
          ),
          _react2["default"].createElement(
            "ul",
            { className: "list" },
            list.map(function (item, idx) {
              return _react2["default"].createElement(_pageletWidgetComponentsAppItem2["default"], {
                type: 2,
                onItemClick: _this2.onItemClick,
                index: idx,
                data: item });
            })
          )
        )
      );
    }
  });
  
  exports["default"] = TopList;
  module.exports = exports["default"];

});
