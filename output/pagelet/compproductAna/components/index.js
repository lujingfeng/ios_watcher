define('pagelet/compproductAna/components/index.jsx', function(require, exports, module) {

  /**
    * @require ../search.less
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
  
  var _pageletWidgetComponentsLoading = require("pagelet/widget/components/loading.jsx");
  
  var _pageletWidgetComponentsLoading2 = _interopRequireDefault(_pageletWidgetComponentsLoading);
  
  var _pageletWidgetComponentsTabs = require("pagelet/widget/components/tabs.jsx");
  
  var _pageletWidgetComponentsTabs2 = _interopRequireDefault(_pageletWidgetComponentsTabs);
  
  var _pageletWidgetComponentsAppItem = require("pagelet/widget/components/appItem.jsx");
  
  var _pageletWidgetComponentsAppItem2 = _interopRequireDefault(_pageletWidgetComponentsAppItem);
  
  var AppCompare = _react2["default"].createClass({
    displayName: "AppCompare",
  
    mixins: [_staticLibReactRouter.History],
  
    getInitialState: function getInitialState() {
      return {
        searchKey: null,
        equipment: 0,
        searchResultList: [],
  
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
  
    onSearch: function onSearch(searchWord) {
      this.setState({
        searchKey: searchWord,
        searchResultList: [],
        page: 1,
        total: 0
      });
      //SearchAction.search(searchWord, 1);
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
  
    onClickSearchItem: function onClickSearchItem(item) {
      var query = this.props.location.query || {};
      var params = Object.assign({}, item);
      var pathName = "/detail/";
  
      if (query.overlay) {
        pathName = pathName + "4";
      } else {
        pathName = pathName + "1";
      }
      params.equipment = this.state.equipment;
  
      this.history.pushState("", pathName, params);
    },
  
    render: function render() {
      var _this = this;
  
      var searchResultList = this.state.searchResultList;
  
      var query = this.props.location.query || {};
  
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
          {
            onScroll: this.handleScroll.bind(this),
            className: "search-result c-body",
            style: { display: this.state.searchKey ? "block" : "none" } },
          _react2["default"].createElement(_pageletWidgetComponentsTabs2["default"], { tabs: this.state.tabs, onSelect: this.onChooseDevice }),
          query && !query.overlay ? _react2["default"].createElement(
            "p",
            { className: "center c999 f12" },
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
                  "123213"
                ),
                _react2["default"].createElement(
                  "td",
                  null,
                  this.state.total
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
                onItemClick: _this.onClickSearchItem,
                data: item,
                index: idx });
            }),
            this.state.loading ? _react2["default"].createElement(_pageletWidgetComponentsLoading2["default"], null) : null
          )
        )
      );
    }
  });
  
  exports["default"] = AppCompare;
  module.exports = exports["default"];

});
