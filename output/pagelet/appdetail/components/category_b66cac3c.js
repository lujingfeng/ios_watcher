define("pagelet/appdetail/components/category.jsx",function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var n=e("react"),c=l(n),i=e("reactRouter"),o=e("static/minxins/utils"),u=c["default"].createClass({displayName:"DetailCategory",mixins:[i.History],getInitialState:function(){return{category:this.props.ctyValue}},componentWillReceiveProps:function(e){e.ctyValue!=this.props.ctyValue&&this.setState({category:e.ctyValue})},onCategofy:function(e){this.history.pushState("","/detail/"+e,this.props.query);var t="";1==e?t="应用信息":2==e?t="实时排名":3==e?t="版本记录":4==e?t="关键词覆盖数":5==e?t="评论详情":6==e&&(t="应用评级"),o.send({type:"detail-tab",opra:"click",label:t})},render:function(){var e=this,t=(this.props.query,this.state.category);return c["default"].createElement("div",{className:"c-category"},c["default"].createElement("div",{className:"tabs"},c["default"].createElement("div",{className:1==t?"cur":null,onClick:function(){e.onCategofy(1)}},"应用信息"),c["default"].createElement("div",{className:2==t?"cur":null,onClick:function(){e.onCategofy(2)}},"实时排名"),c["default"].createElement("div",{className:3==t?"cur":null,onClick:function(){e.onCategofy(3)}},"版本记录"),c["default"].createElement("div",{className:4==t?"cur":null,onClick:function(){e.onCategofy(4)}},"关键词覆盖数"),c["default"].createElement("div",{className:5==t?"cur":null,onClick:function(){e.onCategofy(5)}},"评论详情"),c["default"].createElement("div",{className:6==t?"cur":null,onClick:function(){e.onCategofy(6)}},"应用评级")))}});t["default"]=u,a.exports=t["default"]});