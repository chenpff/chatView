import helpler from './helper.js';
import avatar from './avatar';

const userId = helpler.getUrlQueryString('userId');

export default {
    id : userId ,
    name : "用户" + userId ,
    avatar : avatar.get(userId),
    info : function(){
        return {
            server : '127.0.0.1',
            port : 10086,
        };
    }
};