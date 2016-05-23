define("pagelet/search/components/search_input.jsx",function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var s=e("react"),n=l(s),r=e("reactRouter"),c=e("jquery"),o=l(c),i=e("static/minxins/utils"),u=e("pagelet/widget/components/header.jsx"),d=l(u),h=e("pagelet/widget/components/loading.jsx"),p=l(h),f=e("pagelet/widget/components/tabs.jsx"),m=l(f),y=e("pagelet/widget/components/appItem.jsx"),v=l(y),g=e("constants"),S=e("pagelet/search/action/action"),E=l(S),b=e("pagelet/search/store/store"),C=l(b),k=n["default"].createClass({displayName:"Search",mixins:[r.History],getInitialState:function(){return{tabs:[{name:"iPhone",value:g.deviceType.IPHONE},{name:"iPad",value:g.deviceType.IPAD}],device:g.deviceType.IPHONE,country:g.countryCode.CHINA,searchResultList:[],hotWords:[],records:[],page:1,total:0}},componentDidMount:function(){this.unSubscribe=C["default"].listen(this.onStateChange.bind(this)),E["default"].fetchHotApp(),E["default"].fetchHistory();var e=this.props.location.query;e.searchWord&&this.onSearch(e.searchWord),i.send({type:"search",opra:"pv",label:"搜索"})},componentWillUnmount:function(){this.unSubscribe()},onStateChange:function(e){e.searchResultList&&(e.searchResultList=this.state.searchResultList.concat(e.searchResultList)),this.setState(e)},onTagSelected:function(e){this.onSearch(e),i.send({type:"search",opra:"history",label:e})},onChooseDevice:function(e){var t=this,a=this.props.location.query;this.setState({device:e.value,searchResultList:[]},function(){E["default"].search(a.searchWord,1,t.state.country,t.state.device)})},onSearch:function(e){this.setState({searchResultList:[],page:1,total:0}),E["default"].search(e,1,this.state.country,this.state.device),E["default"].addHistory(e),this.history.replaceState(null,this.props.location.pathname,{searchWord:e}),i.send({type:"search",opra:"search",label:e})},handleScroll:function(e){var t=e.target;t.offsetHeight+t.scrollTop+10>=t.scrollHeight&&!this.state.loading&&this.state.searchResultList.length<this.state.total&&this.loadMore()},loadMore:function(){var e=this.state.page+1,t=this.props.location.query;this.setState({page:e}),E["default"].search(t.searchWord,e)},onClickSearchItem:function(e){var t=this.props.location.query||{},a=o["default"].extend({},e),l="/detail/";l+=t.overlay?"4":"1",a.id=a.id||a.appId,a.device=this.state.device,a.country=g.countryToCode[a.country],this.history.pushState(null,l,a),i.send({type:"search",opra:"hot",label:a.title})},render:function(){var e=this,t=this.state,a=(t.deviceType,t.searchResultList),l=this.props.location.query||{},s=l.searchWord;return n["default"].createElement("div",{className:"c-page input-search"},n["default"].createElement(d["default"],{searchValue:s,onSearch:this.onSearch,onCancelSearch:function(){return e.history.goBack()},type:"search"}),n["default"].createElement("div",{className:"default-view",style:{display:s?"none":"block"}},n["default"].createElement("label",null,"热门应用"),n["default"].createElement("div",{className:"tags hot-app"},this.state.hotWords.map(function(t,a){return n["default"].createElement("span",{key:a,onClick:function(){return e.onClickSearchItem(t)}},t.title)})),n["default"].createElement("label",null,"历史搜索"),n["default"].createElement("div",{className:"tags history"},this.state.records.map(function(t,a){return n["default"].createElement("span",{key:a,onClick:function(){return e.onTagSelected(t)}},t)}))),s?n["default"].createElement("div",{onScroll:this.handleScroll.bind(this),className:"search-result c-body"},n["default"].createElement(m["default"],{tabs:this.state.tabs,onSelect:this.onChooseDevice}),l&&!l.overlay?n["default"].createElement("p",{className:"center c999 f10"},s,"，",this.state.total,"条结果，",(new Date).format("yyyy-MM-dd hh:mm:ss")):null,l&&!l.overlay?n["default"].createElement("div",{className:"keyword-desc"},n["default"].createElement("table",{border:"1",cellSpacing:"0"},n["default"].createElement("tr",null,n["default"].createElement("th",null,"关键字"),n["default"].createElement("th",null,"搜索热度"),n["default"].createElement("th",null,"搜索结果数")),n["default"].createElement("tr",null,n["default"].createElement("td",null,s),n["default"].createElement("td",null,"-"),n["default"].createElement("td",null,this.state.total||"-")))):null,n["default"].createElement("ul",null,a.map(function(t,a){return n["default"].createElement(v["default"],{key:a,type:l.overlay?3:1,onItemClick:e.onClickSearchItem,data:t,index:a})}),this.state.loading?n["default"].createElement(p["default"],null):null)):null)}});t["default"]=k,a.exports=t["default"]});