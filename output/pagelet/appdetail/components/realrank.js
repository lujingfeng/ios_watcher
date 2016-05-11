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
  
  var _actionAction = require("pagelet/appdetail/action/action");
  
  var _actionAction2 = _interopRequireDefault(_actionAction);
  
  var _storeStore = require("pagelet/appdetail/store/store");
  
  var _storeStore2 = _interopRequireDefault(_storeStore);
  
  var _constants = require("constants");
  
  var RRank = _react2["default"].createClass({
    displayName: "RRank",
  
    componentDidMount: function componentDidMount() {
      var _this = this;
  
      var query = this.props.query;
  
      require.async(["static/lib/echarts.min"], function (echarts) {
        var rankChart = echarts.init(_this.refs.rank);
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
            name: 'rank',
            smooth: true,
            type: 'line',
            data: [5, 20, 36]
          }]
        };
  
        // 使用刚指定的配置项和数据显示图表。
        rankChart.setOption(option);
  
        _actionAction2["default"].realRank({
          country: query.country,
          device: query.device,
          id: query.id
        });
      });
    },
  
    componentWillUnmount: function componentWillUnmount() {},
  
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
            _react2["default"].createElement("th", null),
            _react2["default"].createElement(
              "th",
              null,
              "总榜（免费）"
            ),
            _react2["default"].createElement(
              "th",
              null,
              "软件（免费）"
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
                { className: "m10 f16" },
                "1500"
              ),
              _react2["default"].createElement(
                "p",
                { className: "f12 c999 mb10" },
                "2015-01-08前"
              )
            ),
            _react2["default"].createElement(
              "td",
              null,
              _react2["default"].createElement(
                "p",
                { className: "m10 f16" },
                "1200"
              ),
              _react2["default"].createElement(
                "p",
                { className: "f12 c999 mb10" },
                "2015-01-08前"
              )
            )
          )
        ),
        _react2["default"].createElement(
          "h5",
          { className: "title" },
          _react2["default"].createElement("i", null),
          "排名趋势"
        ),
        _react2["default"].createElement("div", { ref: "rank", style: { width: "100%", height: 200 } })
      );
    }
  });
  
  exports["default"] = RRank;
  module.exports = exports["default"];

});
