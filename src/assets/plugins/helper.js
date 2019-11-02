
var helper = {
    getUrlQueryString: function(name) { // 获取url参数
        var query = window.location.hash.substring(3);
        var vars = query.split("&");
        for (var i=0;i<vars.length;i++) {
            var pair = vars[i].split("=");
            if(pair[0] == name){return pair[1];}
        }
        return false;
    },
    //判断是否是IOS
    isIos: function () {
        return navigator.userAgent.indexOf("iPhone") > 0 || navigator.userAgent.indexOf("iPad") > 0 || navigator.userAgent.indexOf("iPod") > 0;
    },
    // 判断是否是微信
    isInWeixin: function () {
        return navigator.userAgent.indexOf("MicroMessenger") > 0 ? true : false;
    },
    // 判断是否是QQ
    isInQQ: function () {
        return navigator.userAgent.indexOf("QQ") > 0 ? true : false;
    },

    // 日期处理
    formatTime: function (time) {
        var result = [];
        time = window.parseInt(time);
        if (time / 1440 >= 1) {
            result.push(Math.floor(time / 1440) + '天');
            time = time % 1440;
        }
        if (time / 60 >= 1) {
            result.push(Math.floor(time / 60) + '小时');
            time = time % 60;
        }
        if (time > 0) {
            result.push(Math.floor(time) + '分钟');
        }
        return result.join('');
    }
}
export default helper
