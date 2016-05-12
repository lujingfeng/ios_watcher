import Reflux from "reflux";
import $ from "/static/lib/jquery";

var SearchAction = Reflux.createActions([
  "search",
  "searchCmp",

  "fetchHotApp",
  "fetchHotAppCmp",
  
  "fetchHistory",
  "fetchHistoryCmp"
]);

SearchAction.search.preEmit = (serachKey, page=1, country, device) => {
  var params = {
    type: 'GET',
    url: SEARCH_HOST + '/iossercher',
    data:{
      param: serachKey,
      pageSize: 20,
      currentPage: page,
      country: country,
      device: device
    },
    dataType: 'json'
  }

  $.ajax(params).always(function( res ){
    SearchAction.searchCmp(res);
  });
};

SearchAction.fetchHotApp.preEmit = () => {
  var params = {
    type: 'GET',
    url: SEARCH_HOST + '/search/hotApp',
    data:{},
    dataType: 'json'
  }

  $.ajax(params).always(function( res ){
    SearchAction.fetchHotAppCmp(res);
  });
};

SearchAction.fetchHistory.preEmit = () => {
  var params = {
    type: 'GET',
    url: SEARCH_HOST + '/search/searchHistory',
    data:{},
    dataType: 'json'
  }

  $.ajax(params).always(function( res ){
    SearchAction.fetchHistoryCmp(res);
  });
};

export default SearchAction;
