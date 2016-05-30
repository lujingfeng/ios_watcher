define("pagelet/top/components/top7DownList.jsx",function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e},i=e("react"),o=n(i),l=e("reactRouter"),r=e("jquery"),c=n(r),u=e("pagelet/widget/components/header.jsx"),p=n(u),d=e("pagelet/widget/components/rank.jsx"),f=(n(d),e("pagelet/widget/components/loading.jsx")),h=n(f),y=e("pagelet/widget/components/tabs.jsx"),g=n(y),m=e("pagelet/widget/components/appItem.jsx"),v=n(m),S=e("pagelet/widget/components/filter.jsx"),T=n(S),b=e("static/minxins/utils"),x=e("constants"),E=e("pagelet/top/action/action"),w=n(E),j=e("pagelet/top/store/store"),I=n(j),C=o["default"].createClass({displayName:"Top7DownList",mixins:[l.History],getInitialState:function(){var e=[{name:"免费榜",payType:x.payType.FREE},{name:"付费榜",payType:x.payType.FEE},{name:"畅销榜",payType:x.payType.HOT}],t={name:"总榜",value:1};return{loading:!1,flag:2,tabIndex:0,tabs:e,list:[],genres:t,payType:x.payType.FREE,device:x.deviceType.IPHONE,country:x.countryCode.CHINA,page:1,pageSize:20}},componentDidMount:function(){this.unSubscribe=I["default"].listen(this.onStateChange.bind(this)),this.fetchList(),b.send({type:"top",opra:"pv",label:"七日排名下降榜"})},componentWillUnmount:function(){this.unSubscribe()},fetchList:function(){w["default"].fetDownTopList({genres:this.state.genres.name,type:this.state.payType,device:this.state.device,country:this.state.country})},onStateChange:function(e){this.setState(e)},handleScroll:function(e){var t=e.target;t.offsetHeight+t.scrollTop+10>=t.scrollHeight&&this.loadMore()},loadMore:function(){var e=this.state.page+1;this.setState({page:e})},onItemClick:function(e){var t=c["default"].extend({},e);this.history.pushState("","detail/1",t)},onSelectTab:function(e,t){var a=this;this.setState({tabIndex:t,list:[],page:1,payType:e.payType},function(){a.fetchList()})},onFilter:function(e){var t=this,a={list:[],page:1};e.device&&(a.device=e.device.value),e.country&&(a.country=e.country.value),e.category&&(a.genres=e.category),this.setState(a,function(){t.fetchList()})},render:function(){var e=this.props.location.query;if(e.filter){var t={location:this.props.location};return t.device=t.country=t.category=!0,t.categoryValue=this.state.genres,t.deviceValue={name:x.deviceTypeStr[this.state.device],value:this.state.device},t.countryValue={name:x.countryCode2Str[this.state.country],value:this.state.country},o["default"].createElement(T["default"],s({onOk:this.onFilter},t))}return this.renderTop()},renderTop:function(){var e=this,t=this.state.list||[];return t=t.slice(0,this.state.page*this.state.pageSize),o["default"].createElement("div",{className:"c-page top7-up-list"},o["default"].createElement(p["default"],{location:this.props.location,filterEnabled:!0,showSideNav:this.props.showSideNav},"七日排名下降榜"),o["default"].createElement("div",{className:"c-body",onScroll:this.handleScroll},o["default"].createElement(g["default"],{tabIndex:this.state.tabIndex,onSelect:this.onSelectTab,tabs:this.state.tabs}),o["default"].createElement("p",{className:"f12 center f-txt"},x.deviceTypeStr[this.state.device]," ",x.countryCode2Str[this.state.country]," ",this.state.genres.name),o["default"].createElement("ul",{className:"list"},t.map(function(t,a){return o["default"].createElement(v["default"],{flag:e.state.flag,type:2,onItemClick:e.onItemClick,index:a,data:t})})),this.state.loading?o["default"].createElement(h["default"],null):null,this.state.errorText?o["default"].createElement("p",{className:"center c999"},"暂无数据"):null))}});t["default"]=C,a.exports=t["default"]});