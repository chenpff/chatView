
const axios = require('axios');

let instance = axios.create({
    baseURL: config()'/api/v2',
    timeout: 10000
});

let queryData = Url.query();

let $httpClient = function(config) {
    var token = '', location = '';
    if (queryData) {
        token = queryData.token ? queryData.token : Tool.getCookie('token');
        location = queryData.lng ? `${queryData.lng},${queryData.lat}` : `${Tool.getCookie('lng')},${Tool.getCookie('lat')}`;
    }else if (config.token) {
        token = config.token;
    }

    location = Tool.getCookie('lng') ? `${Tool.getCookie('lng')},${Tool.getCookie('lat')}` : location;

    config.headers = {
        'Authorization': token,
        'X-Geo-Location': location,
        'Content-Type': 'application/json; charset=UTF-8'
        // 'Content-Type': 'application/x-www-form-urlencoded'
    };

    // dataAcquisition.store.traceId = dataAcquisition.util.getUuid();
    // dataAcquisition.bindCodeHook();
    instance.interceptors.response.use(function (response) {
        // 对响应数据做处理
        // console.log(response);
        // let opts = response.config;
        // opts.startTime = new Date();
        // let XMLHttpRequest = response.request;
        //
        // var url = /^[^#?]+/.exec(opts.url)[0],
        //     whiteOpt = dataAcquisition.store.whiteList[url],
        //     isWhite = null,
        //     resData = XMLHttpRequest.responseText,
        //     isReport = true;
        //
        // if (resData) {
        //     try {
        //         resData = JSON.parse(resData);
        //     } catch (e) {
        //         resData = {};
        //     }
        // }
        // if (XMLHttpRequest.status === 200
        //     && (resData.code === 10000
        //         || resData.code === '10000'
        //         || resData.successful
        //         || (resData.message && resData.message === '登录超时')
        //         || (resData.resultCode && resData.resultCode.code && resData.resultCode.code === 'TOKEN_EXPIRE')
        //         || (resData.msg && resData.msg === '用户未登录')
        //     )
        // ) {
        //     isReport = false;
        // }
        // //白名单的接口,不上报
        // if (isReport && whiteOpt) {
        //     //URL配置为1, 不上报
        //     if (whiteOpt === 1) {
        //         isReport = false;
        //     }
        //
        //     //URL在白名单内, 且出参满足白名单的条件, 不上报
        //     if (typeof whiteOpt === 'object') {
        //         isWhite = (function () {
        //             var result;
        //
        //             /**
        //              * 将URL白名单的配置与返回结果对比, 是否匹配白名单的配置
        //              * @param opt       {Object} 白名单配置
        //              * @param optOri    {Object} 接口返回结果
        //              * @return {Boolean}
        //              */
        //             function compareOpt(opt, optOri) {
        //                 var isWhite;
        //                 for (var key  in opt) {
        //                     isWhite = true;
        //                     if (opt.hasOwnProperty(key)) {
        //                         if (typeof opt[key] === 'object' && opt[key] !== null) {
        //                             isWhite = dataAcquisition.util.isNullOrEmpty(optOri) ? false : compareOpt(opt[key], optOri[key]);
        //                             if (isWhite === false) {
        //                                 break;
        //                             }
        //                             continue;
        //                         }
        //                         if (opt[key] !== optOri[key]) {
        //                             isWhite = false;
        //                             break;
        //                         }
        //                     }
        //                 }
        //                 return isWhite;
        //             }
        //
        //             //白名单的配置可以是数组,必须满足数组的每一项目配置,最终才会认定是白名单
        //             if (whiteOpt instanceof Array) {
        //                 for (var i = 0, len = whiteOpt.length; i < len; i++) {
        //                     result = compareOpt(whiteOpt[i], resData);
        //                     if (result) {
        //                         break;
        //                     }
        //                 }
        //
        //             } else if (whiteOpt instanceof Object) {
        //                 result = compareOpt(whiteOpt, resData);
        //             }
        //
        //             return result;
        //         }());
        //
        //         if (isWhite === true) {
        //             isReport = false;
        //         }
        //     }
        // }
        //
        // //todo 3
        // if (isReport) {
        //     dataAcquisition.setAjErrAc(opts, XMLHttpRequest);
        // } //会导致页面请求过多卡死情况
        // completeCallback && completeCallback(XMLHttpRequest, textStatus, errorThrown);
        return response;
    }, function (error) {
        // 对响应错误做处理
        return Promise.reject(error);
    });

    return instance.request(config);
};

export default $httpClient;
