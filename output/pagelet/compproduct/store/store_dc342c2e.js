define("pagelet/compproduct/store/store",function(a,t,e){"use strict";function r(a){return a&&a.__esModule?a:{"default":a}}Object.defineProperty(t,"__esModule",{value:!0});var o=a("reflux"),n=r(o),i=a("pagelet/compproduct/action/action"),s=r(i),d=n["default"].createStore({init:function(){this.listenTo(s["default"].getCompare,this.loading),this.listenTo(s["default"].getCompareCmp,this.getCompareCmp)},loading:function(){this.trigger({loading:!0})},getCompareCmp:function(a,t){var e={loading:!1},r={},o=a.curday||a.yesterday;if(o&&o.data&&o.data.length>0){for(var n={data:[]},i=[],s={type:"category",boundaryGap:!1,data:[]},d=o.data||[],l=0;l<d.length;l++){for(var u=d[l].rankData,p=[],c=0;24>c;c++)u[c]&&(p.push(u[c]),s.data.push(c+"时"));t&&t.length>5&&(t=t.substring(0,5)+"...");var f=t?t+"("+d[l].name+")":d[l].name;i.push({name:f,smooth:!0,type:"line",data:p}),n.data.push({name:f,icon:"line"})}e.series=i,e.xAxis=s,e.legend=n,console.log(e)}else if(a&&!a.curday&&!a.yesterday){for(var g in a){var h=a[g]||[];h.forEach(function(a){for(var e in a){var o=t.length>5?t.slice(0,5)+"...("+e+")":t+"("+e+")";r[o]=r[o]||{data:[],title:[]};var n=a[e];for(var i in n){var s=parseFloat(n[i]);r[o].data.push(s||0);var d=g.slice(4,6);r[o].title.push(d+"-"+i)}}})}var n={data:[]},i=[],s={type:"category",boundaryGap:!1,data:[]};for(var m in r){var p=r[m].data.sort(),f=r[m].title.sort(),v={name:m,smooth:!0,type:"line",data:p};i.push(v),s.data=f.sort(),n.data.push({name:m,icon:"line"})}e.series=i,e.xAxis=s,e.legend=n}this.trigger(e)}});t["default"]=d,e.exports=t["default"]});