define("pagelet/compproduct/store/store",function(a,t,e){"use strict";function r(a){return a&&a.__esModule?a:{"default":a}}Object.defineProperty(t,"__esModule",{value:!0});var o=a("reflux"),i=r(o),n=a("pagelet/compproduct/action/action"),s=r(n),d=i["default"].createStore({init:function(){this.listenTo(s["default"].getCompare,this.loading),this.listenTo(s["default"].getCompareCmp,this.getCompareCmp)},loading:function(){this.trigger({loading:!0})},getCompareCmp:function(a,t){var e={loading:!1},r={};if(a.curday){for(var o={data:[]},i=[],n={type:"category",boundaryGap:!1,data:[]},s=a.curday.data||[],d=0;d<s.length;d++){for(var u=s[d].rankData,l=[],p=0;24>p;p++)l.push(u[p]?u[p]:0),n.data.push(p+"时");var c=t?t.substring(0,5)+"("+s[d].name+")":s[d].name;i.push({name:c,smooth:!0,type:"line",data:l}),o.data.push({name:c,icon:""})}e.series=i,e.xAxis=n,e.legend=o}else if(a){for(var f in a){var g=a[f];g.forEach(function(a){for(var e in a){var o=t.slice(0,5)+e;r[o]=r[o]||{data:[],title:[]};var i=a[e];for(var n in i){var s=parseFloat(i[n]);r[o].data.push(s||0);var d=f.slice(4,6);r[o].title.push(d+n)}}})}var o={data:[]},i=[],n={type:"category",boundaryGap:!1,data:[]};for(var h in r){var l=r[h].data.sort(),c=r[h].title.sort(),m={name:h,smooth:!0,type:"line",data:l};i.push(m),n.data=c.sort(),o.data.push({name:h,icon:""})}e.series=i,e.xAxis=n,e.legend=o}console.log(e),this.trigger(e)}});t["default"]=d,e.exports=t["default"]});