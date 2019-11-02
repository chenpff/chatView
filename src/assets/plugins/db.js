
import user from './user';
let prefix = "u" + user.id + "_";

export default {
    init: function (fn1, fn2) {
        let IDBRequest = indexedDB.open(prefix + 'chat');
        IDBRequest.onupgradeneeded = function (e) {
            console.log('DB Upgrading...');
            fn1(e.target.result);
        };
        IDBRequest.onsuccess = function (e) {
            console.log('DB Success...');
            let db = IDBRequest.result;
            fn1(db);
            if (fn2) fn2(db)
        }
    }
};