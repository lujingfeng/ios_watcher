define("pagelet/top/components/topList.jsx",function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e},i=e("react"),o=n(i),l=e("reactRouter"),r=e("jquery"),c=n(r),u=e("pagelet/widget/components/header.jsx"),d=n(u),p=e("pagelet/widget/components/rank.jsx"),h=(n(p),e("pagelet/widget/components/loading.jsx")),f=n(h),y=e("pagelet/widget/components/tabs.jsx"),m=n(y),g=e("pagelet/widget/components/appItem.jsx"),v=n(g),S=e("pagelet/widget/components/filter.jsx"),T=n(S),b=e("static/minxins/utils"),x=e("constants"),E=e("pagelet/top/action/action"),j=n(E),I=e("pagelet/top/store/store"),w=n(I),C=o["default"].createClass({displayName:"TopList",mixins:[l.History],getInitialState:function(){var e=[{name:"免费榜",payType:x.payType.FREE},{name:"付费榜",payType:x.payType.FEE},{name:"畅销榜",payType:x.payType.HOT}],t=(new Date,{});t.name="今天",t.value=1;var a={name:"总榜",value:1};return{loading:!1,tabIndex:0,tabs:e,list:[],genres:a,payType:x.payType.FREE,device:x.deviceType.IPHONE,country:x.countryCode.CHINA,date:t,page:1,pageSize:20}},componentDidMount:function(){this.unSubscribe=w["default"].listen(this.onStateChange.bind(this)),this.fetchList(),b.send({type:"top",opra:"pv",label:"iOS榜单排名"})},componentWillUnmount:function(){this.unSubscribe()},fetchList:function(){j["default"].fetchList({genres:this.state.genres.name,type:this.state.payType,device:this.state.device,country:this.state.country,date:this.state.date.value})},onStateChange:function(e){this.setState(e)},handleScroll:function(e){var t=e.target;t.offsetHeight+t.scrollTop+10>=t.scrollHeight&&this.loadMore()},loadMore:function(){var e=this.state.page+1;this.setState({page:e})},onItemClick:function(e){var t=c["default"].extend({},e);this.history.pushState("","detail/1",t)},onSelectTab:function(e,t){var a=this;this.setState({tabIndex:t,list:[],page:1,payType:e.payType},function(){a.fetchList()})},onFilter:function(e){var t=this,a={list:[],page:1};e.device&&(a.device=e.device.value),e.country&&(a.country=e.country.value),e.category&&(a.genres=e.category),e.datetime&&(a.date=e.datetime),this.setState(a,function(){t.fetchList()})},render:function(){var e=this.props.location.query;if(e.filter){var t={location:this.props.location};return t.device=!0,t.country=!0,t.category=!0,t.datetime=!0,t.categoryValue=this.state.genres,t.deviceValue={name:x.deviceTypeStr[this.state.device],value:this.state.device},t.countryValue={name:x.countryCode2Str[this.state.country],value:this.state.country},t.datetimeValue=this.state.date,o["default"].createElement(T["default"],s({onOk:this.onFilter},t))}return this.renderTop()},renderTop:function(){var e=this,t=this.state.list||[];return t=t.slice(0,this.state.page*this.state.pageSize),o["default"].createElement("div",{className:"c-page top7-up-list"},o["default"].createElement(d["default"],{location:this.props.location,filterEnabled:!0,showSideNav:this.props.showSideNav},"iOS榜单排名"),o["default"].createElement("div",{className:"c-body",onScroll:this.handleScroll},o["default"].createElement(m["default"],{tabIndex:this.state.tabIndex,onSelect:this.onSelectTab,tabs:this.state.tabs}),o["default"].createElement("p",{className:"f12 center f-txt"},x.deviceTypeStr[this.state.device]," ",x.countryCode2Str[this.state.country]," ",this.state.date.name," ",this.state.genres.name),o["default"].createElement("ul",{className:"list"},t.map(function(t,a){return o["default"].createElement(v["default"],{key:a,type:2,onItemClick:e.onItemClick,index:a,data:t})})),this.state.loading?o["default"].createElement(f["default"],null):null,this.state.errorText?o["default"].createElement("p",{className:"center c999"},"暂无数据"):null))}});t["default"]=C,a.exports=t["default"]});