define("static/minxins/utils",function(e,t,o){"use strict";function i(e,t,o){var i=new Date;i.setTime(i.getTime()+3600*Number(o)*1e3),document.cookie=e+"="+t+"; path=/;expires = "+i.toGMTString()}Object.defineProperty(t,"__esModule",{value:!0});var n={getParameters:function(){var e=location.search||"",t={};if(e){e=e.slice(1);var o=e.split("&");o.forEach(function(e){var o=e.match(/(\w+)=(\w+)/);o&&(t[o[1]]=o[2])})}return t}},r=function(e){if(0===e)return"0 B";var t=1e3,o=["B","KB","MB","GB","TB","PB","EB","ZB","YB"],i=Math.floor(Math.log(e)/Math.log(t));return(e/Math.pow(t,i)).toPrecision(3)+" "+o[i]},a=function(e){var t,o=new RegExp("(^| )"+e+"=([^;]*)(;|$)");return(t=document.cookie.match(o))?unescape(t[2]):null};t["default"]={URL:n,bytesToSize:r,getCookie:a,setCookie:i},o.exports=t["default"]});