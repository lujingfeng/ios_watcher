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
  
  var AppCompare = _react2["default"].createClass({
    displayName: "AppCompare",
  
    mixins: [_staticLibReactRouter.History],
  
    getInitialState: function getInitialState() {
      return {};
    },
  
    componentDidMount: function componentDidMount() {
      var _this = this;
  
      require.async(["static/lib/echarts.min"], function (echarts) {
        var chart = echarts.init(_this.refs.chart);
        // 指定图表的配置项和数据
        var option = {
          title: {
            text: ''
          },
          tooltip: {},
          legend: {},
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ["2012", "2013", "2014"]
          },
          yAxis: {},
          series: [{
            name: 'app1',
            smooth: true,
            type: 'line',
            data: [5, 400, 36]
          }, {
            name: 'app2',
            smooth: true,
            type: 'line',
            data: [3, 600, 20]
          }, {
            name: 'app3',
            smooth: true,
            type: 'line',
            data: [8, 1000, 800]
          }, {
            name: 'app2',
            smooth: true,
            type: 'line',
            data: [1, 200, 100]
          }]
        };
  
        // 使用刚指定的配置项和数据显示图表。
        chart.setOption(option);
      });
    },
  
    componentWillUnmount: function componentWillUnmount() {
      //this.unSubscribe();
    },
  
    onStateChange: function onStateChange(state) {
      this.setState(state);
    },
  
    render: function render() {
      var query = this.props.location.query || {};
  
      return _react2["default"].createElement(
        "div",
        { className: "c-page app-compare" },
        _react2["default"].createElement(
          _pageletWidgetComponentsHeader2["default"],
          { showSideNav: this.props.showSideNav },
          "竞品对比"
        ),
        _react2["default"].createElement(
          "div",
          { className: "c-body" },
          _react2["default"].createElement(
            "ul",
            { className: "clearfix rel" },
            _react2["default"].createElement(_my_fav_item2["default"], { type: "comp" }),
            _react2["default"].createElement(_my_fav_item2["default"], { type: "comp" }),
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
                "今日, 免费, 中国, 7天"
              ),
              _react2["default"].createElement("i", null),
              "排名趋势对比图"
            )
          ),
          _react2["default"].createElement("div", { ref: "chart", style: { width: "100%", height: 200 } })
        )
      );
    }
  });
  
  exports["default"] = AppCompare;
  module.exports = exports["default"];

});
