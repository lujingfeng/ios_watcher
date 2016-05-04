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

    fetchListCmp: function(list){
      var total = 0;
      var searchResultList = list && list.length ? list.splice(0, list.length - 1) : [];

      if(list && list.length){
        total = parseInt(list[list.length - 1].hitscount);
      }
      this.trigger({
        loading: false,
        searchResultList: searchResultList,
        total: total
      });
    }
});

export default TopStore;