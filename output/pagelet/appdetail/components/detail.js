define('pagelet/appdetail/components/detail.jsx', function(require, exports, module) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
  
  var _react = require("react");
  
  var _react2 = _interopRequireDefault(_react);
  
  var _jquery = require("jquery");
  
  var _jquery2 = _interopRequireDefault(_jquery);
  
  var _reactRouter = require("reactRouter");
  
  var _pageletWidgetComponentsHeader = require("pagelet/widget/components/header.jsx");
  
  var _pageletWidgetComponentsHeader2 = _interopRequireDefault(_pageletWidgetComponentsHeader);
  
  var _baseinfo = require("pagelet/appdetail/components/baseinfo.jsx");
  
  var _baseinfo2 = _interopRequireDefault(_baseinfo);
  
  var _category = require("pagelet/appdetail/components/category.jsx");
  
  var _category2 = _interopRequireDefault(_category);
  
  var _appinfo = require("pagelet/appdetail/components/appinfo.jsx");
  
  var _appinfo2 = _interopRequireDefault(_appinfo);
  
  var _realrank = require("pagelet/appdetail/components/realrank.jsx");
  
  var _realrank2 = _interopRequireDefault(_realrank);
  
  var _version_log = require("pagelet/appdetail/components/version_log");
  
  var _version_log2 = _interopRequireDefault(_version_log);
  
  var _keywords = require("pagelet/appdetail/components/keywords.jsx");
  
  var _keywords2 = _interopRequireDefault(_keywords);
  
  var _comment = require("pagelet/appdetail/components/comment.jsx");
  
  var _comment2 = _interopRequireDefault(_comment);
  
  var _applevel = require("pagelet/appdetail/components/applevel.jsx");
  
  var _applevel2 = _interopRequireDefault(_applevel);
  
  var _pageletWidgetComponentsFilter = require("pagelet/widget/components/filter.jsx");
  
  var _pageletWidgetComponentsFilter2 = _interopRequireDefault(_pageletWidgetComponentsFilter);
  
  var _pageletWidgetComponentsDialog = require("pagelet/widget/components/dialog.jsx");
  
  var _pageletWidgetComponentsDialog2 = _interopRequireDefault(_pageletWidgetComponentsDialog);
  
  var _actionAction = require("pagelet/appdetail/action/action");
  
  var _actionAction2 = _interopRequireDefault(_actionAction);
  
  var _storeStore = require("pagelet/appdetail/store/store");
  
  var _storeStore2 = _interopRequireDefault(_storeStore);
  
  var AppDetail = _react2["default"].createClass({
    displayName: "AppDetail",
  
    mixins: [_reactRouter.History],
  
    getInitialState: function getInitialState() {
      return {
        realFilter: null,
        commentFilter: null
      };
    },
  
    componentDidMount: function componentDidMount() {
      //this.refs.favComfirm.show();
      this.unSubscribe = _storeStore2["default"].listen(this.onStateChange.bind(this));
    },
  
    componentWillUnmount: function componentWillUnmount() {
      this.unSubscribe();
    },
  
    onStateChange: function onStateChange(state) {
      if (state.isEight) {
        this.refs.favComfirm.show();
      }
    },
  
    onFilter: function onFilter(filter) {
      var params = this.props.params;
      if (params.module == 2) {
        this.setState({
          realFilter: filter
        });
      } else if (params.module == 5) {
        this.setState({
          commentFilter: filter
        });
      }
    },
  
    onFavOk: function onFavOk() {
      this.history.pushState(null, "/myfavlist");
    },
  
    render: function render() {
      var query = this.props.location.query;
      var state = this.state;
  
      if (query.filter) {
        var props = {};
        var params = this.props.params;
  
        if (params.module == 2) {
          var filter = this.state.realFilter;
          props.showPayMethod = props.device = props.country = props.days = true;
          props.payValue = filter && filter.pay ? filter.pay : { "name": "免费", value: "free" };
          props.deviceValue = filter && filter.device ? filter.device : { "name": "iPhone", value: 0 };
          props.countryValue = filter && filter.country ? filter.country : { "name": "中国", value: 1 };
          props.daysValue = filter && filter.days ? filter.days : { "name": "今天", value: 1 };
        } else if (params.module == 5) {
          props.days = true;
          props.score = true;
          var filter = state.commentFilter;
  
          props.daysValue = filter && filter.days ? filter.days : { name: "今天", value: 1 };
          props.scoreValue = filter && filter.score ? filter.score : [{ name: "1星", value: 1 }, { name: "2星", value: 2 }, { name: "3星", value: 3 }, { name: "4星", value: 4 }, { name: "5星", value: 5 }];
        }
  
        return _react2["default"].createElement(_pageletWidgetComponentsFilter2["default"], _extends({ onOk: this.onFilter }, props));
      } else {
        return this.renderDetail();
      }
    },
  
    renderDetail: function renderDetail() {
      var query = this.props.location.query;
      var params = this.props.params;
      var bottomView;
      var filterEnabled = false;
  
      if (params.module == 1) {
        bottomView = _react2["default"].createElement(_appinfo2["default"], { query: query });
      } else if (params.module == 2) {
        filterEnabled = true;
        bottomView = _react2["default"].createElement(_realrank2["default"], { query: query, filter: this.state.realFilter });
      } else if (params.module == 3) {
        bottomView = _react2["default"].createElement(_version_log2["default"], { query: query });
      } else if (params.module == 4) {
        bottomView = _react2["default"].createElement(_keywords2["default"], { query: query });
      } else if (params.module == 5) {
        filterEnabled = true;
        bottomView = _react2["default"].createElement(_comment2["default"], { query: query, filter: this.state.commentFilter });
      } else if (params.module == 6) {
        bottomView = _react2["default"].createElement(_applevel2["default"], { query: query });
      }
  
      return _react2["default"].createElement(
        "div",
        { className: "c-page c-app-detail" },
        _react2["default"].createElement(
          _pageletWidgetComponentsHeader2["default"],
          {
            location: this.props.location,
            filterEnabled: filterEnabled,
            showSideNav: this.props.showSideNav },
          "应用详情"
        ),
        _react2["default"].createElement(
          "div",
          { className: "c-body" },
          _react2["default"].createElement(_baseinfo2["default"], { query: query }),
          _react2["default"].createElement(_category2["default"], {
            query: query,
            ctyValue: params.module }),
          _react2["default"].createElement(
            "div",
            {
              className: "category-detail" },
            bottomView
          )
        ),
        _react2["default"].createElement(
          _pageletWidgetComponentsDialog2["default"],
          {
            ref: "favComfirm",
            okText: "管理应用",
            onOk: this.onFavOk,
            buttonkey: _pageletWidgetComponentsDialog2["default"].buttonKeys.CANCEL_OK },
          _react2["default"].createElement(
            "div",
            null,
            _react2["default"].createElement(
              "p",
              null,
              "您关注的应用超过8个"
            ),
            _react2["default"].createElement(
              "p",
              null,
              "请管理应用和联系客服"
            )
          )
        )
      );
    }
  });
  
  exports["default"] = AppDetail;
  module.exports = exports["default"];

});
