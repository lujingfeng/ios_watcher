define("pagelet/appdetail/components/detail.jsx",function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var l in a)Object.prototype.hasOwnProperty.call(a,l)&&(e[l]=a[l])}return e},r=e("react"),o=l(r),i=e("jquery"),u=(l(i),e("reactRouter")),s=e("pagelet/widget/components/header.jsx"),d=l(s),p=e("pagelet/appdetail/components/baseinfo.jsx"),c=l(p),m=e("pagelet/appdetail/components/category.jsx"),f=l(m),v=e("pagelet/appdetail/components/appinfo.jsx"),y=l(v),h=e("pagelet/appdetail/components/realrank.jsx"),g=l(h),E=e("pagelet/appdetail/components/version_log"),j=l(E),x=e("pagelet/appdetail/components/keywords.jsx"),b=l(x),F=e("pagelet/appdetail/components/comment.jsx"),q=l(F),w=e("pagelet/appdetail/components/applevel.jsx"),S=l(w),O=e("static/minxins/utils"),k=e("pagelet/widget/components/filter.jsx"),C=l(k),N=e("pagelet/widget/components/dialog.jsx"),D=l(N),V=e("pagelet/appdetail/action/action"),_=(l(V),e("pagelet/appdetail/store/store")),M=l(_),P=o["default"].createClass({displayName:"AppDetail",mixins:[u.History],getInitialState:function(){return{realFilter:null,commentFilter:null}},componentDidMount:function(){this.unSubscribe=M["default"].listen(this.onStateChange.bind(this)),O.send({type:"detail",opra:"pv"})},componentWillUnmount:function(){this.unSubscribe()},onStateChange:function(e){e.isEight&&this.refs.favComfirm.show()},onFilter:function(e){var t=this.props.params;2==t.module?this.setState({realFilter:e}):5==t.module&&this.setState({commentFilter:e})},onFavOk:function(){this.history.pushState(null,"/myfavlist")},render:function(){var e=this.props.location.query,t=this.state;if(e.filter){var a={},l=this.props.params;if(2==l.module){var r=this.state.realFilter;a.showPayMethod=a.device=a.country=a.days=!0,a.payValue=r&&r.pay?r.pay:{name:"免费",value:"free"},a.deviceValue=r&&r.device?r.device:{name:"iPhone",value:0},a.countryValue=r&&r.country?r.country:{name:"中国",value:1},a.daysValue=r&&r.days?r.days:{name:"今天",value:1}}else if(5==l.module){a.showDateDay=!0,a.score=!0;var r=t.commentFilter;a.datetime=r&&r.datetime?r.datetime:{name:"7日",value:7},a.scoreValue=r&&r.score?r.score:[{name:"1星",value:1},{name:"2星",value:2},{name:"3星",value:3},{name:"4星",value:4},{name:"5星",value:5}]}return o["default"].createElement(C["default"],n({onOk:this.onFilter},a))}return this.renderDetail()},renderDetail:function(){var e,t=this.props.location.query,a=this.props.params,l=!1;return 1==a.module?e=o["default"].createElement(y["default"],{query:t}):2==a.module?(l=!0,e=o["default"].createElement(g["default"],{query:t,filter:this.state.realFilter})):3==a.module?e=o["default"].createElement(j["default"],{query:t}):4==a.module?e=o["default"].createElement(b["default"],{query:t}):5==a.module?(l=!0,e=o["default"].createElement(q["default"],{query:t,filter:this.state.commentFilter})):6==a.module&&(e=o["default"].createElement(S["default"],{query:t})),o["default"].createElement("div",{className:"c-page c-app-detail"},o["default"].createElement(d["default"],{location:this.props.location,filterEnabled:l,showSideNav:this.props.showSideNav},"应用详情"),o["default"].createElement("div",{className:"c-body"},o["default"].createElement(c["default"],{query:t}),o["default"].createElement(f["default"],{query:t,ctyValue:a.module}),o["default"].createElement("div",{className:"category-detail"},e)),o["default"].createElement(D["default"],{ref:"favComfirm",okText:"管理应用",onOk:this.onFavOk,buttonkey:D["default"].buttonKeys.CANCEL_OK},o["default"].createElement("div",null,o["default"].createElement("p",null,"您关注的应用已达8个"),o["default"].createElement("p",null,"请管理应用或联系客服"))))}});t["default"]=P,a.exports=t["default"]});