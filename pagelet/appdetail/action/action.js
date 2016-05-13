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
  "appLevelCmp",

  "detailVersion",
  "detailVersionCmp",

  "addFav",
  "addFavCmp"
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

DetailAction.detailVersion.preEmit = (query={}) => {
  var params = {
      type: 'GET',
      url: SEARCH_HOST + '/iosversiondetail',
      data: query,
      dataType: 'json'
  }

  $.ajax(params).always(function( res ){
      DetailAction.detailVersionCmp(res);
  });
};

DetailAction.addFav.preEmit = (appId, attention) => {
  var params = {
      type: 'GET',
      url: SEARCH_HOST + '/attention/attention-app',
      data: {
        appId: appId,
        type: attention
      },
      dataType: 'json'
  }

  $.ajax(params).always(function( res ){
      DetailAction.addFavCmp(res);
  });
};

export default DetailAction;
