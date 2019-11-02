
export default {
    // 保存指定cookie
    set: function(name, value, day) {
        if(typeof window ==="undefined") return;
        if (!day) day = 5;

        var exp = new Date();
        exp.setTime(exp.getTime() + day * 24 * 60 * 60000);

        var str = name + '=' + value + ';path=/';
        // str += '; domain=' + '';//todo
        str += '; expires=' + exp.toUTCString();
        document.cookie = str;
    },
    // 获取指定cookie
    get: function(name) {
        if(typeof window ==="undefined") return;
        if (name) {
            var arr,
                reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
            if ((arr = document.cookie.match(reg))) return decodeURIComponent(arr[2]);
            else return null
        } else {
            return null
        }
    },
    // 删除指定cookie
    remove: function(key) {
        var exp = new Date()
        exp.setTime(exp.getTime() - 1)
        var cval = this.getCookie(key)
        if (cval != null) {
            document.cookie = key + '=' + cval + ';expires=' + exp.toGMTString();
            document.cookie =
                key +
                '=0;expires=' +
                new Date(0).toUTCString() +
                '; path=/; domain=' +
                document.domain
        }
    },
    // 清除该域名下所有cookie
    clear: function() {
        var keys = document.cookie.match(/[^ =;]+(?==)/g);
        if (keys) {
            for (var i = keys.length; i--; ) {
                document.cookie =
                    keys[i] +
                    '=0;expires=' +
                    new Date(0).toUTCString() +
                    '; path=/; domain=' +
                    document.domain
            }
        }
    }
};