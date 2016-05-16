import Reflux from "reflux";
import $ from "/static/lib/jquery";

var DetailAction = Reflux.createActions([
  "appInfo",
  "appInfoCmp",

  "realRank",
  "realRankCmp",

  "ranklatest",
  "ranklatestCmp",

  "commentDetail",
  "commentDetailCmp",

  "appLevel",
  "appLevelCmp",

  "detailVersion",
  "detailVersionCmp",

  "addFav",
  "addFavCmp",

  "isFav",
  "isFavCmp"
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

DetailAction.ranklatest.preEmit = (query={})=>{
  var params = {
    type: 'GET',
    url: SEARCH_HOST + '/ranklatest',
    data: query,
    dataType: 'json'
  }

  $.ajax(params).always(function( res ){
    DetailAction.ranklatestCmp(res);
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

DetailAction.isFav.preEmit = (id) => {
  var params = {
      type: 'GET',
      url: SEARCH_HOST + '/attention/is-attention',
      data: {
        appId: id
      },
      dataType: 'json'
  }

  $.ajax(params).always(function( res ){
      DetailAction.isFavCmp(res);
  });
};

export default DetailAction;
