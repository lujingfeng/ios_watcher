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

      this.listenTo(SearchAction.searchWordHot, function(){});
      this.listenTo(SearchAction.searchWordHotCmp, this.searchWordHotCmp);

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
      var params = {loading: false};

      if(list && list.length){
        total = parseInt(list[list.length - 1].hitscount);
        params.total = total;
      }

      params.searchResultList = searchResultList;
      this.trigger(params);
    },

    fetchHotAppCmp:function(res){
      var params = {loading:false};
      if(res && res.hotWords){
        params.hotWords = res.hotWords||[];
      }
      if(res && res.statusText == "error"){
        params.errorText = res.statusText;
      }
      this.trigger(params);
    },

    fetchHistoryCmp: function(res){
      var params = {loading:false};
      if(res && res.records){
        params.records = res.records||[];
      }
      if(res && res.statusText == "error"){
        params.errorText = res.statusText;
      }
      this.trigger(params);
    },
    searchWordHotCmp: function( res ){
      var params = {};

      if(res.hot){
        params.hot = res.hot;
      }
      this.trigger(params);
    }
});

export default SearchStore;