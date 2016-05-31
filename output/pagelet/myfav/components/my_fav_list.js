define('pagelet/myfav/components/my_fav_list.jsx', function(require, exports, module) {

  /**
    * @require pagelet/myfav/my_fav.less
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
  
  var _pageletWidgetComponentsPopup = require("pagelet/widget/components/popup.jsx");
  
  var _pageletWidgetComponentsPopup2 = _interopRequireDefault(_pageletWidgetComponentsPopup);
  
  var _staticMinxinsUtils = require("static/minxins/utils");
  
  var _constants = require("constants");
  
  var _pageletAppdetailActionAction = require("pagelet/appdetail/action/action");
  
  var _pageletAppdetailActionAction2 = _interopRequireDefault(_pageletAppdetailActionAction);
  
  var _pageletAppdetailStoreStore = require("pagelet/appdetail/store/store");
  
  var _pageletAppdetailStoreStore2 = _interopRequireDefault(_pageletAppdetailStoreStore);
  
  var _actionAction = require("pagelet/myfav/action/action");
  
  var _actionAction2 = _interopRequireDefault(_actionAction);
  
  var _storeStore = require("pagelet/myfav/store/store");
  
  var _storeStore2 = _interopRequireDefault(_storeStore);
  
  var MyFav = _react2["default"].createClass({
    displayName: "MyFav",
  
    mixins: [_staticLibReactRouter.History],
  
    getInitialState: function getInitialState() {
      return {
        loading: true,
        confirmVisible: false,
        list: []
      };
    },
  
    componentDidMount: function componentDidMount() {
      this.unSubscribe = _storeStore2["default"].listen(this.onStateChange.bind(this));
      _actionAction2["default"].fetFavLsit();
    },
  
    componentWillUnmount: function componentWillUnmount() {
      this.unSubscribe();
    },
  
    onStateChange: function onStateChange(state) {
      this.setState(state);
    },
  
    onDelete: function onDelete(data) {
      data.id = data.infoId || data.id;
      var id = data.id || data.appId;
  
      _pageletAppdetailActionAction2["default"].addFav(id, "cancel");
      var app = this.state.list.filter(function (item, idx) {
        item.id = item.id || item.appId;
        if (item.id == id) {
          return item;
        }
      })[0] || null;
      if (app) {
        this.state.list.splice(this.state.list.indexOf(app), 1);
        this.setState({ list: this.state.list });
      }
    },
  
    onItemClick: function onItemClick(item) {
      item.id = item.infoId || item.id;
  
      var query = this.props.location.query || {};
      var params = _jquery2["default"].extend({}, item);
      var pathName = "/detail/1";
  
      params.id = params.id || params.appId;
      params.device = _constants.deviceStrToint[params.device];
      params.country = _constants.countryToCode[params.country];
  
      this.history.pushState(null, pathName, params);
    },
  
    onTapMasker: function onTapMasker() {
      this.setState({
        confirmVisible: false
      });
    },
  
    onDeleteHandler: function onDeleteHandler(item) {
      this.setState({
        confirmVisible: true,
        selectedItem: item
      });
    },
  
    detete: function detete() {
      this.onDelete(this.state.selectedItem);
      this.setState({
        confirmVisible: false
      });
    },
  
    render: function render() {
      var _this = this;
  
      var query = this.props.location.query || {};
      var state = this.state;
  
      //用户名不存在
      if (!(0, _staticMinxinsUtils.getCookie)("uname")) {
        return null;
      }
  
      return _react2["default"].createElement(
        "div",
        { className: "c-page my-fav-page" },
        _react2["default"].createElement(
          _pageletWidgetComponentsHeader2["default"],
          {
            filterVisible: false,
            showSideNav: this.props.showSideNav },
          "我的关注"
        ),
        _react2["default"].createElement(
          "div",
          { className: "c-body" },
          this.state.list.map(function (item, idx) {
            return _react2["default"].createElement(_pageletWidgetComponentsAppItem2["default"], {
              onItemClick: _this.onItemClick,
              key: idx,
              data: item,
              type: 6,
              isShowDelete: true,
              onDelete: _this.onDeleteHandler });
          }),
          state.loading ? _react2["default"].createElement(_pageletWidgetComponentsLoading2["default"], null) : null,
          state.errorText ? _react2["default"].createElement(
            "p",
            { className: "center c999" },
            "暂无数据"
          ) : null,
          !state.loading && !state.list.length && !state.errorText ? _react2["default"].createElement(
            "p",
            { className: "center mt6 c999" },
            "您还未关注应用"
          ) : null
        ),
        this.state.confirmVisible ? _react2["default"].createElement(
          _pageletWidgetComponentsPopup2["default"],
          { ref: "confirm", onTapMasker: this.onTapMasker },
          _react2["default"].createElement(
            "div",
            { className: "c-confirm" },
            _react2["default"].createElement(
              "p",
              null,
              "您确定要删除应用关注吗？"
            ),
            _react2["default"].createElement(
              "div",
              null,
              _react2["default"].createElement(
                "button",
                { className: "btn normal", onClick: function (e) {
                    return _this.detete();
                  } },
                "删除"
              ),
              _react2["default"].createElement(
                "button",
                { className: "btn main-btn", onClick: this.onTapMasker },
                "取消"
              )
            )
          )
        ) : null
      );
    }
  });
  
  exports["default"] = MyFav;
  module.exports = exports["default"];

});
