import Reflux from "reflux";
import TopAction from "../action/action.js";

var TopStore = Reflux.createStore({

    init: function(){
      this.listenTo(TopAction.fetchList, this.loading);
      this.listenTo(TopAction.fetchListCmp, this.fetchListCmp);

      this.listenTo(TopAction.fetUpTopList, this.loading);
      this.listenTo(TopAction.fetDownTopList, this.loading);
    },
    
    loading: function() {
      this.trigger({ 
        loading: true
      });
    },

    fetchListCmp: function(res){
      var params = {loading: false};

      if(res.rank){
        params.list = res.rank ? res.rank : [];
      }

      this.trigger(params);
    }
});

export default TopStore;