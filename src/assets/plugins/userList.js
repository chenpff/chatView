import avatar from './avatar';
import historyMessage from './historyMessage';

let userList = [
    {
        id: 2,
        name: '用户2',
        avatar: avatar.get(2),
        status: 1,//在线
        message:[]
    },
    {
        id: 3,
        name: '用户3',
        avatar: avatar.get(3),
        status: 1,//离线
        message:[]
    },
  {
    id: 7,
    name: '用户7',
    avatar: avatar.get(7),
    status: 1,//离线
    message:[]
  }
];

let ul = userList;

//获取历史聊天记录
for(let key in ul){
  let item = ul[key];
  historyMessage.get((message)=>{
    if(item.id != message.sessionId || message.sessionType != 1) return ;//单聊且是自己的聊天记录

    item.message.push(message);
  });
}

//排序
let len = ul.length;
for (let i = 0; i < len; i++) {
  for (let j = 0; j < len - 1 - i; j++) {
    let a = ul[j].message[0] ? ul[j].message[0] : 0;
    let b = ul[j+1].message[0] ? ul[j+1].message[0] : 0;
    if (a < b) {//相邻元素两两对比
      let t = ul[j+1];        //元素交换
      ul[j+1] = ul[j];
      ul[j] = t;
    }
  }
}
userList = ul;

export default userList ;
