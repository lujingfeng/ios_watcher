define('pagelet/compproduct/components/index.jsx', function(require, exports, module) {

  /**
    * @require pagelet/compproduct/comp_analysis.less
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
  
  var _my_fav_item = require("pagelet/compproduct/components/my_fav_item.jsx");
  
  var _my_fav_item2 = _interopRequireDefault(_my_fav_item);
  
  var _pageletSearchActionAction = require("pagelet/search/action/action");
  
  var _pageletSearchActionAction2 = _interopRequireDefault(_pageletSearchActionAction);
  
  var _pageletSearchStoreStore = require("pagelet/search/store/store");
  
  var _pageletSearchStoreStore2 = _interopRequireDefault(_pageletSearchStoreStore);
  
  var AppCompare = _react2["default"].createClass({
    displayName: "AppCompare",
  
    mixins: [_staticLibReactRouter.History],
  
    getInitialState: function getInitialState() {
      return {
        searchKey: null,
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
  
    onSearch: function onSearch(searchWord) {
      this.setState({
        searchKey: searchWord,
        searchResultList: [],
        page: 1,
        total: 0
      });
      _pageletSearchActionAction2["default"].search(searchWord, 1);
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
  
    onClickFavItem: function onClickFavItem() {
      this.history.pushState(null, "/appcompare");
    },
  
    render: function render() {
      var _this = this;
  
      var _state = this.state;
      var searchResultList = _state.searchResultList;
      var searchKey = _state.searchKey;
  
      var query = this.props.location.query || {};
  
      return _react2["default"].createElement(
        "div",
        { className: "c-page comp-analysis" },
        _react2["default"].createElement(_pageletWidgetComponentsHeader2["default"], {
          searchValue: searchKey,
          onSearch: this.onSearch,
          onCancelSearch: function (e) {
            return _this.history.goBack();
          },
          type: "search" }),
        _react2["default"].createElement(_pageletWidgetComponentsAppItem2["default"], { type: 4, data: query }),
        _react2["default"].createElement(
          "div",
          {
            onScroll: this.handleScroll.bind(this),
            className: "search-result c-body" },
          _react2["default"].createElement(
            "ul",
            { style: { display: searchKey && searchResultList.length ? "block" : "none" } },
            searchResultList.map(function (item, idx) {
              return _react2["default"].createElement(_pageletWidgetComponentsAppItem2["default"], {
                key: idx,
                type: 5,
                onItemClick: _this.onClickSearchItem,
                data: item,
                index: idx });
            }),
            this.state.loading ? _react2["default"].createElement(_pageletWidgetComponentsLoading2["default"], null) : null
          ),
          _react2["default"].createElement(
            "ul",
            { className: "my-fav-list clearfix" },
            _react2["default"].createElement(_my_fav_item2["default"], { onClick: this.onClickFavItem }),
            _react2["default"].createElement(_my_fav_item2["default"], null),
            _react2["default"].createElement(_my_fav_item2["default"], null),
            _react2["default"].createElement(_my_fav_item2["default"], null),
            _react2["default"].createElement(_my_fav_item2["default"], null),
            _react2["default"].createElement(_my_fav_item2["default"], null)
          )
        )
      );
    }
  });
  
  exports["default"] = AppCompare;
  module.exports = exports["default"];

});