define('pagelet/search/components/search_input.jsx', function(require, exports, module) {

  /**
    * @require pagelet/search/search.less
    */
  
  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
  
  var _react = require("react");
  
  var _react2 = _interopRequireDefault(_react);
  
  var _staticLibReactRouter = require("reactRouter");
  
  var _jquery = require("jquery");
  
  var _jquery2 = _interopRequireDefault(_jquery);
  
  var _pageletWidgetComponentsHeader = require("pagelet/widget/components/header.jsx");
  
  var _pageletWidgetComponentsHeader2 = _interopRequireDefault(_pageletWidgetComponentsHeader);
  
  var _pageletWidgetComponentsLoading = require("pagelet/widget/components/loading.jsx");
  
  var _pageletWidgetComponentsLoading2 = _interopRequireDefault(_pageletWidgetComponentsLoading);
  
  var _pageletWidgetComponentsTabs = require("pagelet/widget/components/tabs.jsx");
  
  var _pageletWidgetComponentsTabs2 = _interopRequireDefault(_pageletWidgetComponentsTabs);
  
  var _pageletWidgetComponentsAppItem = require("pagelet/widget/components/appItem.jsx");
  
  var _pageletWidgetComponentsAppItem2 = _interopRequireDefault(_pageletWidgetComponentsAppItem);
  
  var _constants = require("constants");
  
  var _pageletSearchActionAction = require("pagelet/search/action/action");
  
  var _pageletSearchActionAction2 = _interopRequireDefault(_pageletSearchActionAction);
  
  var _pageletSearchStoreStore = require("pagelet/search/store/store");
  
  var _pageletSearchStoreStore2 = _interopRequireDefault(_pageletSearchStoreStore);
  
  var Search = _react2["default"].createClass({
    displayName: "Search",
  
    mixins: [_staticLibReactRouter.History],
  
    getInitialState: function getInitialState() {
      return {
        tabs: [{ name: "iPhone", value: _constants.deviceType.IPHONE }, { name: "iPad", value: _constants.deviceType.IPAD }],
  
        searchKey: null,
        device: _constants.deviceType.IPHONE,
        country: _constants.countryCode.CHINA,
  
        searchResultList: [],
        hotWords: [],
        records: [],
  
        page: 1,
        total: 0
      };
    },
  
    componentDidMount: function componentDidMount() {
      this.unSubscribe = _pageletSearchStoreStore2["default"].listen(this.onStateChange.bind(this));
      _pageletSearchActionAction2["default"].fetchHotApp();
      _pageletSearchActionAction2["default"].fetchHistory();
    },
  
    componentWillUnmount: function componentWillUnmount() {
      this.unSubscribe();
    },
  
    onStateChange: function onStateChange(state) {
      if (state.searchResultList) {
        state.searchResultList = this.state.searchResultList.concat(state.searchResultList);
      }
      this.setState(state);
    },
  
    onTagSelected: function onTagSelected(key) {
      this.setState({
        searchKey: key
      });
      _pageletSearchActionAction2["default"].search(key, 1, this.state.country, this.state.device);
  
      _pageletSearchActionAction2["default"].addHistory(key);
    },
  
    onChooseDevice: function onChooseDevice(tab) {
      var _this = this;
  
      this.setState({
        device: tab.value,
        searchResultList: []
      }, function () {
        _pageletSearchActionAction2["default"].search(_this.state.searchKey, 1, _this.state.country, _this.state.device);
      });
    },
  
    onSearch: function onSearch(searchWord) {
      this.setState({
        searchKey: searchWord,
        searchResultList: [],
        page: 1,
        total: 0
      });
  
      _pageletSearchActionAction2["default"].search(searchWord, 1, this.state.country, this.state.device);
  
      _pageletSearchActionAction2["default"].addHistory(searchWord);
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
  
      _pageletSearchActionAction2["default"].search(this.state.searchKey, page);
    },
  
    onClickSearchItem: function onClickSearchItem(item) {
      var query = this.props.location.query || {};
      var params = _jquery2["default"].extend({}, item);
      var pathName = "/detail/";
  
      if (query.overlay) {
        pathName = pathName + "4";
      } else {
        pathName = pathName + "1";
      }
  
      params.id = params.id || params.appId;
  
      params.device = this.state.device;
      params.country = _constants.countryToCode[params.country];
  
      this.history.pushState("", pathName, params);
    },
  
    render: function render() {
      var _this2 = this;
  
      var hotApps = ["微信", "去哪儿旅行", "爱奇艺", "神州租车", "贵催等全集", "微信", "去哪儿旅行", "爱奇艺", "神州租车", "贵催等全集"];
      var historySearch = hotApps;
  
      var _state = this.state;
      var deviceType = _state.deviceType;
      var searchResultList = _state.searchResultList;
  
      var query = this.props.location.query || {};
  
      return _react2["default"].createElement(
        "div",
        { className: "c-page input-search" },
        _react2["default"].createElement(_pageletWidgetComponentsHeader2["default"], {
          searchValue: this.state.searchKey,
          onSearch: this.onSearch,
          onCancelSearch: function (e) {
            return _this2.history.goBack();
          },
          type: "search" }),
        _react2["default"].createElement(
          "div",
          { className: "default-view", style: { display: this.state.searchKey ? "none" : "block" } },
          _react2["default"].createElement(
            "label",
            null,
            "热门应用"
          ),
          _react2["default"].createElement(
            "div",
            { className: "tags hot-app" },
            this.state.hotWords.map(function (item, idx) {
              return _react2["default"].createElement(
                "span",
                { key: idx, onClick: function () {
                    return _this2.onClickSearchItem(item);
                  } },
                item.title
              );
            })
          ),
          _react2["default"].createElement(
            "label",
            null,
            "历史搜索"
          ),
          _react2["default"].createElement(
            "div",
            { className: "tags history" },
            this.state.records.map(function (item, idx) {
              return _react2["default"].createElement(
                "span",
                { key: idx, onClick: function () {
                    return _this2.onTagSelected(item);
                  } },
                item
              );
            })
          )
        ),
        _react2["default"].createElement(
          "div",
          {
            onScroll: this.handleScroll.bind(this),
            className: "search-result c-body",
            style: { display: this.state.searchKey ? "block" : "none" } },
          _react2["default"].createElement(_pageletWidgetComponentsTabs2["default"], { tabs: this.state.tabs, onSelect: this.onChooseDevice }),
          query && !query.overlay ? _react2["default"].createElement(
            "p",
            { className: "center c999 f10" },
            this.state.searchKey,
            ", ",
            this.state.total,
            "条结果 ",
            new Date().format("yyyy-MM-dd hh:mm:ss")
          ) : null,
          query && !query.overlay ? _react2["default"].createElement(
            "div",
            { className: "keyword-desc" },
            _react2["default"].createElement(
              "table",
              { border: "1", cellSpacing: "0" },
              _react2["default"].createElement(
                "tr",
                null,
                _react2["default"].createElement(
                  "th",
                  null,
                  "关键字"
                ),
                _react2["default"].createElement(
                  "th",
                  null,
                  "搜索热度"
                ),
                _react2["default"].createElement(
                  "th",
                  null,
                  "搜索结果数"
                )
              ),
              _react2["default"].createElement(
                "tr",
                null,
                _react2["default"].createElement(
                  "td",
                  null,
                  this.state.searchKey
                ),
                _react2["default"].createElement(
                  "td",
                  null,
                  "-"
                ),
                _react2["default"].createElement(
                  "td",
                  null,
                  this.state.total || "-"
                )
              )
            )
          ) : null,
          _react2["default"].createElement(
            "ul",
            null,
            searchResultList.map(function (item, idx) {
              return _react2["default"].createElement(_pageletWidgetComponentsAppItem2["default"], {
                key: idx,
                type: query.overlay ? 3 : 1,
                onItemClick: _this2.onClickSearchItem,
                data: item,
                index: idx });
            }),
            this.state.loading ? _react2["default"].createElement(_pageletWidgetComponentsLoading2["default"], null) : null
          )
        )
      );
    }
  });
  
  exports["default"] = Search;
  module.exports = exports["default"];

});
