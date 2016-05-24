define('pagelet/top/components/top7DownList.jsx', function(require, exports, module) {

  /**
    * @require pagelet/top/top.less
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
  
  var _actionAction = require("pagelet/top/action/action");
  
  var _actionAction2 = _interopRequireDefault(_actionAction);
  
  var _storeStore = require("pagelet/top/store/store");
  
  var _storeStore2 = _interopRequireDefault(_storeStore);
  
  var Top7DownList = _react2["default"].createClass({
    displayName: "Top7DownList",
  
    mixins: [_staticLibReactRouter.History],
  
    getInitialState: function getInitialState() {
      var tabs = [{ name: "免费榜", payType: _constants.payType.FREE }, { name: "付费榜", payType: _constants.payType.FEE }, { name: "畅销榜", payType: _constants.payType.HOT }];
      var defaultGenres = { name: "总榜", value: 1 };
  
      return {
        loading: false,
        flag: 2,
  
        tabIndex: 0,
        tabs: tabs,
  
        list: [],
  
        genres: defaultGenres,
        payType: _constants.payType.FREE,
        device: _constants.deviceType.IPHONE,
        country: _constants.countryCode.CHINA,
  
        page: 1,
        pageSize: 20
      };
    },
  
    componentDidMount: function componentDidMount() {
      this.unSubscribe = _storeStore2["default"].listen(this.onStateChange.bind(this));
      this.fetchList();
      (0, _staticMinxinsUtils.send)({
        type: "top",
        opra: "pv",
        label: "七日排名下降榜"
      });
    },
  
    componentWillUnmount: function componentWillUnmount() {
      this.unSubscribe();
    },
  
    fetchList: function fetchList() {
      _actionAction2["default"].fetDownTopList({
        genres: this.state.genres.name,
        type: this.state.payType,
        device: this.state.device,
        country: this.state.country
      });
    },
  
    onStateChange: function onStateChange(state) {
      this.setState(state);
    },
  
    handleScroll: function handleScroll(e) {
      var _target = e.target;
  
      if (_target.offsetHeight + _target.scrollTop + 10 >= _target.scrollHeight) {
        this.loadMore();
      }
    },
  
    loadMore: function loadMore() {
      var page = this.state.page + 1;
      this.setState({
        page: page
      });
    },
  
    onItemClick: function onItemClick(data) {
      var query = _jquery2["default"].extend({}, data);
      this.history.pushState("", "detail/1", query);
    },
  
    onSelectTab: function onSelectTab(tab, tabIndex) {
      var _this = this;
  
      this.setState({
        tabIndex: tabIndex,
        list: [],
        page: 1,
        payType: tab.payType
      }, function () {
        _this.fetchList();
      });
    },
  
    onFilter: function onFilter(filter) {
      var _this2 = this;
  
      var state = {
        list: [],
        page: 1
      };
  
      if (filter.device) {
        state.device = filter.device.value;
      }
      if (filter.country) {
        state.country = filter.country.value;
      }
  
      if (filter.category) {
        state.genres = filter.category;
      }
      this.setState(state, function () {
        _this2.fetchList();
      });
    },
  
    render: function render() {
      var query = this.props.location.query;
  
      if (query.filter) {
        var props = {
          location: this.props.location
        };
        props.device = props.country = props.category = true;
  
        props.categoryValue = this.state.genres;
        props.deviceValue = { name: _constants.deviceTypeStr[this.state.device], value: this.state.device };
        props.countryValue = { name: _constants.countryCode2Str[this.state.country], value: this.state.country };
  
        return _react2["default"].createElement(_pageletWidgetComponentsFilter2["default"], _extends({
          onOk: this.onFilter
        }, props));
      } else {
        return this.renderTop();
      }
    },
  
    renderTop: function renderTop() {
      var _this3 = this;
  
      var list = this.state.list || [];
  
      list = list.slice(0, this.state.page * this.state.pageSize);
  
      return _react2["default"].createElement(
        "div",
        { className: "c-page top7-up-list" },
        _react2["default"].createElement(
          _pageletWidgetComponentsHeader2["default"],
          {
            location: this.props.location,
            filterEnabled: true,
            showSideNav: this.props.showSideNav },
          "七日排名下降榜"
        ),
        _react2["default"].createElement(
          "div",
          { className: "c-body", onScroll: this.handleScroll },
          _react2["default"].createElement(_pageletWidgetComponentsTabs2["default"], {
            tabIndex: this.state.tabIndex,
            onSelect: this.onSelectTab,
            tabs: this.state.tabs }),
          _react2["default"].createElement(
            "p",
            { className: "f12 center f-txt" },
            _constants.deviceTypeStr[this.state.device],
            " ",
            _constants.countryCode2Str[this.state.country],
            " ",
            this.state.genres.name
          ),
          _react2["default"].createElement(
            "ul",
            { className: "list" },
            list.map(function (item, idx) {
              return _react2["default"].createElement(_pageletWidgetComponentsAppItem2["default"], {
                flag: _this3.state.flag,
                type: 2,
                onItemClick: _this3.onItemClick,
                index: idx,
                data: item });
            })
          ),
          this.state.loading ? _react2["default"].createElement(_pageletWidgetComponentsLoading2["default"], null) : null
        )
      );
    }
  });
  
  exports["default"] = Top7DownList;
  module.exports = exports["default"];

});
