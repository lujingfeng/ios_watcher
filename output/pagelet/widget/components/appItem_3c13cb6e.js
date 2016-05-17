define("pagelet/widget/components/appItem.jsx",function(e,t,l){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var s=e("react"),n=a(s),c=e("pagelet/widget/components/rank.jsx"),i=a(c),r=function(e){return e.touches.length?e.touches[0]:e.targetTouches.length?e.targetTouches[0]:e.changedTouches[0]},d=n["default"].createClass({displayName:"AppItem",getInitialState:function(){return{type:this.props.type||1,isShowDelete:!1}},componentWillReceiveProps:function(e){e.type!=this.props.type&&this.setState({type:e.type}),this.setState({isShowDelete:!1})},onClickItem:function(){this.props.onItemClick&&this.props.onItemClick(this.props.data)},onTouchStart:function(e){var t=r(e.nativeEvent);this.startX=t.pageX},onTouchEnd:function(e){var t=r(e.nativeEvent);t.pageX-this.startX>10?this.setState({isShowDelete:!0}):t.pageX-this.startX<-10&&this.setState({isShowDelete:!1})},onDelete:function(e){e.stopPropagation(),this.props.onDelete&&this.props.onDelete(this.props.data)},render:function(){var e,t,l=this.props.data||{},a=this.state.type,s=this.state,c={};if(1==a||3==a||5==a){var r=parseFloat(l.score||0),d=200;3==a?t=n["default"].createElement("td",null,n["default"].createElement("div",{className:"f10 center"},n["default"].createElement("i",{className:"icon-q"}),"查看")):5==a&&(t=n["default"].createElement("td",null,n["default"].createElement("div",{className:"f10 center"},n["default"].createElement("i",{className:"icon-vs"}),n["default"].createElement("p",null,"排名对比"))),d=160),e=n["default"].createElement("td",null,n["default"].createElement("p",{style:{width:d},className:"title ellipsis"},this.props.index+1,"、",l.title),n["default"].createElement("p",{style:{width:d},className:"f12 c666 m5 mb5 ellipsis"},l.developer),n["default"].createElement("div",null,n["default"].createElement("span",{className:"t-vt c666 f12 mr6"},l.genres),n["default"].createElement(i["default"],{value:r,width:14}),n["default"].createElement("span",{className:"c666 f12 ml6 t-vt"},l.score)))}else if(2==a){var m,u=window.innerWidth-150,o=l.rank;if(l.other){var p=l.other.split("|");m=p[0],o=p[1]}e=n["default"].createElement("td",null,n["default"].createElement("p",{style:{width:u},className:"title ellipsis"},this.props.index+1,"、",l.title),n["default"].createElement("p",{style:{width:u},className:"f12 c666 m5 mb5 ellipsis"},l.developer),n["default"].createElement("div",null,n["default"].createElement("span",{className:"c666 f12 mr6"},l.other?m:"当前"),n["default"].createElement("span",{className:"c666 f12 ml6 t-vm"},"落榜"==o?"落榜":"第"+o+"名")));var f=l.rankfloat,h="";h=1==this.props.flag?"up":2==this.props.flag?"down":f>0?"up":"down",console.log(f),t=n["default"].createElement("td",{className:"center"},n["default"].createElement("i",{className:h}),n["default"].createElement("i",{className:"f12 t-vm"},Math.abs(f)))}else if(4==a){var E=170;e=n["default"].createElement("td",null,n["default"].createElement("p",{style:{width:E},className:"title ellipsis"},l.title),n["default"].createElement("p",{style:{width:E},className:"f12 c666 m5 mb5 ellipsis"},l.developer)),t=n["default"].createElement("td",null,n["default"].createElement("a",{className:"f12 c-main s-txt"},"已选中"))}else if(6==a){var r=parseFloat(l.score||0);e=n["default"].createElement("td",null,n["default"].createElement("p",{style:{width:200},className:"title ellipsis"},l.title),n["default"].createElement("p",{className:"f12 c666 m5 mb5"},l.developer),n["default"].createElement("div",null,n["default"].createElement("span",{className:"t-vt c666 f12 mr6"},l.genres),n["default"].createElement(i["default"],{value:r,width:14}),n["default"].createElement("span",{className:"c666 f12 ml6 t-vt"},l.score))),c.onTouchStart=this.onTouchStart.bind(this),c.onTouchEnd=this.onTouchEnd.bind(this)}else 7==a&&(e=n["default"].createElement("td",null,n["default"].createElement("p",{style:{width:200},className:"title ellipsis"},l.title),n["default"].createElement("p",{className:"f12 c666 m5 mb5"},l.developer),n["default"].createElement("div",null,n["default"].createElement("span",{className:"t-vt c666 f12 mr6"},l.genres),n["default"].createElement("span",{className:"c666 f12 ml6 t-vt"},l.score))));return n["default"].createElement("li",{className:"app-item",onClick:this.onClickItem},n["default"].createElement("table",null,n["default"].createElement("tr",c,n["default"].createElement("td",null,n["default"].createElement("img",{className:"app-icon",src:l.icon})),e,t)),s.isShowDelete?n["default"].createElement("div",{className:"del",onClick:this.onDelete},"删除"):null)}});t["default"]=d,l.exports=t["default"]});