define('pagelet/appdetail/components/realrank.jsx', function(require, exports, module) {

  /**
    * @require pagelet/appdetail/detail.less
    */
  
  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
  
  var _react = require("react");
  
  var _react2 = _interopRequireDefault(_react);
  
  var _jquery = require("jquery");
  
  var _jquery2 = _interopRequireDefault(_jquery);
  
  var _actionAction = require("pagelet/appdetail/action/action");
  
  var _actionAction2 = _interopRequireDefault(_actionAction);
  
  var _storeStore = require("pagelet/appdetail/store/store");
  
  var _storeStore2 = _interopRequireDefault(_storeStore);
  
  var _constants = require("constants");
  
  var _pageletCompproductActionAction = require("pagelet/compproduct/action/action");
  
  var _pageletCompproductActionAction2 = _interopRequireDefault(_pageletCompproductActionAction);
  
  var _pageletCompproductStoreStore = require("pagelet/compproduct/store/store");
  
  var _pageletCompproductStoreStore2 = _interopRequireDefault(_pageletCompproductStoreStore);
  
  var RRank = _react2["default"].createClass({
    displayName: "RRank",
  
    getInitialState: function getInitialState() {
      var query = this.props.query;
      var filter = this.props.filter || {};
  
      return {
        top1: {},
        top2: {},
  
        series: [],
  
        legend: {
          data: [],
          top: "40%",
          itemWidth: 50
        },
  
        days: filter.days ? filter.days.value : 30,
        country: filter.country ? filter.country.value : _constants.countryCode.CHINA,
        payType: filter.pay ? filter.pay.value : _constants.payType.FREE,
        device: filter.device ? filter.device.value : _constants.deviceType.IPHONE
      };
    },
  
    componentDidMount: function componentDidMount() {
      var _this = this;
  
      this.unSubscribe = _storeStore2["default"].listen(this.onStateChange.bind(this));
  
      this.iosUnscribe = _pageletCompproductStoreStore2["default"].listen(this.onRankChange.bind(this));
  
      var query = this.props.query;
      require.async(["static/lib/echarts.min"], function (echarts) {
        _this.intChart(echarts);
      });
  
      _actionAction2["default"].ranklatest({
        id: query.id,
        country: query.country,
        device: query.device
      });
    },
  
    componentWillUnmount: function componentWillUnmount() {
      this.unSubscribe();
      this.iosUnscribe();
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
        grid: [{ x: '12%', y: 10, width: '84%', height: '30%' }],
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
  
      var query = this.props.query;
  
      var params = {
        interval: this.state.days,
        country: this.state.country,
        device: this.state.device,
        type: this.state.payType
      };
  
      if (params.interval == 1 || params.interval == -1) {
        //delete params.type;
        _pageletCompproductActionAction2["default"].getRankBy(_jquery2["default"].extend({
          id: query.id
        }, params), query.title);
      } else {
        _pageletCompproductActionAction2["default"].getCompare(_jquery2["default"].extend({
          appId: query.id
        }, params), query.title);
      }
    },
  
    onStateChange: function onStateChange(state) {
      this.setState(state);
    },
  
    onRankChange: function onRankChange(state) {
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
  
    render: function render() {
      return _react2["default"].createElement(
        "div",
        { className: "real-rank" },
        _react2["default"].createElement(
          "h5",
          { className: "title" },
          _react2["default"].createElement("i", null),
          "实时排名"
        ),
        _react2["default"].createElement(
          "table",
          { border: "1", cellSpacing: "0" },
          _react2["default"].createElement(
            "tr",
            null,
            _react2["default"].createElement("th", { style: { width: "auto" } }),
            _react2["default"].createElement(
              "th",
              null,
              this.state.top1.name || "-"
            ),
            _react2["default"].createElement(
              "th",
              null,
              this.state.top2.name || "-"
            )
          ),
          _react2["default"].createElement(
            "tr",
            null,
            _react2["default"].createElement(
              "td",
              null,
              "实时排名"
            ),
            _react2["default"].createElement(
              "td",
              null,
              _react2["default"].createElement(
                "p",
                { className: "mt6 f16" },
                this.state.top1.rank
              ),
              _react2["default"].createElement(
                "p",
                { className: "f12 c999 mb6" },
                this.state.top1.time
              )
            ),
            _react2["default"].createElement(
              "td",
              null,
              _react2["default"].createElement(
                "p",
                { className: "m6 f16" },
                this.state.top2.rank
              ),
              _react2["default"].createElement(
                "p",
                { className: "f12 c999 mb6" },
                this.state.top2.time
              )
            )
          )
        ),
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
          "排名趋势"
        ),
        _react2["default"].createElement("div", { ref: "chart", style: { width: "100%", height: 500 } })
      );
    }
  });
  
  exports["default"] = RRank;
  module.exports = exports["default"];

});
