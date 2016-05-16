import Reflux from "reflux";
import DetailAction from "../action/action.js";

var DetailStore = Reflux.createStore({

    init: function(){
      this.listenTo(DetailAction.appInfo, this.loading);
      this.listenTo(DetailAction.appInfoCmp, this.appInfoCmp);

      this.listenTo(DetailAction.appLevel, this.loading);
      this.listenTo(DetailAction.appLevelCmp, this.appLevelCmp);

      this.listenTo(DetailAction.commentDetail, this.loading);
      this.listenTo(DetailAction.commentDetailCmp, this.commentDetailCmp);

      this.listenTo(DetailAction.ranklatest, this.loading);
      this.listenTo(DetailAction.ranklatestCmp, this.ranklatestCmp);

      this.listenTo(DetailAction.detailVersion, this.loading);
      this.listenTo(DetailAction.detailVersionCmp, this.detailVersionCmp);

      //this.listenTo(DetailAction.isFav, this.loading);
      this.listenTo(DetailAction.isFavCmp, this.isFavCmp);
    },
    
    loading: function() {
      this.trigger({ 
        loading: true
      });
    },

    appInfoCmp: function(info){
      var params = {loading: false};

      if(info){
        params.detailInfo = info;
      }
      this.trigger(params);
    },

    detailVersionCmp: function(res){
      var params = {loading: false};
      var versions = [];

      if(res){
        var keys = Object.keys(res) || [];
        keys.forEach((item, idx)=>{
          versions.push({
            version: item,
            date: res[item]
          });
        });
        params.versions = versions;
      }
      this.trigger(params);
    },

    appLevelCmp: function(res){
      var params = {loading:false};

      if(res["当前版本"]){
        var data = res["当前版本"];
        var allCount = data.starCount;

        for(var i in allCount){
          var item = {};
          data[i] = item;
          item.count = parseInt(allCount[i]);
          item.percentage = item.count===0?item.count:(item.count / parseInt(data.totalCount));
        }

        params.cur = data;
      }

      if(res["历史版本"]){
        var data = res["历史版本"];
        var allCount = data.starCount;

        for(var i in allCount){
          var item = {};
          data[i] = item;
          item.count = parseInt(allCount[i]);
          item.percentage = item.count ===0 ? item.count: (item.count/ parseInt(data.totalCount));
        }
        params.history = data;
      }

      this.trigger(params);
    },

    commentDetailCmp: function(res){
      console.log(res);
      var array = [];
      var comment;

      if(comment = res.comment){
        for(var i in comment){
          array.push(comment[i]);
        }
      }

      var params = {loading: false};
      params.list = array;
      this.trigger(params);
    },

    ranklatestCmp: function(res){
      var params = {loading:false};

      if(res.data && res.data.length){
        params.top1 = res.data[0];
        params.top2 = res.data[1];
      }
      this.trigger(params);
    },

    isFavCmp: function(res){
      var params = {};
      if(res.status == 200){
        params.isFav = true;
      }
      this.trigger(params);
    }
});

export default DetailStore;