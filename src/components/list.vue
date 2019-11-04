
<script>

    import historyMessage from '../assets/plugins/historyMessage';

    export default {
        props: [
            'userList', //在线用户列表
            'sessionUser', //当前聊天的UserId
            'search', //搜索关键字
        ],
        data(){
          return {
              makeTeam:{
                  status:false,
                  users:[]
              },
              nowSessionUser:this.sessionUser,
              nowUserList:this.userList.filter((item) => item.name.indexOf(this.search) > -1),
          }
        },
        watch: {
            sessionUser(val) {
                this.nowSessionUser = val;//监听外部对props属性sessionIndex的变更，并同步到组件内的data属性nowSessionIndex中
            },
            search(val){
                this.nowUserList = this.userList.filter((item) => item.name.indexOf(val) > -1);
            },
            userList(ul){
                console.log(ul,'ul');
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
                console.log(ul);
                this.nowUserList = ul;
            },
            makeTeam:{
                deep: true,
                    handler (after) {
                    console.log(after);
                }
            }
        },
        computed:{
            descUserList(){
                let ul = this.nowUserList;
                let len = ul.length;
                for (let i = 0; i < len; i++) {
                    for (let j = 0; j < len - 1 - i; j++) {
                        let a = ul[j].message[0] ? ul[j].message[ul[j].message.length - 1].time : 0;
                        let b = ul[j+1].message[0] ? ul[j+1].message[ul[j+1].message.length - 1].time : 0;

                        if (a < b) {//相邻元素两两对比
                            let t = ul[j+1];        //元素交换
                            ul[j+1] = ul[j];
                            ul[j] = t;
                        }
                    }
                }
                return this.nowUserList = ul;
            }
        },
        methods: {
            select (item) {
                //打开新的聊天框，把未读消息置为已读
                item.message.filter((d)=>{
                    if(d.isRead === 0){
                        d.isRead = 1;
                        historyMessage.put(d);
                        return d.isRead = 1;
                    }
                });

                this.nowSessionUser = {
                    id:item.id,
                    name:item.name,
                    avatar:item.avatar,
                    message:item.message,
                    type:1,//群聊
                    index:this.userList.indexOf(item),
                };
                this.$emit("onSessionUser",this.nowSessionUser);
            },
            openMakeTeam(){
                this.makeTeam.status = !this.makeTeam.status;
            },
            makeTeamPost(){

            },
            unReadNum(item){
                return item.message.filter((d)=>{
                    return d.isRead === 0;
                }).length;
            }
        },
    };
</script>

<template>
    <div class="m-list">
        <div>
          <button v-if="!makeTeam.status" @click="openMakeTeam">创建群聊</button>
          <button v-else @click="openMakeTeam">取消</button>
          <button v-if="makeTeam.status" @click="makeTeamPost">确认<a v-if="makeTeam.users.length > 0">({{makeTeam.users.length}})</a></button>
        </div>
        <ul>
            <li v-for="item in descUserList" :class="{ active: nowSessionUser.id === item.id }" @click="select(item)">
                <input type="checkbox" v-if="makeTeam.status" v-model="makeTeam.users" :value="item.id" @click.stop/>
                <img class="avatar" v-if="item.status === 1" :alt="item.name" :src="item.avatar">
                <img class="avatar gray" v-else :alt="item.name" :src="item.avatar">
                <i v-if="num = unReadNum(item)">{{num}}</i>
                <span>
                  <p class="name" v-if="item.status === 14">{{item.name}} (退出)</p>
                  <p class="name" v-else-if="item.status === 4">{{item.name}} (离线)</p>
                  <p class="name" v-else>{{item.name}}</p>
                  <p class="desc">{{item.message[0] ? item.message[item.message.length - 1].message : ''}}</p>
                </span>
            </li>
        </ul>
    </div>
</template>

<style lang="less">
    .m-list {
        div{
          border-bottom: 1px solid #292C33;
        }
        button{
          margin: 5px 0 5px 5px;
        }
        p{

        }
        li {
            padding: 10px 10px;
            border-bottom: 1px solid #292C33;
            cursor: pointer;
            transition: background-color .1s;
            position: relative;
            &:hover {
                background-color: rgba(255, 255, 255, 0.03);
            }
            &.active {
                background-color: rgba(255, 255, 255, 0.1);
            }
        }
        i{
          display: flex;
          height: 20px;
          width: 20px;
          position: absolute;
          left: 30px;
          top:5px;
          background-color: #f52c2c;
          font-size: 8px;
          border-radius: 50%;
          justify-content: center;
          align-items: center;
        }
        .avatar, .name {
            vertical-align: middle;
        }
        img{
          display: inline-block;
          float: left;
          &.gray {
            -webkit-filter: grayscale(100%);
            -moz-filter: grayscale(100%);
            -ms-filter: grayscale(100%);
            -o-filter: grayscale(100%);
            filter: grayscale(100%);
            filter: gray;
          }
        }
        span{
          display: inline-block;
          flex-flow: column;
          width: 165px;
        }
        .desc{
          line-height: 10px;
          margin: 0px 0px 5px 10px;
          font-size: smaller;
          color:#928e8e;
            height: 10px;
        }
        .avatar {
            border-radius: 2px;
            width: 45px;
            height: 45px;
        }
        .name {
            display: inline-block;
            margin: 3px 0 5px 10px;
            line-height: 20px;
        }
    }
</style>
