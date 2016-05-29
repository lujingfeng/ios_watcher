define("pagelet/appdetail/store/store",function(t,i,a){"use strict";function e(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(i,"__esModule",{value:!0});var n=t("reflux"),o=e(n),s=t("pagelet/appdetail/action/action"),l=e(s),r=o["default"].createStore({init:function(){this.listenTo(l["default"].appInfo,this.loading),this.listenTo(l["default"].appInfoCmp,this.appInfoCmp),this.listenTo(l["default"].appLevel,this.loading),this.listenTo(l["default"].appLevelCmp,this.appLevelCmp),this.listenTo(l["default"].commentDetail,this.loading),this.listenTo(l["default"].commentDetailCmp,this.commentDetailCmp),this.listenTo(l["default"].ranklatest,this.loading),this.listenTo(l["default"].ranklatestCmp,this.ranklatestCmp),this.listenTo(l["default"].detailVersion,this.loading),this.listenTo(l["default"].detailVersionCmp,this.detailVersionCmp),this.listenTo(l["default"].isFavCmp,this.isFavCmp),this.listenTo(l["default"].addFavCmp,this.addFavCmp)},loading:function(){this.trigger({loading:!0})},appInfoCmp:function(t){var i={loading:!1};t&&(i.detailInfo=t),this.trigger(i)},detailVersionCmp:function(t){var i={loading:!1};t&&(i.versions=t),this.trigger(i)},appLevelCmp:function(t){var i={loading:!1};if(t["当前版本"]){var a=t["当前版本"],e=a.starCount;for(var n in e){var o={};a[n]=o,o.count=parseInt(e[n]),o.percentage=0===o.count?o.count:o.count/parseInt(a.totalCount)}i.cur=a}if(t["历史版本"]){var a=t["历史版本"],e=a.starCount;for(var n in e){var o={};a[n]=o,o.count=parseInt(e[n]),o.percentage=0===o.count?o.count:o.count/parseInt(a.totalCount)}i.history=a}this.trigger(i)},commentDetailCmp:function(t){console.log(t);var i,a=[];if(i=t.comment)for(var e in i)a.push(i[e]);var n={loading:!1};n.list=a,this.trigger(n)},ranklatestCmp:function(t){var i={loading:!1};t.data&&t.data.length&&(i.top1=t.data[0],i.top2=t.data[1]),this.trigger(i)},addFavCmp:function(t){var i={isEight:300==t.status?!0:!1};this.trigger(i)},isFavCmp:function(t){var i={};200==t.status&&(i.isFav=!0),this.trigger(i)}});i["default"]=r,a.exports=i["default"]});