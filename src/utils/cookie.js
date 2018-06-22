/**
 * Created by moersing on 20/05/2017.
 * @description  操作浏览器cookie
 */
export default {
    /**
     * @desc  获取浏览器cookie
     * @param {string} name - a cookie name
     * */
    getCookie(name) {
        let arr,reg = new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr = document.cookie.match(reg)){
            return unescape(arr[2]); 
        }else{ 
            return null;
        } 
    },
    /**
     * @desc 设置浏览器cookie
     * @param {string} name - a cookie name
     * @param {string} value  - a cookie value
     * @param {string} time -'s+time'||"h+time" ||"d+time" an optional the cookie option
     * */
    setCookie(name, value, time) {
        let strsec = this.getsec(time); 
        console.log("过期时间为--->"+ strsec);
        let exp = new Date(); 
        exp.setTime(exp.getTime() + strsec * 1); 
        document.cookie = name + "=" + escape (value) + ";expires=" + exp.toGMTString();
    },
    getsec(str){
        let str1 = str.substring(1,str.length)  * 1; 
        let str2 =str.substring(0,1); 
        if (str2 == "s")
        { 
            return str1*1000; 
        }
        else if (str2 == "h")
        { 
            return str1*60*60*1000; 
        }
        else if (str2 == "d")
        { 
            return str1*24*60*60*1000; 
        } 
    },
    /**
     * @desc 移除浏览器cookie
     * @desc {string} [name] - 移除的cookie的key
     * */
    delCookie(name) {
        var exp = new Date(); 
        exp.setTime(exp.getTime() - 1); 
        var cval = this.get(name); 
        if(cval != null){ 
            document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
        }
    }
}

// <!-- PIWIK的底层脚本统计代码 -->
//   <script>
//     var _paq = _paq || [];
//     _paq.push(["setCookieDomain", "*.molbase.cn"]);
//     _paq.push(["setUserId", (function(){var arr = document.cookie.match(new RegExp("(| )pin=([;]*)(;|$)")); return (arr != null) ? unescape(arr2) : 0;})()]);
//     _paq.push(['trackPageView']);
//     (function() {
//       var u="//r.molbase.net/";
//       _paq.push(['setTrackerUrl','//ga.molbase.cn/']);
//       _paq.push(['setSiteId', '2']);
//       var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
//       g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'mga.js?v='+((new Date()).getDate())+'.js'; s.parentNode.insertBefore(g,s);
//     })();
//     function mgaTrackLink(url){
//       if(!url)return;
//       try{
//         Piwik.getAsyncTrackers()[0].trackLink(url,'virtual_link');
//       }catch (e){
//         try{console.log('Error fun mgaTrackLink: '+url);}catch(ee){}
//       }
//     }
//   </script>

