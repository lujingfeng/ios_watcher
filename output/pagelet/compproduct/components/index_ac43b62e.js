define("pagelet/compproduct/components/index.jsx",function(e,t,a){"use strict";function s(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var l=e("react"),n=s(l),i=e("reactRouter"),c=e("pagelet/widget/components/header.jsx"),o=s(c),r=e("pagelet/widget/components/loading.jsx"),u=s(r),d=e("pagelet/widget/components/tabs.jsx"),h=(s(d),e("pagelet/widget/components/appItem.jsx")),p=s(h),f=e("constants"),m=e("pagelet/compproduct/components/my_fav_item.jsx"),g=(s(m),e("pagelet/search/action/action")),v=s(g),y=e("pagelet/search/store/store"),S=s(y),C=e("pagelet/myfav/action/action"),b=s(C),E=e("pagelet/myfav/store/store"),I=s(E),x=n["default"].createClass({displayName:"AppCompare",mixins:[i.History],getInitialState:function(){return{loading:!1,searchKey:null,searchResultList:[],favList:[],page:1,total:0}},componentDidMount:function(){this.unSubscribe=S["default"].listen(this.onStateChange.bind(this)),this.unFavSubscribe=I["default"].listen(this.onFavStateChange.bind(this)),b["default"].fetFavLsit()},componentWillUnmount:function(){this.unSubscribe(),this.unFavSubscribe()},onStateChange:function(e){e.searchResultList&&(e.searchResultList=this.state.searchResultList.concat(e.searchResultList)),this.setState(e)},onFavStateChange:function(e){e.list&&(e.favList=e.list),this.setState(e)},onSearch:function(e){this.setState({searchKey:e,searchResultList:[],page:1,total:0}),v["default"].search(e,1)},handleScroll:function(e){var t=e.target;t.offsetHeight+t.scrollTop+10>=t.scrollHeight&&!this.state.loading&&this.state.searchResultList.length<this.state.total&&this.loadMore()},loadMore:function(){var e=this.state.page+1;this.setState({page:e}),v["default"].search(this.state.searchKey,e)},onClickItem:function(e){var t={},a=this.props.location.query||{};t.app_1=a,t.app_2=e;var s="/appcompare";this.history.pushState(null,s,t)},onClickFavItem:function(e){e.id=e.id||e.appId,e.device=f.deviceStrToint[e.device],e.country=f.countryToCode[e.country],this.onClickItem(e)},render:function(){var e=this,t=this.state,a=t.searchResultList,s=t.searchKey,l=t.favList,i=this.props.location.query||{},c=i.id||i.appId;return n["default"].createElement("div",{className:"c-page comp-analysis"},n["default"].createElement(o["default"],{searchValue:s,onSearch:this.onSearch,placeholder:"搜索应用查看排名对比",onCancelSearch:function(){return e.history.goBack()},type:"search"}),n["default"].createElement("div",{className:"appselected"},n["default"].createElement(p["default"],{type:4,data:i})),n["default"].createElement("div",{onScroll:this.handleScroll.bind(this),className:"search-result c-body"},a.length?n["default"].createElement("ul",{className:"search-list"},a.map(function(t,a){var s=t.id||t.appId;return s==c?null:n["default"].createElement(p["default"],{key:a,type:5,onItemClick:e.onClickItem,data:t,index:a})}),this.state.loading?n["default"].createElement(u["default"],null):null):null,this.state.loading||a.length||!l.length?null:n["default"].createElement("ul",{className:"my-fav-list clearfix"},n["default"].createElement("h5",{className:"title"},n["default"].createElement("i",null),"关注对比"),l.map(function(t,a){var s=t.id||t.appId;return s==c?null:n["default"].createElement(p["default"],{index:a,type:5,isCompare:!0,data:t,onItemClick:e.onClickFavItem})})),this.state.loading?n["default"].createElement(u["default"],null):null))}});t["default"]=x,a.exports=t["default"]});