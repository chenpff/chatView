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
    get: function (fn) {
        db.init(function (db) {
            let objectStore = db.transaction('history').objectStore('history');
            objectStore.openCursor().onsuccess = function (event) {
                let cursor = event.target.result;
                let message = [];
                if (cursor) {
                    let a = {
                      id: cursor.key,
                      sessionType: cursor.value.sessionType,
                      sessionId: cursor.value.sessionId,
                      message: cursor.value.message,
                      fromId: cursor.value.fromId,
                      serverMessageId: cursor.value.serverMessageId,
                      isRead: cursor.value.isRead,
                    }
                    fn(a);
                    cursor.continue();
                } else {

                }
            };
        });
    },
    search:function () {

    }
};
