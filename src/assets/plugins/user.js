import helpler from './helper.js';
import avatar from './avatar';

const userId = helpler.getUrlQueryString('userId');

export default {
    id : userId ,
    name : "用户" + userId ,
    avatar : avatar.get(userId),
    status:1,//1:在线 4:离线（可以接收通知） 14:登出（联系不上那种）
    info : function(){
        return {
            server : '127.0.0.1',
            port : 10086,
        };
    }
};
