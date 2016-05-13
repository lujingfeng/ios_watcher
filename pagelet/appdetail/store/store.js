import Reflux from "reflux";
import DetailAction from "../action/action.js";

var DetailStore = Reflux.createStore({

    init: function(){
      this.listenTo(DetailAction.appInfo, this.loading);
      this.listenTo(DetailAction.appInfoCmp, this.appInfoCmp);

      this.listenTo(DetailAction.commentDetail, this.loading);
      this.listenTo(DetailAction.commentDetailCmp, this.commentDetailCmp);

      this.listenTo(DetailAction.appLevel, this.loading);
      this.listenTo(DetailAction.appLevelCmp, this.appLevelCmp);

      this.listenTo(DetailAction.detailVersion, this.loading);
      this.listenTo(DetailAction.detailVersionCmp, this.detailVersionCmp);
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

    },

    commentDetailCmp: function(res){

    }

});

export default DetailStore;