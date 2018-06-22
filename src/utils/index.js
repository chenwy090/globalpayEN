export default {
    getName () {
      return 'brodyliao'
    },
    getInfo () {
        return 'Taoxiaoping'
    },
    getOS () {
        return (function () {
            let u = navigator.userAgent;
            return {
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
                windowPhone: u.indexOf("Windows Phone") >= 0,
                iPad: u.indexOf('iPad') > -1, //是否iPad
                iPod: u.indexOf('iPod') > -1, //是否iPod
                weChat: u.match(/MicroMessenger/i) !== null,//是否为微信
            };
        })();
    }
}


