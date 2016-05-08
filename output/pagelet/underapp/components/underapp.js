define('pagelet/underapp/components/underapp.jsx', function(require, exports, module) {

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
  
  var _pageletWidgetComponentsTabs = require("pagelet/widget/components/tabs.jsx");
  
  var _pageletWidgetComponentsTabs2 = _interopRequireDefault(_pageletWidgetComponentsTabs);
  
  var _pageletWidgetComponentsAppItem = require("pagelet/widget/components/appItem.jsx");
  
  var _pageletWidgetComponentsAppItem2 = _interopRequireDefault(_pageletWidgetComponentsAppItem);
  
  var _pageletWidgetComponentsFilter = require("pagelet/widget/components/filter.jsx");
  
  var _pageletWidgetComponentsFilter2 = _interopRequireDefault(_pageletWidgetComponentsFilter);
  
  var _actionAction = require("pagelet/underapp/action/action");
  
  var _actionAction2 = _interopRequireDefault(_actionAction);
  
  var _storeStore = require("pagelet/underapp/store/store");
  
  var _storeStore2 = _interopRequireDefault(_storeStore);
  
  var UnderAppList = _react2["default"].createClass({
    displayName: "UnderAppList",
  
    mixins: [_staticLibReactRouter.History],
  
    getInitialState: function getInitialState() {
      return {
        underAppList: [],
  
        //filter params
        page: 1,
        country: "cn",
        date: "20160409"
      };
    },
  
    componentDidMount: function componentDidMount() {
      this.unSubscribe = _storeStore2["default"].listen(this.onStateChange.bind(this));
      _actionAction2["default"].fetchUnderAppList({
        country: this.state.country,
        date: this.state.date,
        page: this.state.page
      });
    },
  
    componentWillUnmount: function componentWillUnmount() {
      this.unSubscribe();
    },
  
    onStateChange: function onStateChange(state) {
      if (state.underAppList) {
        state.underAppList = this.state.underAppList.concat(state.underAppList);
      }
      this.setState(state);
    },
  
    handleScroll: function handleScroll(e) {
      var _target = e.target;
  
      if (_target.offsetHeight + _target.scrollTop + 10 >= _target.scrollHeight && !this.state.loading) {
        this.loadMore();
      }
    },
  
    loadMore: function loadMore() {
      var page = this.state.page + 1;
      this.setState({
        page: page
      });
  
      _actionAction2["default"].fetchUnderAppList({
        country: this.state.country,
        date: this.state.date,
        page: this.state.page + 1
      });
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
      var _this = this;
  
      var state = this.state;
  
      return _react2["default"].createElement(
        "div",
        { className: "c-page under-app-list" },
        _react2["default"].createElement(
          _pageletWidgetComponentsHeader2["default"],
          {
            filterEnabled: true,
            showSideNav: this.props.showSideNav },
          "下架应用监控"
        ),
        _react2["default"].createElement(
          "div",
          {
            onScroll: this.handleScroll.bind(this),
            className: "c-body" },
          _react2["default"].createElement(
            "p",
            { className: "f12 center f-txt" },
            "中国, 2016-04-29"
          ),
          _react2["default"].createElement(
            "ul",
            { className: "list" },
            state.underAppList.map(function (item, idx) {
              return _react2["default"].createElement(_pageletWidgetComponentsAppItem2["default"], {
                type: 7,
                onItemClick: _this.onItemClick,
                index: idx,
                data: item });
            })
          ),
          state.loading ? _react2["default"].createElement(_pageletWidgetComponentsLoading2["default"], null) : null
        )
      );
    }
  });
  
  exports["default"] = UnderAppList;
  module.exports = exports["default"];

});
