define("pagelet/underapp/store/store",function(t,e,i){"use strict";function n(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var r=t("reflux"),a=n(r),s=t("pagelet/underapp/action/action"),d=n(s),o=a["default"].createStore({init:function(){this.listenTo(d["default"].fetchUnderAppList,this.loading),this.listenTo(d["default"].fetchUnderAppListCmp,this.fetchUnderAppListCmp)},loading:function(){this.trigger({loading:!0})},fetchUnderAppListCmp:function(t){var e={loading:!1},i=t.data||[];e.underAppList=i.length?i:[],t&&"error"==t.statusText&&(e.errorText=t.statusText),this.trigger(e)}});e["default"]=o,i.exports=e["default"]});