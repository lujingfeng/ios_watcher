import Reflux from "reflux";
import $ from "/static/lib/jquery";

var DetailAction = Reflux.createActions([
  "appInfo",
  "appInfoCmp",

  "realRank",
  "realRankCmp",

  "commentDetail",
  "commentDetailCmp",

  "appLevel",
  "appLevelCmp"
]);

DetailAction.appInfo.preEmit = function(id, device, country) {
  var params = {
    type: 'GET',
    url: SEARCH_HOST + '/iosdetail',
    data:{
      appId: id,
      device: device,
      country: country
    },
    dataType: 'json'
  };

  $.ajax(params).always(function( res ){
    DetailAction.appInfoCmp(res);
  });
};

DetailAction.realRank.preEmit = (query={}) => {
  var params = {
    type: 'GET',
    url: SEARCH_HOST + '/apprank',
    data: query,
    dataType: 'json'
  }

  $.ajax(params).always(function( res ){
    DetailAction.realRankCmp(res);
  });
};

DetailAction.commentDetail.preEmit = (query={}) => {
  var params = {
      type: 'GET',
      url: SEARCH_HOST + '/appcomment',
      data: query,
      dataType: 'json'
  }

  $.ajax(params).always(function( res ){
      DetailAction.commentDetailCmp(res);
  });
};

DetailAction.appLevel.preEmit = (query={}) => {
  var params = {
      type: 'GET',
      url: SEARCH_HOST + '/appscore',
      data: query,
      dataType: 'json'
  }

  $.ajax(params).always(function( res ){
      DetailAction.appLevelCmp(res);
  });
};

export default DetailAction;
