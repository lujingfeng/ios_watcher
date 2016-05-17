define('pagelet/compproduct/components/compare.jsx', function(require, exports, module) {

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
          data: [],
          top: "45%",
          itemWidth: 50
        },
  
        app_1: query.app_1,
        app_2: query.app_2,
  
        days: 30,
        country: _constants.countryCode.CHINA,
        payType: _constants.payType.FREE,
        device: _constants.deviceType.IPHONE
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
          console.log("filter");
          _this2.intChart(_this2.echarts);
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
        grid: [{ x: '12%', y: '10', width: '84%', height: '30%' }],
        tooltip: {},
        legend: this.state.legend,
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: []
        },
        yAxis: {},
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
  
      _actionAction2["default"].getCompare(_jquery2["default"].extend({
        appId: this.state.app_1.id
      }, params), this.state.app_1.title);
  
      _actionAction2["default"].getCompare(_jquery2["default"].extend({
        appId: this.state.app_2.id
      }, params), this.state.app_2.title);
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
  
        renderContent = _react2["default"].createElement(_pageletWidgetComponentsFilter2["default"], {
          onOk: this.onFilter,
          showPayMethod: true,
          device: true,
          country: true,
          datetime: true,
          days: true,
          category: true });
      } else {
        renderContent = this.renderCompare();
      }
  
      return renderContent;
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
            _react2["default"].createElement(_my_fav_item2["default"], { type: "comp", data: this.state.app_1 }),
            _react2["default"].createElement(_my_fav_item2["default"], { type: "comp", data: this.state.app_2 }),
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
                { className: "fr f10 c999" },
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
          _react2["default"].createElement("div", { ref: "chart", id: "cmp-chart", style: { width: "100%", height: 500 } })
        )
      );
    }
  });
  
  exports["default"] = AppCompare;
  module.exports = exports["default"];

});
