import Reflux from "reflux";
import $ from "/static/lib/jquery";

var CompareAction = Reflux.createActions([
  "getCompare",
  "getCompareCmp"
]);

CompareAction.getCompare.preEmit = (query={}, title) => {
  var params = {
      type: 'GET',
      url: SEARCH_HOST + '/ioscompare',
      data: query,
      dataType: 'json'
  }

  $.ajax(params).always(function( res ){
      CompareAction.getCompareCmp(res, title);
  });
};

export default CompareAction;
