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

    getCompareCmp: function(res, appName){
      var params = {loading: false};
      var categoryMap = {};

      if(res.curday){
        var legend = {data:[]}
        var series = [];
        var xAxis = {
          type: 'category',
          boundaryGap: false,
          data: []
        };

        var clist = res.curday.data || [];
        for(var i=0; i< clist.length; i++){
          var rankData = clist[i].rankData;
          var data = [];
          for(var h=0; h< 24; h++){
            if(rankData[h]){
              data.push(rankData[h]);
            }else{
              data.push(0);
            }
            xAxis.data.push(h+"时");
          }

          series.push({
            name: clist[i].name,
            smooth: true,
            type: 'line',
            data: data
          });
          legend.data.push(clist[i].name);
        }

        params.series = series;
        params.xAxis = xAxis;
        params.legend = legend;

      }else if(res){
        for(var month in res){
          var mdataList = res[month];
          mdataList.forEach((item, idx)=>{
            for(var p in item){
              var key = appName.slice(0,5)+p;
              categoryMap[key] = categoryMap[key] || {data:[], title:[]};
              var listMap = item[p];
              for(var d in listMap){
                var rank = parseFloat(listMap[d]);
                categoryMap[key].data.push(rank || 0);
                var mkey = month.slice(4,6);
                categoryMap[key].title.push(mkey+"-"+d);
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

      console.log(params);

      this.trigger(params);
    }
});

export default CompareStore;