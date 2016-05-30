define('pagelet/compproduct/components/compare.jsx', function(require, exports, module) {

  /**
    * @require pagelet/compproduct/comp_analysis.less
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
  
  var _pageletWidgetComponentsLoading = require("pagelet/widget/components/loading.jsx");
  
  var _pageletWidgetComponentsLoading2 = _interopRequireDefault(_pageletWidgetComponentsLoading);
  
  var _pageletWidgetComponentsTabs = require("pagelet/widget/components/tabs.jsx");
  
  var _pageletWidgetComponentsTabs2 = _interopRequireDefault(_pageletWidgetComponentsTabs);
  
  var _pageletWidgetComponentsAppItem = require("pagelet/widget/components/appItem.jsx");
  
  var _pageletWidgetComponentsAppItem2 = _interopRequireDefault(_pageletWidgetComponentsAppItem);
  
  var _constants = require("constants");
  
  var _pageletWidgetComponentsFilter = require("pagelet/widget/components/filter.jsx");
  
  var _pageletWidgetComponentsFilter2 = _interopRequireDefault(_pageletWidgetComponentsFilter);
  
  var _my_fav_item = require("pagelet/compproduct/components/my_fav_item.jsx");
  
  var _my_fav_item2 = _interopRequireDefault(_my_fav_item);
  
  var _actionAction = require("pagelet/compproduct/action/action");
  
  var _actionAction2 = _interopRequireDefault(_actionAction);
  
  var _storeStore = require("pagelet/compproduct/store/store");
  
  var _storeStore2 = _interopRequireDefault(_storeStore);
  
  var AppCompare = _react2["default"].createClass({
    displayName: "AppCompare",
  
    mixins: [_staticLibReactRouter.History],
  
    getInitialState: function getInitialState() {
      var query = this.props.location.query;
  
      return {
        series: [],
  
        legend: {
          formatter: function formatter(name) {
            return name;
          },
          orient: "vertical",
          data: [],
          top: "65%",
          itemWidth: 50
        },
  
        app_1: query.app_1,
        app_2: query.app_2,
  
        days: query.days ? query.days.value : 1,
        country: query.country ? query.country.value : _constants.countryCode.CHINA,
        payType: query.pay ? query.pay.value : _constants.payType.FREE,
        device: query.device ? query.device.value : _constants.deviceType.IPHONE
      };
    },
  
    componentDidMount: function componentDidMount() {
      var _this2 = this;
  
      var _this = this;
      this.unSubscribe = _storeStore2["default"].listen(this.onStateChange.bind(this));
      require.async(["static/lib/echarts.min"], function (echarts) {
        _this2.echarts = echarts;
        _this2.intChart(echarts);
      });
      this.history.listen(function () {
        var query = _this2.props.location.query;
        if (!query.filter) {
          setTimeout(function () {
            _this2.intChart(_this2.echarts);
          }, 50);
        } else {
          _this2.state.legend.data = [];
          _this2.state.series = [];
        }
      });
    },
  
    componentWillUnmount: function componentWillUnmount() {
      this.unSubscribe();
    },
  
    intChart: function intChart(echarts) {
      if (!this.refs.chart || this.chart || !echarts) {
        return;
      }
      this.chart = echarts.init(this.refs.chart);
      // 指定图表的配置项和数据
      var option = {
        title: {
          text: ''
        },
        geo: { top: 0 },
        grid: {
          top: '5',
          left: '1%',
          height: 150,
          right: '6%',
          bottom: '5%',
          containLabel: true
        },
        tooltip: {},
        legend: this.state.legend,
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: []
        },
        yAxis: {
          scale: true,
          splitArea: {
            show: true
          },
          min: 0
        },
        series: []
      };
  
      //使用刚指定的配置项和数据显示图表。
      this.chart.setOption(option);
  
      var params = {
        interval: this.state.days,
        country: this.state.country,
        device: this.state.device,
        type: this.state.payType
      };
  
      if (params.interval == 1 || params.interval == -1) {
        //delete params.type;
        _actionAction2["default"].getRankBy(_jquery2["default"].extend({
          id: this.state.app_1.id
        }, params), this.state.app_1.title);
  
        _actionAction2["default"].getRankBy(_jquery2["default"].extend({
          id: this.state.app_2.id
        }, params), this.state.app_2.title);
      } else {
        _actionAction2["default"].getCompare(_jquery2["default"].extend({
          appId: this.state.app_1.id
        }, params), this.state.app_1.title);
  
        _actionAction2["default"].getCompare(_jquery2["default"].extend({
          appId: this.state.app_2.id
        }, params), this.state.app_2.title);
      }
    },
  
    onStateChange: function onStateChange(state) {
      if (state.series) {
        this.state.series = this.state.series.concat(state.series);
        this.state.legend.data = this.state.legend.data.concat(state.legend.data);
  
        this.chart.setOption({
          xAxis: state.xAxis,
          series: this.state.series,
          legend: this.state.legend
        });
      }
    },
  
    onFilter: function onFilter(selected) {
      var state = {};
      if (selected.days) {
        state.days = selected.days.value;
      }
      if (selected.country) {
        state.country = selected.country.value;
      }
      if (selected.pay) {
        state.payType = selected.pay.value;
      }
      if (selected.device) {
        state.device = selected.device.value;
      }
  
      this.setState(state);
    },
  
    render: function render() {
      var query = this.props.location.query;
  
      var renderContent;
  
      if (query.filter) {
        this.chart && this.chart.dispose();
        this.chart = null;
        var props = {};
  
        props.showPayMethod = props.device = props.days = props.country = true;
  
        props.payValue = { name: _constants.payTypeToStr[this.state.payType], value: this.state.payType };
        props.deviceValue = { name: _constants.deviceTypeStr[this.state.device], value: this.state.device };
        props.daysValue = { name: _constants.days2Str[this.state.days], value: this.state.days };
        props.countryValue = { name: _constants.countryCode2Str[this.state.country], value: this.state.country };
  
        renderContent = _react2["default"].createElement(_pageletWidgetComponentsFilter2["default"], _extends({
          location: this.props.location,
          onOk: this.onFilter
        }, props));
      } else {
        renderContent = this.renderCompare();
      }
  
      return renderContent;
    },
  
    toDetail: function toDetail(data) {
      data.id = data.id || data.appId;
      var pathName = "/detail/1";
  
      this.history.pushState(null, pathName, data);
    },
  
    renderCompare: function renderCompare() {
      var query = this.props.location.query || {};
  
      return _react2["default"].createElement(
        "div",
        { className: "c-page app-compare" },
        _react2["default"].createElement(
          _pageletWidgetComponentsHeader2["default"],
          {
            location: this.props.location,
            filterEnabled: true,
            showSideNav: this.props.showSideNav },
          "竞品对比"
        ),
        _react2["default"].createElement(
          "div",
          { className: "c-body" },
          _react2["default"].createElement(
            "ul",
            { className: "clearfix rel" },
            _react2["default"].createElement(_my_fav_item2["default"], {
              type: "comp",
              data: this.state.app_1,
              onClick: this.toDetail }),
            _react2["default"].createElement(_my_fav_item2["default"], {
              type: "comp",
              data: this.state.app_2,
              onClick: this.toDetail }),
            _react2["default"].createElement("i", { className: "icon-vs" })
          ),
          _react2["default"].createElement(
            "div",
            { className: "content" },
            _react2["default"].createElement(
              "h5",
              { className: "title" },
              _react2["default"].createElement(
                "p",
                { className: "fr f10" },
                _constants.deviceTypeStr[this.state.device],
                "  ",
                _constants.payTypeToStr[this.state.payType],
                "  ",
                _constants.countryCode2Str[this.state.country],
                "  ",
                _constants.days2Str[this.state.days]
              ),
              _react2["default"].createElement("i", null),
              "排名趋势对比图"
            )
          ),
          _react2["default"].createElement("div", { ref: "chart", id: "cmp-chart", style: { width: "100%", height: 250 } })
        )
      );
    }
  });
  
  exports["default"] = AppCompare;
  module.exports = exports["default"];

});
