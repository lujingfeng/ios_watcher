import Reflux from "reflux";
import CompareAction from "../action/action";

var CompareStore = Reflux.createStore({

    init: function(){
      this.listenTo(CompareAction.getCompare, this.loading);
      this.listenTo(CompareAction.getCompareCmp, this.getCompareCmp);
    },
    
    loading: function() {
      this.trigger({ 
        loading: true
      });
    },

    getCompareCmp: function(res){
      var params = {loading: false};
      var categoryMap = {};

      if(res){
        for(var month in res){
          var mdataList = res[month];
          mdataList.forEach((item, idx)=>{
            for(var p in item){
              categoryMap[p] = categoryMap[p] || {data:[], title:[]};
              var listMap = item[p];
              for(var d in listMap){
                var rank = parseFloat(listMap[d]);
                categoryMap[p].data.push(rank || 0);
                categoryMap[p].title.push(month+"-"+d);
              }
            }
          });
        }

        var legend = {data:[]}
        var series = [];
        var xAxis = {
          type: 'category',
          boundaryGap: false,
          data: []
        };

        for(var c in categoryMap){
          var data = categoryMap[c].data.sort();
          var title = categoryMap[c].title.sort();

          var item = {
            name: c,
            smooth: true,
            type: 'line',
            data:data
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

export default CompareStore;