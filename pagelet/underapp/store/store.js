import Reflux from "reflux";
import UnderAppAction from "../action/action.js";

var UnderAppStore = Reflux.createStore({

    init: function(){
      this.listenTo(UnderAppAction.fetchUnderAppList, this.loading);
      this.listenTo(UnderAppAction.fetchUnderAppListCmp, this.fetchUnderAppListCmp);
    },
    
    loading: function() {
      this.trigger({ 
        loading: true
      });
    },

    fetchUnderAppListCmp: function(res){
      var params = {loading:false};
      var underAppList = res.data || [];
      
      params.underAppList = underAppList.length?underAppList:[];
      
      this.trigger(params);
    }
});

export default UnderAppStore;