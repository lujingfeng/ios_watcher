define("pagelet/appdetail/components/baseinfo.jsx",function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var n=e("react"),s=l(n),i=e("reactRouter"),c=e("pagelet/appdetail/action/action"),u=l(c),d=e("pagelet/appdetail/store/store"),r=l(d),o=s["default"].createClass({displayName:"BaseInfo",mixins:[i.History],getInitialState:function(){return{isFav:!1}},componentDidMount:function(){this.unSubscribe=r["default"].listen(this.onStateChange.bind(this)),u["default"].isFav(this.props.query.id)},componentWillUnmount:function(){this.unSubscribe()},onStateChange:function(e){e.isEight&&(e.isFav=!1),this.setState(e)},toCompare:function(){this.history.pushState(null,"/comp_analysis",this.props.query)},onFav:function(){var e=this.props.query,t=!this.state.isFav;this.setState({isFav:t}),u["default"].addFav(e.id,t?"attention":"cancel")},render:function(){var e=this.props.query,t=window.innerWidth-190;return s["default"].createElement("div",{className:"c-app-base-info"},s["default"].createElement("table",null,s["default"].createElement("tr",null,s["default"].createElement("td",null,s["default"].createElement("img",{src:e.icon,className:"app-icon"})),s["default"].createElement("td",null,s["default"].createElement("p",{className:"title ellipsis",style:{width:t}},e.title),s["default"].createElement("p",{className:"f12 c666 ellipsis",style:{width:t}},e.developer)),s["default"].createElement("td",null,s["default"].createElement("div",{className:"vs",onClick:this.toCompare},s["default"].createElement("div",{className:"icon-vs"}),s["default"].createElement("p",{className:"f12"},"排名对比"))),s["default"].createElement("td",null,s["default"].createElement("div",{className:"fav",onClick:this.onFav},s["default"].createElement("div",{className:"icon-fav "+(0==this.state.isFav?"fav-un":"fav-added")}),s["default"].createElement("p",{className:"f12"},this.state.isFav?"取消关注":"添加关注"))))))}});t["default"]=o,a.exports=t["default"]});