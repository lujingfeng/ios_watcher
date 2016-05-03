import Reflux from "reflux";
import $ from "/static/lib/jquery";

var SearchAction = Reflux.createActions([
  "search",
  "searchCmp"
]);

SearchAction.search.preEmit = function(serachKey, page) {
    var params = {
        type: 'GET',
        url: SEARCH_HOST + '/iossercher',
        data:{
          param: serachKey,
          pageSize: 20,
          currentPage: page
        },
        dataType: 'json'
    }

    $.ajax(params).always(function( res ){
        SearchAction.searchCmp(res);
    });
};

export default SearchAction;
