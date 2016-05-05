import Reflux from "reflux";
import DetailAction from "../action/action.js";

var DetailStore = Reflux.createStore({

    init: function(){
      this.listenTo(DetailAction.appInfo, this.loading);
      this.listenTo(DetailAction.appInfoCmp, this.appInfoCmp);
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
    }
});

export default DetailStore;