/**
 *  获取头像
 */
let avatars = {
    0 : "06da304b-fba8-11e9-bdac-0242ac142204",
    1 : "223e47fa-fba8-11e9-bdac-0242ac142204",
    2 : "30cb20b6-fba8-11e9-bdac-0242ac142204",
    3 : "373784da-fba8-11e9-bdac-0242ac142204",
    4 : "3e459c2d-fba8-11e9-bdac-0242ac142204",
    5 : "4419ea0a-fba8-11e9-bdac-0242ac142204",
    6 : "4b52de2d-fba8-11e9-bdac-0242ac142204",
    7 : "52924f9f-fba8-11e9-bdac-0242ac142204",
    8 : "5966e98c-fba8-11e9-bdac-0242ac142204",
    9 : "5f86c893-fba8-11e9-a63f-0242ac143004",
}

export default {
    get : function (id) {
        return "http://file.qingyidai.com/fileserver/view?id=" + avatars[id%10];
    }
};