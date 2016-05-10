define('pagelet/top/components/top7DownList.jsx', function(require, exports, module) {

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
  
  var Top7DownList = _react2["default"].createClass({
    displayName: "Top7DownList",
  
    mixins: [_staticLibReactRouter.History],
  
    getInitialState: function getInitialState() {
      return {
        loading: false,
        tabs: [{ name: "免费榜", typeid: "" }, { name: "付费榜", typeid: "" }, { name: "畅销榜", typeid: "" }],
  
        list: [],
  
        genres: "",
        payType: _constants.payType.FREE,
        device: _constants.deviceType.IPHONE,
        country: _constants.countryCode.CHINA,
  
        page: 1,
        total: 0
      };
    },
  
    componentDidMount: function componentDidMount() {
      this.unSubscribe = _storeStore2["default"].listen(this.onStateChange.bind(this));
  
      _actionAction2["default"].fetDownTopList({
        genres: "",
        type: this.state.payType,
        device: this.state.device,
        country: this.state.country,
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
  
    loadMore: function loadMore() {},
  
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
  
      var list = this.state.list || [];
  
      return _react2["default"].createElement(
        "div",
        { className: "c-page top7-down-list" },
        _react2["default"].createElement(
          _pageletWidgetComponentsHeader2["default"],
          {
            filterEnabled: true,
            showSideNav: this.props.showSideNav },
          "七日排名下降榜"
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
            list.map(function (item, idx) {
              return _react2["default"].createElement(_pageletWidgetComponentsAppItem2["default"], {
                type: 2,
                onItemClick: _this.onItemClick,
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
