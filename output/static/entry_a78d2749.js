define("static/entry.jsx",function(e){"use strict";function t(e){return e&&e.__esModule?e:{"default":e}}var a=e("react"),o=t(a),n=e("reactRouter"),p=e("jquery"),l=t(p),c=e("pagelet/main/components/main.jsx"),u=t(c),s=e("pagelet/search/components/index.jsx"),d=t(s),m=e("pagelet/search/components/search_input.jsx"),r=t(m),i=e("pagelet/appdetail/components/detail.jsx"),f=t(i),h=e("pagelet/top/components/topList.jsx"),g=t(h),x=e("pagelet/top/components/top7UpList.jsx"),E=t(x),j=e("pagelet/top/components/top7DownList.jsx"),R=t(j),y=e("pagelet/underapp/components/underapp.jsx"),_=t(y),v=e("pagelet/hotkeyword/components/hotkeyword.jsx"),w=t(v),k=e("pagelet/compproduct/components/index.jsx"),L=t(k),S=e("pagelet/compproduct/components/compare.jsx"),b=t(S),O=e("pagelet/myfav/components/my_fav_list.jsx"),D=t(O),q=e("pagelet/widget/components/aso_service"),A=t(q),C=e("pagelet/widget/components/about.jsx"),M=t(C),P=e("static/minxins/utils"),T=function(){var e=P.getCookie("uname");e||-1!=location.hash.indexOf("search")||(location.href="/check/login-page"),!e&&location.hash.indexOf("search/input")>-1&&(location.href="/check/login-page")};T(),window.addEventListener("hashchange",function(){T()}),l["default"].ajaxSetup({cache:!1}),o["default"].initTapEventPlugin(),o["default"].render(o["default"].createElement(n.Router,null,o["default"].createElement(n.Route,{path:"/",component:u["default"]},o["default"].createElement(n.Route,{name:"defaultSearch",path:"/search",component:d["default"]}),o["default"].createElement(n.Route,{name:"inputSearch",path:"/search/input",component:r["default"]}),o["default"].createElement(n.Route,{path:"/detail/:module",component:f["default"]}),o["default"].createElement(n.Route,{path:"/toplist",component:g["default"]}),o["default"].createElement(n.Route,{path:"/top7uplist",component:E["default"]}),o["default"].createElement(n.Route,{path:"/top7Downlist",component:R["default"]}),o["default"].createElement(n.Route,{path:"/under_app_monitor",component:_["default"]}),"//关键词热度排行榜",o["default"].createElement(n.Route,{path:"/hotkeywords",component:w["default"]}),"//竞品分析",o["default"].createElement(n.Route,{path:"/comp_analysis",component:L["default"]}),"//竞品对比",o["default"].createElement(n.Route,{path:"/appcompare",component:b["default"]}),"//我的关注",o["default"].createElement(n.Route,{path:"/myfavlist",component:D["default"]}),"//ASO优化服务",o["default"].createElement(n.Route,{path:"/aso_service",component:A["default"]}),"//关于我们",o["default"].createElement(n.Route,{path:"/about",component:M["default"]}))),document.body)});