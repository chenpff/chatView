import avatar from './avatar';
import historyMessage from './historyMessage';

let teamList = [
  {
    id: 6,
    name: '群2',
    avatar: avatar.get(6),
    message:[]
  },
  {
    id: 7,
    name: '群3',
    avatar: avatar.get(7),
    message:[]
  }
];

for(let key in teamList){
  let item = teamList[key];
  historyMessage.get((message)=>{
    if(item.id != message.sessionId || message.sessionType != 2) return ;
    item.message.push(message);
  });
}


export default teamList ;
