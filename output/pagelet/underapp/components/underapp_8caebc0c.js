define("pagelet/underapp/components/underapp.jsx",function(t,e,a){"use strict";function n(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var i=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var a=arguments[e];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(t[n]=a[n])}return t},r=t("react"),s=n(r),o=t("reactRouter"),l=t("jquery"),u=n(l),d=t("pagelet/widget/components/header.jsx"),c=n(d),p=t("pagelet/widget/components/rank.jsx"),f=(n(p),t("pagelet/widget/components/loading.jsx")),h=n(f),m=t("pagelet/widget/components/tabs.jsx"),g=(n(m),t("pagelet/widget/components/appItem.jsx")),y=n(g),v=t("pagelet/widget/components/filter.jsx"),S=n(v),L=t("constants"),b=t("pagelet/underapp/action/action"),x=n(b),j=t("pagelet/underapp/store/store"),w=n(j),A=s["default"].createClass({displayName:"UnderAppList",mixins:[o.History],getInitialState:function(){var t=(new Date,{});return t.name="今天",t.value=1,{underAppList:[],page:1,country:L.countryCode.CHINA,date:t}},componentDidMount:function(){this.unSubscribe=w["default"].listen(this.onStateChange.bind(this)),this.fetchList()},componentWillUnmount:function(){this.unSubscribe()},fetchList:function(){var t,e=this.state;t="string"==typeof e.date.value?e.date.value.replace(/\-/g,""):e.date.value,x["default"].fetchUnderAppList({country:this.state.country,date:t,page:this.state.page})},onStateChange:function(t){t.underAppList&&(t.underAppList=this.state.underAppList.concat(t.underAppList)),this.setState(t)},handleScroll:function(t){var e=t.target;e.offsetHeight+e.scrollTop+10>=e.scrollHeight&&!this.state.loading&&this.loadMore()},loadMore:function(){var t=this.state.page+1;this.setState({page:t},function(){this.fetchList()})},onItemClick:function(t){var e=u["default"].extend({},t);e.id=t.appId,this.history.pushState("","detail/1",e)},onFilter:function(t){var e=this,a={underAppList:[],page:1};if(t.country&&(a.country=t.country.value),t.datetime){if(t.datetime.year){var n=t.datetime,i=new Date(n.year,n.month,n.day);t.datetime.value=i.format("yyyy-MM-dd"),t.datetime.name=i.format("yyyy-MM-dd")}a.date=t.datetime}this.setState(a,function(){e.fetchList()})},render:function(){var t=this.props.location.query;if(t.filter){var e={};return e.countryValue={name:L.countryCode2Str[this.state.country],value:this.state.country},e.datetimeValue=this.state.date,s["default"].createElement(S["default"],i({onOk:this.onFilter,country:!0,datetime:!0},e))}return this.renderTop()},renderTop:function(){var t=this,e=this.state;return s["default"].createElement("div",{className:"c-page under-app-list"},s["default"].createElement(c["default"],{location:this.props.location,filterEnabled:!0,showSideNav:this.props.showSideNav},"下架应用监控"),s["default"].createElement("div",{onScroll:this.handleScroll.bind(this),className:"c-body"},s["default"].createElement("p",{className:"f12 center f-txt"},L.countryCode2Str[this.state.country],"  ",this.state.date.name),s["default"].createElement("ul",{className:"list"},e.underAppList.map(function(e,a){return s["default"].createElement(y["default"],{type:7,onItemClick:t.onItemClick,index:a,data:e})})),e.loading?s["default"].createElement(h["default"],null):null))}});e["default"]=A,a.exports=e["default"]});