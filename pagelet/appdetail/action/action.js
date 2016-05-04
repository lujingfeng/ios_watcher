import Reflux from "reflux";
import $ from "/static/lib/jquery";

var DetailAction = Reflux.createActions([
  "appInfo",
  "appInfoCmp"
]);

DetailAction.appInfo.preEmit = function() {
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
        DetailAction.appInfoCmp(res);
    });
};

export default DetailAction;
