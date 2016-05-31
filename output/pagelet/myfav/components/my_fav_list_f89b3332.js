define("pagelet/myfav/components/my_fav_list.jsx",function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=e("react"),l=a(i),s=e("reactRouter"),o=e("jquery"),c=a(o),d=e("pagelet/widget/components/header.jsx"),r=a(d),u=e("pagelet/widget/components/loading.jsx"),f=a(u),m=e("pagelet/widget/components/tabs.jsx"),p=(a(m),e("pagelet/widget/components/appItem.jsx")),h=a(p),g=e("pagelet/widget/components/popup.jsx"),v=a(g),b=e("static/minxins/utils"),y=e("constants"),S=e("pagelet/appdetail/action/action"),x=a(S),E=e("pagelet/appdetail/store/store"),I=(a(E),e("pagelet/myfav/action/action")),k=a(I),C=e("pagelet/myfav/store/store"),N=a(C),j=l["default"].createClass({displayName:"MyFav",mixins:[s.History],getInitialState:function(){return{loading:!0,confirmVisible:!1,list:[]}},componentDidMount:function(){this.unSubscribe=N["default"].listen(this.onStateChange.bind(this)),k["default"].fetFavLsit()},componentWillUnmount:function(){this.unSubscribe()},onStateChange:function(e){this.setState(e)},onDelete:function(e){e.id=e.infoId||e.id;var t=e.id||e.appId;x["default"].addFav(t,"cancel");var n=this.state.list.filter(function(e){return e.id=e.id||e.appId,e.id==t?e:void 0})[0]||null;n&&(this.state.list.splice(this.state.list.indexOf(n),1),this.setState({list:this.state.list}))},onItemClick:function(e){e.id=e.infoId||e.id;var t=(this.props.location.query||{},c["default"].extend({},e)),n="/detail/1";t.id=t.id||t.appId,t.device=y.deviceStrToint[t.device],t.country=y.countryToCode[t.country],this.history.pushState(null,n,t)},onTapMasker:function(){this.setState({confirmVisible:!1})},onDeleteHandler:function(e){this.setState({confirmVisible:!0,selectedItem:e})},detete:function(){this.onDelete(this.state.selectedItem),this.setState({confirmVisible:!1})},render:function(){var e=this,t=(this.props.location.query||{},this.state);return b.getCookie("uname")?l["default"].createElement("div",{className:"c-page my-fav-page"},l["default"].createElement(r["default"],{filterVisible:!1,showSideNav:this.props.showSideNav},"我的关注"),l["default"].createElement("div",{className:"c-body"},this.state.list.map(function(t,n){return l["default"].createElement(h["default"],{onItemClick:e.onItemClick,key:n,data:t,type:6,isShowDelete:!0,onDelete:e.onDeleteHandler})}),t.loading?l["default"].createElement(f["default"],null):null,t.errorText?l["default"].createElement("p",{className:"center c999"},"暂无数据"):null,t.loading||t.list.length||t.errorText?null:l["default"].createElement("p",{className:"center mt6 c999"},"您还未关注应用")),this.state.confirmVisible?l["default"].createElement(v["default"],{ref:"confirm",onTapMasker:this.onTapMasker},l["default"].createElement("div",{className:"c-confirm"},l["default"].createElement("p",null,"您确定要删除应用关注吗？"),l["default"].createElement("div",null,l["default"].createElement("button",{className:"btn normal",onClick:function(){return e.detete()}},"删除"),l["default"].createElement("button",{className:"btn main-btn",onClick:this.onTapMasker},"取消")))):null):null}});t["default"]=j,n.exports=t["default"]});