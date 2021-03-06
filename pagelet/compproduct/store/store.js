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

      var oneData = res.curday || res.yesterday;
      if(oneData && oneData.data && oneData.data.length>0){
        var legend = {data:[]}
        var series = [];
        var xAxis = {
          type: 'category',
          boundaryGap: false,
          data: []
        };

        var clist = oneData.data || [];
        for(var i=0; i< clist.length; i++){
          var rankData = clist[i].rankData;
          var data = [];

          for(var h=0; h < 24; h++){
            if(rankData[h]){
              data.push(rankData[h]);
              xAxis.data.push(h+"时");
            }
          }

          if(appName && appName.length > 5){
            appName = appName.substring(0, 5) + "...";
          }

          var title = appName?(appName+"("+clist[i].name+")"):clist[i].name;

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

      }else if(res && !res.curday && !res.yesterday){
        for(var month in res){
          var mdataList = res[month]||[];
          mdataList.forEach((item, idx)=>{
            for(var p in item){
              var key = appName.length > 5?(appName.slice(0,5)+"...("+p+")"):(appName+"("+p+")");
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

export default CompareStore;