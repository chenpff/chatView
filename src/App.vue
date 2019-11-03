<script>
    import user from './assets/plugins/user'
    import userList from './assets/plugins/userList'
    import teamList from './assets/plugins/teamList'
    import store from './assets/plugins/store';
    import historyMessage from './assets/plugins/historyMessage';

    import card from './components/card';
    import list from './components/list';
    import tList from './components/teamList';
    import xtext from './components/text';
    import message from './components/message';
    import tab from './components/tab';

    export default {
        data () {

            // 当前与之会话的人
            let localSessionUser = store.get('sessionUser');
            if(!localSessionUser){
                localSessionUser = {}
            }

            return {
                user: user,// 当前登录用户，通过url userId获得
                userList: userList, //历史会话用户列表
                teamList: teamList, //历史会话用户列表

                sessionUser: localSessionUser,
                search: '',// 搜索key
                check:1,//默认展示单聊
            };
        },
        watch: {
            // 监听聊天记录，当前会话消息保存到localStorage中
            sessionUser: {
                deep: true,
                handler (after) {
                    store.set('sessionUser',after);
                }
            },
            check(val){
                console.log(val);
            }
        },
        methods:{
            onSessionUser: function(val){
                this.sessionUser = val;
                store.set('sessionUser',this.sessionUser);
            },
            sendMessage: function (item) {
                let _this = this;
                historyMessage.add(item,(e)=>{
                    item.id = e.result;
                    _this.sessionUser.message.push(item);
                });

                //this.sendOne("测试。。");
            },
            sendOne(m){
                let item = {
                    sessionType: 1,
                    sessionId: 2,
                    message: m,
                    fromId: 2,
                    serverMessageId: 0,
                    isRead: 0
                };
                if(this.sessionUser.id === item.sessionId) item.isRead = 1;//判断当前聊天窗口打开的情况下未读数不++
                this.sessionUser.message.push(item);
                historyMessage.add(item);
            }
        },
        components: {
            card, list, xtext, message,tList,tab
        }

    };

</script>

<template>
  <div id="chat">
    <div class="sidebar">
      <card :user="user" :search.sync="search"></card>
      <tab :check.sync="check"></tab>

      <list v-if="check === 1" :user-list="userList" :session-user.sync="sessionUser" :search="search" @onSessionUser="onSessionUser"></list>
      <tList v-if="check === 2" :team-list="teamList" :session-user.sync="sessionUser" :search="search" @onSessionUser="onSessionUser"></tList>
    </div>
    <div class="main">
      <message :user="user" :session-user="sessionUser"></message>
      <xtext :user="user" :session-user="sessionUser" @sendMessage="sendMessage"></xtext>
    </div>
  </div>
</template>

<style lang="less">
  #chat {
    overflow: hidden;
    border-radius: 3px;

    .sidebar, .main {
      height: 100%;
    }
    .sidebar {
      float: left;
      width: 230px;
      color: #f4f4f4;
      background-color: #2e3238;
    }
    .main {
      position: relative;
      overflow: hidden;
      background-color: #eee;
    }
    .m-text {
      position: absolute;
      width: 100%;
      bottom: 0;
      left: 0;
    }
    .box {
      height: ~'calc(100% - 160px)';
    }
  }
</style>
