import avatar from './avatar';
import historyMessage from './historyMessage';

let userList = [
    {
        id: 2,
        name: '用户2',
        avatar: avatar.get(2),
      message:[]
    },
    {
        id: 3,
        name: '用户3',
        avatar: avatar.get(3),
        message:[]
    }
];

for(let key in userList){
  let item = userList[key];
  historyMessage.get((message)=>{
    if(item.id != message.sessionId || message.sessionType != 1) return ;//单聊且是自己的聊天记录
    item.message.push(message);
  });
}


export default userList ;
