define('pagelet/underapp/components/underapp.jsx', function(require, exports, module) {

  /**
    * @require ../top.less
    */
  
  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
  
  var _react = require("react");
  
  var _react2 = _interopRequireDefault(_react);
  
  var _staticLibReactRouter = require("reactRouter");
  
  var _jquery = require("jquery");
  
  var _jquery2 = _interopRequireDefault(_jquery);
  
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
  
  var _staticMinxinsUtils = require("static/minxins/utils");
  
  var _constants = require("constants");
  
  var _actionAction = require("pagelet/underapp/action/action");
  
  var _actionAction2 = _interopRequireDefault(_actionAction);
  
  var _storeStore = require("pagelet/underapp/store/store");
  
  var _storeStore2 = _interopRequireDefault(_storeStore);
  
  var UnderAppList = _react2["default"].createClass({
    displayName: "UnderAppList",
  
    mixins: [_staticLibReactRouter.History],
  
    getInitialState: function getInitialState() {
      var now = new Date();
      var defaultDatetime = {};
      defaultDatetime.name = "今天";
      defaultDatetime.value = 1;
  
      return {
        underAppList: [],
  
        //filter params
        page: 1,
        country: _constants.countryCode.CHINA,
        date: defaultDatetime
      };
    },
  
    componentDidMount: function componentDidMount() {
      this.unSubscribe = _storeStore2["default"].listen(this.onStateChange.bind(this));
      this.fetchList();
      (0, _staticMinxinsUtils.send)({
        type: "offshelve",
        opra: "pv",
        label: "下架应用监控"
      });
    },
  
    componentWillUnmount: function componentWillUnmount() {
      this.unSubscribe();
    },
  
    fetchList: function fetchList() {
      var state = this.state;
      var date;
      if (typeof state.date.value == "string") {
        date = state.date.value.replace(/\-/g, "");
      } else {
        date = state.date.value;
      }
  
      _actionAction2["default"].fetchUnderAppList({
        country: this.state.country,
        date: date,
        page: this.state.page
      });
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
      }, function () {
        this.fetchList();
      });
    },
  
    onItemClick: function onItemClick(data) {
      var query = _jquery2["default"].extend({}, data);
      query.id = data.appId;
      this.history.pushState("", "detail/1", query);
    },
  
    onFilter: function onFilter(filter) {
      var _this = this;
  
      var state = {
        underAppList: [],
        page: 1
      };
  
      if (filter.country) {
        state.country = filter.country.value;
      }
  
      if (filter.datetime) {
        if (filter.datetime.year) {
          var datetime = filter.datetime;
          var d = new Date(datetime.year, datetime.month - 1, datetime.day);
          filter.datetime.value = d.format("yyyy-MM-dd");
          filter.datetime.name = d.format("yyyy-MM-dd");
        }
        state.date = filter.datetime;
      }
  
      this.setState(state, function () {
        _this.fetchList();
      });
    },
  
    render: function render() {
      var query = this.props.location.query;
  
      if (query.filter) {
        var props = {};
        props.countryValue = { name: _constants.countryCode2Str[this.state.country], value: this.state.country };
        props.datetimeValue = this.state.date;
  
        return _react2["default"].createElement(_pageletWidgetComponentsFilter2["default"], _extends({
          onOk: this.onFilter,
          country: true,
          datetime: true }, props));
      } else {
        return this.renderTop();
      }
    },
  
    renderTop: function renderTop() {
      var _this2 = this;
  
      var state = this.state;
  
      return _react2["default"].createElement(
        "div",
        { className: "c-page under-app-list" },
        _react2["default"].createElement(
          _pageletWidgetComponentsHeader2["default"],
          {
            location: this.props.location,
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
            _constants.countryCode2Str[this.state.country],
            "  ",
            this.state.date.name
          ),
          _react2["default"].createElement(
            "ul",
            { className: "list" },
            state.underAppList.map(function (item, idx) {
              return _react2["default"].createElement(_pageletWidgetComponentsAppItem2["default"], {
                type: 7,
                onItemClick: _this2.onItemClick,
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
