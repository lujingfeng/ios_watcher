define("pagelet/underapp/components/underapp.jsx",function(t,e,a){"use strict";function n(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var i=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var a=arguments[e];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(t[n]=a[n])}return t},s=t("react"),r=n(s),o=t("reactRouter"),l=t("jquery"),u=n(l),d=t("pagelet/widget/components/header.jsx"),c=n(d),p=t("pagelet/widget/components/rank.jsx"),f=(n(p),t("pagelet/widget/components/loading.jsx")),h=n(f),m=t("pagelet/widget/components/tabs.jsx"),y=(n(m),t("pagelet/widget/components/appItem.jsx")),g=n(y),v=t("pagelet/widget/components/filter.jsx"),S=n(v),b=t("static/minxins/utils"),x=t("constants"),L=t("pagelet/underapp/action/action"),j=n(L),w=t("pagelet/underapp/store/store"),A=n(w),C=r["default"].createClass({displayName:"UnderAppList",mixins:[o.History],getInitialState:function(){var t,e=(new Date,{name:"今天",value:1}),a=this.props.location.query;return e=a.datetime?a.datetime:e,t=a.country?a.country.value:x.countryCode.CHINA,{underAppList:[],page:1,country:t,date:e}},componentDidMount:function(){this.unSubscribe=A["default"].listen(this.onStateChange.bind(this)),this.fetchList(),b.send({type:"offshelve",opra:"pv",label:"下架应用监控"})},componentWillUnmount:function(){this.unSubscribe()},fetchList:function(){var t,e=this.state;t=-1==e.date.value||1==e.date.value?e.date.value:e.date.value.replace(/\-/g,""),j["default"].fetchUnderAppList({country:this.state.country,date:t,page:this.state.page})},onStateChange:function(t){t.underAppList&&(t.underAppList=this.state.underAppList.concat(t.underAppList)),this.setState(t)},handleScroll:function(t){var e=t.target;e.offsetHeight+e.scrollTop+10>=e.scrollHeight&&!this.state.loading&&this.loadMore()},loadMore:function(){var t=this.state.page+1;this.setState({page:t},function(){this.fetchList()})},onItemClick:function(t){var e=u["default"].extend({},t);e.id=t.appId,this.history.pushState("","detail/1",e)},onFilter:function(t){var e=this,a={underAppList:[],page:1};if(t.country&&(a.country=t.country.value),t.datetime){if(t.datetime.year){var n=t.datetime,i=new Date(n.year,n.month-1,n.day);t.datetime.value=i.format("yyyy-MM-dd"),t.datetime.name=i.format("yyyy-MM-dd")}a.date=t.datetime}this.setState(a,function(){e.fetchList()})},render:function(){var t=this.props.location.query;if(t.filter){var e={};return e.countryValue={name:x.countryCode2Str[this.state.country],value:this.state.country},e.datetimeValue=this.state.date,r["default"].createElement(S["default"],i({onOk:this.onFilter,country:!0,location:this.props.location,datetime:!0},e))}return this.renderTop()},renderTop:function(){var t=this,e=this.state;return r["default"].createElement("div",{className:"c-page under-app-list"},r["default"].createElement(c["default"],{location:this.props.location,filterEnabled:!0,showSideNav:this.props.showSideNav},"下架应用监控"),r["default"].createElement("div",{onScroll:this.handleScroll.bind(this),className:"c-body"},r["default"].createElement("p",{className:"f12 center f-txt"},x.countryCode2Str[this.state.country],"  ",this.state.date.name),r["default"].createElement("ul",{className:"list"},e.underAppList.map(function(e,a){return r["default"].createElement(g["default"],{type:7,onItemClick:t.onItemClick,index:a,data:e})})),e.loading?r["default"].createElement(h["default"],null):null))}});e["default"]=C,a.exports=e["default"]});