define("pagelet/top/store/store",function(t,e,i){"use strict";function n(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var o=t("reflux"),s=n(o),a=t("pagelet/top/action/action"),l=n(a),f=s["default"].createStore({init:function(){this.listenTo(l["default"].fetchList,this.loading),this.listenTo(l["default"].fetchListCmp,this.fetchListCmp),this.listenTo(l["default"].fetUpTopList,this.loading),this.listenTo(l["default"].fetDownTopList,this.loading)},loading:function(){this.trigger({loading:!0})},fetchListCmp:function(t,e){var i={loading:!1,flag:e};t.rank&&(i.list=t.rank?t.rank:[]),this.trigger(i)}});e["default"]=f,i.exports=e["default"]});