import $ from "jquery";


var request = $.ajax;

$.ajax = function(params){
    var fail = [];
    var done = [];
    var always = [];
    var req = request.apply($, arguments);


    var start = Date.now();

    req.fail(function(res){
        var args = arguments;

        send({
          type: "request",
          opra: params.url,
          label: "失败"
        });

        fail.forEach((func)=>{
            func.apply(this, args);
        });
    });

    req.done(function(res){
        var args = arguments;
        var end = Date.now();

        send({
          type: "request",
          opra: params.url,
          label: "成功-" + (end-start)
        });
        
        done.forEach((func)=>{
            func.apply(this, args);
        });
    });

    req.always(function(res){
        var args = arguments;
        
        always.forEach((func)=>{
            func.apply(this, args);
        });
    });

    return {
        always: function(func){
            always.push(func);
            return this;
        },
        done: function(func){
            done.push(func);
            return this;
        },
        fail: function(func){
            fail.push(func);
            return this;
        }
    }
};

let URL = {
    getParameters: function(){
        let search = location.search || "";
        let params = {};

        if(search){
            search = search.slice(1);
            let split = search.split("&");
            split.forEach(function(item){
                let m = item.match(/(\w+)=(\w+)/);
                if(m){
                    params[m[1]] = m[2];
                }
            });
        }
        return params;
    }
};

let bytesToSize = function(bytes) {
    if (bytes === 0) return '0 B';
    var k = 1000, // or 1024
        sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        i = Math.floor(Math.log(bytes) / Math.log(k));
   return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
}

var getCookie = function(name){
  var arr,
      reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
  if(arr=document.cookie.match(reg))
    return unescape(arr[2]);
  else
  return null;
};

function setCookie(cookiename, cookievalue, hours) {
  var date = new Date();
  date.setTime(date.getTime() + Number(hours) * 3600 * 1000);
  document.cookie = cookiename + "=" + cookievalue + "; path=/;expires = " + date.toGMTString();
};

function send(params){
  request.apply($,[{
    url: "/other/write-log",
    type:"get",
    data: params
  }]);
}

export default {URL, bytesToSize, getCookie, setCookie, send};