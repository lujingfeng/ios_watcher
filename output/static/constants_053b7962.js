define("constants",function(e,r){"use strict";function t(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}Object.defineProperty(r,"__esModule",{value:!0});var a,o,n,i,v=(a={},t(a,0,"iPhone"),t(a,1,"iPad"),a);r.deviceTypeStr=v;var c={CHINA:1,AMERICAN:2};r.countryCode=c;var d={IPHONE:0,IPAD:1};r.deviceType=d;var u={iphone:0,ipad:1};r.deviceStrToint=u;var y={FREE:"free",FEE:"fee",HOT:"hot"};r.payType=y;var f={free:"免费",fee:"付费",hot:"畅销"};r.payTypeToStr=f;var p=(o={},t(o,"中国",1),t(o,"美国",2),t(o,"香港",3),t(o,"台湾",4),t(o,"日本",5),t(o,"韩国",6),o);r.countryToCode=p;var T=(n={},t(n,"1","中国"),t(n,"2","美国"),t(n,"3","香港"),t(n,"4","台湾"),t(n,"5","日本"),t(n,"6","韩国"),n);r.countryCode2Str=T;var l=(i={},t(i,"1","今天"),t(i,"-1","昨天"),t(i,"7","7日"),t(i,"15","15日"),t(i,"30","30日"),t(i,"60","60日"),i);r.days2Str=l});