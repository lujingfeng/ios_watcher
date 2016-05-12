import Reflux from "reflux";
import $ from "/static/lib/jquery";

var FavAction = Reflux.createActions([
  "fetFavLsit",
  "fetFavLsitCmp"
]);

FavAction.fetFavLsit.preEmit = (query={}) => {
  var params = {
    type: 'GET',
    url: SEARCH_HOST + '/attention/attention-list',
    data: query,
    dataType: 'json'
  }

  $.ajax(params).always(function( res ){
    FavAction.fetFavLsitCmp(res);
  });
};

export default FavAction;