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

export default {URL, bytesToSize, getCookie, setCookie};