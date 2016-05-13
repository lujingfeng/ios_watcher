import Reflux from "reflux";
import SearchAction from "../action/action.js";

var SearchStore = Reflux.createStore({

    init: function(){
      this.listenTo(SearchAction.search, this.loading);
      this.listenTo(SearchAction.searchCmp, this.searchCmp);

      this.listenTo(SearchAction.fetchHotApp, this.loading);
      this.listenTo(SearchAction.fetchHotAppCmp, this.fetchHotAppCmp);

      this.listenTo(SearchAction.fetchHistory, this.loading);
      this.listenTo(SearchAction.fetchHistoryCmp, this.fetchHistoryCmp);

      this.listenTo(SearchAction.addHistory, this.addHistory);
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
    },

    fetchHotAppCmp:function(res){
      var params = {loading:false};
      if(res && res.hotWords){
        params.hotWords = res.hotWords||[];
      }
      this.trigger(params);
    },

    fetchHistoryCmp: function(res){
      var params = {loading:false};
      if(res && res.records){
        params.records = res.records||[];
      }
      this.trigger(params);
    }
});

export default SearchStore;