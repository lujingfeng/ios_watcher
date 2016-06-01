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
  
    getCompareCmp: function getCompareCmp(res, appName) {
      var params = { loading: false };
      var categoryMap = {};
  
      var oneData = res.curday || res.yesterday;
      if (oneData && oneData.data && oneData.data.length > 0) {
        var legend = { data: [] };
        var series = [];
        var xAxis = {
          type: 'category',
          boundaryGap: false,
          data: []
        };
  
        var clist = oneData.data || [];
        for (var i = 0; i < clist.length; i++) {
          var rankData = clist[i].rankData;
          var data = [];
  
          for (var h = 0; h < 24; h++) {
            if (rankData[h]) {
              data.push(rankData[h]);
              xAxis.data.push(h + "时");
            }
          }
  
          var title = appName ? appName.substring(0, 5) + "(" + clist[i].name + ")" : clist[i].name;
  
          series.push({
            name: title,
            smooth: true,
            type: 'line',
            data: data
          });
          legend.data.push({
            name: title,
            icon: "line"
          });
        }
  
        params.series = series;
        params.xAxis = xAxis;
        params.legend = legend;
  
        console.log(params);
      } else if (res && !res.curday && !res.yesterday) {
        for (var month in res) {
          var mdataList = res[month];
          mdataList.forEach(function (item, idx) {
            for (var p in item) {
              var key = appName.slice(0, 5) + "(" + p + ")";
              categoryMap[key] = categoryMap[key] || { data: [], title: [] };
              var listMap = item[p];
              for (var d in listMap) {
                var rank = parseFloat(listMap[d]);
                categoryMap[key].data.push(rank || 0);
                var mkey = month.slice(4, 6);
                categoryMap[key].title.push(mkey + "-" + d);
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
          legend.data.push({
            name: c,
            icon: "line"
          });
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
