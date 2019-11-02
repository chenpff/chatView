import historyMessage from './historyMessage';

const defaultSize = 3; //刷新后默认展示几条历史记录

export default {
    message:[],
    history: [],//当前历史消息
    default: function () {
        if (!historyMessage) {
            return []
        }

        let messages = historyMessage.get();
        for(let key in messages){
            let item = messages[key];
            messages[key]['defaultMessage'] = item.messages.slice(-defaultSize);
            messages[key]['historyMessage'] = item.messages.slice(0, -defaultSize);
            messages[key]['defaultMessageNum'] = messages[key]['defaultMessage'].length;
        }
        return messages;
    },
    more: function (page = 1, pageSize = 10) {
        if (!this.sessionUser || !this.sessionUser.id) {
            return [];
        }

        if (!this.history) {
            return []
        }

        let start = (page - 1) * pageSize * -1;
        let end = start - pageSize;

        if (start === 0) {
            return this.history.slice(end);
        }
        return this.history.slice(end, start)
    },
    save: function (message) {
        let newMessage = message.defaultMessage.slice(message.defaultMessageNum);
        console.log(newMessage,'new');
        historyMessage.set(message,newMessage);
    }

};