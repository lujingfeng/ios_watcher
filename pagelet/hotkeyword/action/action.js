import Reflux from "reflux";
import $ from "/static/lib/jquery";

var HotKeywordAction = Reflux.createActions([
  "fetchList",
  "fetchListCmp"
]);

HotKeywordAction.fetchList.preEmit = function() {
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
        HotKeywordAction.fetchListCmp(res);
    });
};

export default HotKeywordAction;