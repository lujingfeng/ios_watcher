import Reflux from "reflux";
import $ from "/static/lib/jquery";

var DetailAction = Reflux.createActions([
  "appInfo",
  "appInfoCmp"
]);

DetailAction.appInfo.preEmit = function(appId, equipment) {
    var params = {
        type: 'GET',
        url: SEARCH_HOST + '/iosdetail',
        data:{
          appid: appId,
          equipment: equipment
        },
        dataType: 'json'
    }

    $.ajax(params).always(function( res ){
        DetailAction.appInfoCmp(res);
    });
};

export default DetailAction;
