import Reflux from "reflux";
import SearchAction from "../action/action.js";

var SearchStore = Reflux.createStore({

    init: function(){
      this.listenTo(SearchAction.search, this.loading);
      this.listenTo(SearchAction.searchCmp, this.searchCmp);
    },
    
    loading: function() {
      this.trigger({ 
        loading: true
      });
    },

    searchCmp: function(list){
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

export default SearchStore;