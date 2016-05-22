define("pagelet/appdetail/components/detail.jsx",function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var l in a)Object.prototype.hasOwnProperty.call(a,l)&&(e[l]=a[l])}return e},u=e("react"),i=l(u),r=e("jquery"),o=(l(r),e("reactRouter")),s=e("pagelet/widget/components/header.jsx"),d=l(s),m=e("pagelet/appdetail/components/baseinfo.jsx"),p=l(m),c=e("pagelet/appdetail/components/category.jsx"),f=l(c),v=e("pagelet/appdetail/components/appinfo.jsx"),y=l(v),h=e("pagelet/appdetail/components/realrank.jsx"),g=l(h),E=e("pagelet/appdetail/components/version_log"),j=l(E),x=e("pagelet/appdetail/components/keywords.jsx"),b=l(x),F=e("pagelet/appdetail/components/comment.jsx"),q=l(F),V=e("pagelet/appdetail/components/applevel.jsx"),w=l(V),S=e("static/minxins/utils"),O=e("pagelet/widget/components/filter.jsx"),k=l(O),C=e("pagelet/widget/components/dialog.jsx"),N=l(C),D=e("pagelet/appdetail/action/action"),_=(l(D),e("pagelet/appdetail/store/store")),M=l(_),P=i["default"].createClass({displayName:"AppDetail",mixins:[o.History],getInitialState:function(){return{realFilter:null,commentFilter:{score:[{name:"1星",value:1},{name:"2星",value:2},{name:"3星",value:3},{name:"4星",value:4},{name:"5星",value:5}],datetime:{name:"7日",value:7}}}},componentDidMount:function(){this.unSubscribe=M["default"].listen(this.onStateChange.bind(this)),S.send({type:"detail",opra:"pv"})},componentWillUnmount:function(){this.unSubscribe()},onStateChange:function(e){e.isEight&&this.refs.favComfirm.show()},onFilter:function(e){var t=this.props.params;2==t.module?this.setState({realFilter:e}):5==t.module&&this.setState({commentFilter:e})},onFavOk:function(){this.history.pushState(null,"/myfavlist")},render:function(){var e=this.props.location.query,t=this.state;if(e.filter){var a={},l=this.props.params;if(2==l.module){var u=this.state.realFilter;a.showPayMethod=a.device=a.country=a.days=!0,a.payValue=u&&u.pay?u.pay:{name:"免费",value:"free"},a.deviceValue=u&&u.device?u.device:{name:"iPhone",value:0},a.countryValue=u&&u.country?u.country:{name:"中国",value:1},a.daysValue=u&&u.days?u.days:{name:"今天",value:1}}else if(5==l.module){a.showDateDay=!0,a.score=!0;var u=t.commentFilter;a.datetimeValue=u&&u.datetime?u.datetime:{name:"7日",value:7},a.scoreValue=u&&u.score?u.score:[{name:"1星",value:1},{name:"2星",value:2},{name:"3星",value:3},{name:"4星",value:4},{name:"5星",value:5}],(1==a.datetimeValue.value||-1==a.datetimeValue.value)&&(delete a.datetimeValue.value,delete a.datetimeValue.name)}return i["default"].createElement(k["default"],n({onOk:this.onFilter},a))}return this.renderDetail()},renderDetail:function(){var e,t=this.props.location.query,a=this.props.params,l=!1;return 1==a.module?e=i["default"].createElement(y["default"],{query:t}):2==a.module?(l=!0,e=i["default"].createElement(g["default"],{query:t,filter:this.state.realFilter})):3==a.module?e=i["default"].createElement(j["default"],{query:t}):4==a.module?e=i["default"].createElement(b["default"],{query:t}):5==a.module?(l=!0,e=i["default"].createElement(q["default"],{query:t,filter:this.state.commentFilter})):6==a.module&&(e=i["default"].createElement(w["default"],{query:t})),i["default"].createElement("div",{className:"c-page c-app-detail"},i["default"].createElement(d["default"],{location:this.props.location,filterEnabled:l,showSideNav:this.props.showSideNav},"应用详情"),i["default"].createElement("div",{className:"c-body"},i["default"].createElement(p["default"],{query:t}),i["default"].createElement(f["default"],{query:t,ctyValue:a.module}),i["default"].createElement("div",{className:"category-detail"},e)),i["default"].createElement(N["default"],{ref:"favComfirm",okText:"管理应用",onOk:this.onFavOk,buttonkey:N["default"].buttonKeys.CANCEL_OK},i["default"].createElement("div",null,i["default"].createElement("p",null,"您关注的应用已达8个"),i["default"].createElement("p",null,"请管理应用或联系客服"))))}});t["default"]=P,a.exports=t["default"]});