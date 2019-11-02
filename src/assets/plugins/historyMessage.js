//历史记录

import store from './store';
import db from './db';

/*
    id
    sessionType //会话类型 群聊，单聊
    sessionId //会话id  teamId  userId
    message //消息
    fromId //谁发的
    serverMessageId //服务端消息Id
    isRead //是否已读
*/


export default {
    history:[],
    add: function (item) {
        db.init(
            function (db) {
                let objectStore;
                if (!db.objectStoreNames.contains('history')) {
                    objectStore = db.createObjectStore('history', {autoIncrement: true, keyPath: 'id'});
                    objectStore.createIndex('message', 'message', {unique: false});
                }
            },
            function (db) {
                let request = db.transaction(['history'], 'readwrite')
                    .objectStore('history').add(item);
                request.onsuccess = function (event) {
                    console.log('数据写入成功');
                };
                request.onerror = function (event) {
                    console.log('数据写入失败');
                }
            }
        )
    },
    get: function () {
        db.init(function (db) {
            let objectStore = db.transaction('history').objectStore('history');
            objectStore.openCursor().onsuccess = function (event) {
                var cursor = event.target.result;

                if (cursor) {
                    console.log('Id: ' + cursor.key);
                    console.log('Name: ' + cursor.value.message);
                    cursor.continue();
                } else {
                    console.log('没有更多数据了！');
                }
            };
        });
    },
    set:function (message,newMessage) {
        if(!newMessage){
            return ;
        }

        if(!this.history[message.sessionUser.id]){
            this.history[message.sessionUser.id] = {
                'type':1,//单聊，群聊
                'sessionUser':message.sessionUser,
                'messages':[]
            };
        }

        newMessage.map((item)=>{
            this.history[message.sessionUser.id]['messages'].push(item);
        });
        console.log(this.history,'store');
        store.set('historyMessage',this.history);
    },
    search:function () {

    }
};