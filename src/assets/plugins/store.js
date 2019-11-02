
import user from './user';

let prefix = "_" + user.id + "_";
export default {
    get (key) {
        try {
           return JSON.parse(localStorage.getItem(prefix + key));
        } catch (e) {}
    },
    set (key,value) {
        try {
         localStorage.setItem(prefix + key, JSON.stringify(value));
        } catch (e) {}
    },
    remove: function(key) {
        try {
            localStorage.removeItem(prefix + key)
        } catch (e) {}
    },
    clear: function() {
        try {
            localStorage.clear()
        } catch (e) {}
    },
};