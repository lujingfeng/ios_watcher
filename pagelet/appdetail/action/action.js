import Reflux from "reflux";
import $ from "/static/lib/jquery";

var DetailAction = Reflux.createActions([
  "appInfo",
  "appInfoCmp"
]);

DetailAction.appInfo.preEmit = function(appId, device) {
    var params = {
        type: 'GET',
        url: SEARCH_HOST + '/iosdetail',
        data:{
          appId: appId,
          device: device
        },
        dataType: 'json'
    }

    $.ajax(params).always(function( res ){
        DetailAction.appInfoCmp(res);
    });
};

export default DetailAction;
