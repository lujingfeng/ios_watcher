import Reflux from "reflux";
import TopAction from "../action/action.js";

var TopStore = Reflux.createStore({

    init: function(){
      this.listenTo(TopAction.fetchList, this.loading);
      this.listenTo(TopAction.fetchListCmp, this.fetchListCmp);
    },
    
    loading: function() {
      this.trigger({ 
        loading: true
      });
    },

    fetchListCmp: function(res){
      var params = {loading: false};

      if(res.fee){
        params.feeList = res.fee.rank ? res.fee.rank : [];
      }

      if(res.free){
        params.list = res.free.rank ? res.free.rank : []
      }

      if(res.hot){
        params.list = res.hot.rank ? res.hot.rank : []
      }

      this.trigger(params);
    }
});

export default TopStore;