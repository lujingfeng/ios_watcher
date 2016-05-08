import Reflux from "reflux";
import $ from "/static/lib/jquery";

var UnderAppAction = Reflux.createActions([
  "fetchUnderAppList",
  "fetchUnderAppListCmp"
]);

UnderAppAction.fetchUnderAppList.preEmit = (query) => {

  var params = {
    type: 'GET',
    url: SEARCH_HOST + '/offshelve',
    data: query,
    dataType: 'json'
  };

  $.ajax(params).always(function(res){
    UnderAppAction.fetchUnderAppListCmp(res);
  });
};

export default UnderAppAction;
