define('pagelet/compproduct/store/store', function(require, exports, module) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
  
  var _reflux = require("reflux");
  
  var _reflux2 = _interopRequireDefault(_reflux);
  
  var _actionAction = require("pagelet/compproduct/action/action");
  
  var _actionAction2 = _interopRequireDefault(_actionAction);
  
  var CompareStore = _reflux2["default"].createStore({
  
    init: function init() {
      this.listenTo(_actionAction2["default"].getCompare, this.loading);
      this.listenTo(_actionAction2["default"].getCompareCmp, this.getCompareCmp);
    },
  
    loading: function loading() {
      this.trigger({
        loading: true
      });
    },
  
    getCompareCmp: function getCompareCmp(res) {
      var params = { loading: false };
      var categoryMap = {};
  
      if (res) {
        for (var month in res) {
          var mdataList = res[month];
          mdataList.forEach(function (item, idx) {
            for (var p in item) {
              categoryMap[p] = categoryMap[p] || { data: [], title: [] };
              var listMap = item[p];
              for (var d in listMap) {
                var rank = parseFloat(listMap[d]);
                categoryMap[p].data.push(rank || 0);
                categoryMap[p].title.push(month + "-" + d);
              }
            }
          });
        }
  
        var legend = { data: [] };
        var series = [];
        var xAxis = {
          type: 'category',
          boundaryGap: false,
          data: []
        };
  
        for (var c in categoryMap) {
          var data = categoryMap[c].data.sort();
          var title = categoryMap[c].title.sort();
  
          var item = {
            name: c,
            smooth: true,
            type: 'line',
            data: data
          };
  
          series.push(item);
          xAxis.data = title.sort();
          legend.data.push(c);
        }
  
        params.series = series;
        params.xAxis = xAxis;
        params.legend = legend;
      }
  
      this.trigger(params);
    }
  });
  
  exports["default"] = CompareStore;
  module.exports = exports["default"];

});
