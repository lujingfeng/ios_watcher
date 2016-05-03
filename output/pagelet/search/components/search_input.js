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
  
  var _pageletWidgetComponentsHeader = require("pagelet/widget/components/header.jsx");
  
  var _pageletWidgetComponentsHeader2 = _interopRequireDefault(_pageletWidgetComponentsHeader);
  
  var _pageletWidgetComponentsRank = require("pagelet/widget/components/rank.jsx");
  
  var _pageletWidgetComponentsRank2 = _interopRequireDefault(_pageletWidgetComponentsRank);
  
  var _pageletWidgetComponentsLoading = require("pagelet/widget/components/loading.jsx");
  
  var _pageletWidgetComponentsLoading2 = _interopRequireDefault(_pageletWidgetComponentsLoading);
  
  var _pageletSearchActionAction = require("pagelet/search/action/action");
  
  var _pageletSearchActionAction2 = _interopRequireDefault(_pageletSearchActionAction);
  
  var _pageletSearchStoreStore = require("pagelet/search/store/store");
  
  var _pageletSearchStoreStore2 = _interopRequireDefault(_pageletSearchStoreStore);
  
  var SearchItem = _react2["default"].createClass({
    displayName: "SearchItem",
  
    mixins: [_staticLibReactRouter.History],
  
    toDetail: function toDetail() {
      var query = Object.assign({}, this.props.data);
      this.history.pushState("", "detail/1", query);
    },
  
    render: function render() {
      var score = parseFloat(this.props.data.score || 0);
  
      return _react2["default"].createElement(
        "li",
        { className: "app-item", onClick: this.toDetail },
        _react2["default"].createElement(
          "table",
          null,
          _react2["default"].createElement(
            "tr",
            null,
            _react2["default"].createElement(
              "td",
              null,
              _react2["default"].createElement("img", {
                className: "app-icon",
                src: this.props.data.icon })
            ),
            _react2["default"].createElement(
              "td",
              null,
              _react2["default"].createElement(
                "p",
                {
                  className: "title ellipsis" },
                this.props.index + 1,
                "、",
                this.props.data.title
              ),
              _react2["default"].createElement(
                "p",
                { className: "f12 c666 m5 mb5" },
                this.props.data.developer
              ),
              _react2["default"].createElement(
                "div",
                null,
                _react2["default"].createElement(
                  "span",
                  { className: "t-vt c666 f12 mr5" },
                  "应用"
                ),
                _react2["default"].createElement(_pageletWidgetComponentsRank2["default"], { value: score, width: 14 }),
                _react2["default"].createElement(
                  "span",
                  { className: "c666 f12 ml5 t-vt" },
                  this.props.data.score
                )
              )
            )
          )
        )
      );
    }
  });
  
  var Search = _react2["default"].createClass({
    displayName: "Search",
  
    mixins: [_staticLibReactRouter.History],
  
    getInitialState: function getInitialState() {
      return {
        searchKey: null,
        deviceType: "iphone",
        searchResultList: [],
  
        page: 1,
        total: 0
      };
    },
  
    componentDidMount: function componentDidMount() {
      this.unSubscribe = _pageletSearchStoreStore2["default"].listen(this.onStateChange.bind(this));
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
      _pageletSearchActionAction2["default"].search(key, 1);
    },
  
    onChooseDevice: function onChooseDevice(deviceType) {
      this.setState({
        deviceType: deviceType
      });
    },
  
    onSearch: function onSearch(searchWord) {
      this.setState({
        searchKey: searchWord
      });
      _pageletSearchActionAction2["default"].search(searchWord, 1);
    },
  
    handleScroll: function handleScroll(e) {
      var _target = e.target;
  
      console.log(123213);
  
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
  
    render: function render() {
      var _this = this;
  
      var hotApps = ["微信", "去哪儿旅行", "爱奇艺", "神州租车", "贵催等全集", "微信", "去哪儿旅行", "爱奇艺", "神州租车", "贵催等全集"];
      var historySearch = hotApps;
  
      var _state = this.state;
      var deviceType = _state.deviceType;
      var searchResultList = _state.searchResultList;
  
      return _react2["default"].createElement(
        "div",
        { className: "c-page input-search" },
        _react2["default"].createElement(_pageletWidgetComponentsHeader2["default"], {
          searchValue: this.state.searchKey,
          onSearch: this.onSearch,
          onCancelSearch: function (e) {
            return _this.history.goBack();
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
            hotApps.map(function (item, idx) {
              return _react2["default"].createElement(
                "span",
                { key: idx, onClick: function () {
                    return _this.onTagSelected(item);
                  } },
                item
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
            historySearch.map(function (item, idx) {
              return _react2["default"].createElement(
                "span",
                { key: idx, onClick: function () {
                    return _this.onTagSelected(item);
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
          _react2["default"].createElement(
            "ul",
            { className: "device-type clearfix" },
            _react2["default"].createElement(
              "li",
              {
                onClick: function (e) {
                  return _this.onChooseDevice("iphone");
                },
                className: "fl " + (deviceType == "iphone" ? "cur" : "") },
              "iPhone"
            ),
            _react2["default"].createElement(
              "li",
              {
                onClick: function (e) {
                  return _this.onChooseDevice("ipad");
                },
                className: "fl " + (deviceType == "ipad" ? "cur" : "") },
              "iPad"
            )
          ),
          _react2["default"].createElement(
            "p",
            { className: "center c999 f12" },
            this.state.searchKey,
            ", ",
            this.state.total,
            "条结果 ",
            new Date().format("yyyy-MM-dd hh:mm:ss")
          ),
          _react2["default"].createElement(
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
                  "123213"
                ),
                _react2["default"].createElement(
                  "td",
                  null,
                  this.state.total
                )
              )
            )
          ),
          _react2["default"].createElement(
            "ul",
            null,
            searchResultList.map(function (item, idx) {
              return _react2["default"].createElement(SearchItem, { key: idx, data: item, index: idx });
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
