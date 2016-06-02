define("pagelet/main/components/side_nav.jsx",function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var l=e("react"),i=a(l),o=e("reactRouter"),c=e("static/minxins/utils"),s=i["default"].createClass({displayName:"SideNav",mixins:[o.History],getInitialState:function(){return{visible:!1}},componentDidMount:function(){},componentWillUnmount:function(){},onStateChange:function(){},show:function(){var e=this;this.setState({visible:!0},function(){setTimeout(function(){e.refs.root.className+=" visible"},20)})},hide:function(){this.setState({visible:!1})},onMask:function(e){e.target==this.refs.root&&this.hide()},onNav:function(e,t){this.hide(),this.history.pushState(null,e,t)},onClose:function(e){e.stopPropagation(),this.hide()},onClickLogin:function(){c.getCookie("uname")||location.replace("/check/login-page")},onLogout:function(){c.setCookie("uname","",0),location.replace("/#/search"),this.hide()},render:function(){var e=this;if(!this.state.visible)return null;var t=c.getCookie("uname");return i["default"].createElement("div",{className:"c-page side-page",ref:"root",onClick:this.onMask},i["default"].createElement("div",{className:"side-nav"},i["default"].createElement("div",{className:"profile",onClick:this.onClickLogin},i["default"].createElement("i",{className:"awatar"}),i["default"].createElement("span",{className:"ellipsis"},c.getCookie("uname")||"登录 / 注册"),i["default"].createElement("div",{className:"close",onClick:this.onClose})),i["default"].createElement("ul",{className:"nav1"},i["default"].createElement("li",{onClick:function(){return e.onNav("/toplist")}},i["default"].createElement("i",{className:"icon"}),"iOS榜单排名"),i["default"].createElement("li",{onClick:function(){return e.onNav("/top7uplist")}},i["default"].createElement("i",{className:"icon"}),"七日排名上升榜"),i["default"].createElement("li",{onClick:function(){return e.onNav("/top7downlist")}},i["default"].createElement("i",{className:"icon"}),"七日排名下降榜"),i["default"].createElement("li",{onClick:function(){return e.onNav("/under_app_monitor")}},i["default"].createElement("i",{className:"icon"}),"下架应用监控"),i["default"].createElement("li",{onClick:function(){return e.onNav("/hotkeywords")},style:{display:"none"}},i["default"].createElement("i",{className:"icon"}),"关键词热度排行榜"),i["default"].createElement("li",{onClick:function(){return e.onNav("/search/input",{overlay:!0})},style:{display:"none"}},i["default"].createElement("i",{className:"icon"}),"App关键词覆盖数"),i["default"].createElement("li",{onClick:function(){return e.onNav("/aso_service")}},i["default"].createElement("i",{className:"icon"}),"ASO优化服务")),i["default"].createElement("ul",null,i["default"].createElement("li",{onClick:function(){return e.onNav("/myfavlist")}},i["default"].createElement("i",{className:"icon fav"}),"我的关注")),i["default"].createElement("ul",null,i["default"].createElement("li",{onClick:function(){return e.onNav("/about")}},i["default"].createElement("i",{className:"icon about"}),"关于我们"),i["default"].createElement("li",{style:{dislay:"none"}},i["default"].createElement("i",{className:"icon callin"}),i["default"].createElement("a",{href:"tel:4006343800"},"400-6343-800")),t?i["default"].createElement("li",{style:{color:"red",paddingLeft:50},onClick:function(){return e.props.showConfirm()}},"退出"):null)))}});t["default"]=s,n.exports=t["default"]});