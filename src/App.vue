<script>
    import user from './assets/plugins/user'
    import userList from './assets/plugins/userList'
    import store from './assets/plugins/store';
    import sessionMessage from './assets/plugins/sessionMessage';
    import historyMessage from './assets/plugins/historyMessage';

    import card from './components/card';
    import list from './components/list';
    import xtext from './components/text';
    import message from './components/message';

    export default {
        data () {

            // 当前与之会话的人
            let localSessionUser = store.get('sessionUser');
            if(!localSessionUser){
                localSessionUser = {}
            }

            return {
                user: user,// 当前登录用户，通过url userId获得
                userList: userList, //用户列表

                sessionUser: localSessionUser,
                sessionMessage: [],
                search: ''// 搜索key
            };
        },
        watch: {
            // 监听聊天记录，保存到localStorage中
            sessionMessage: {
                deep: true,
                handler (after) {
                    console.log(after, 'after');
                    // sessionMessage.save();
                }
            }
        },
        methods:{
            onSessionUser: function(val){
                this.sessionUser = val;
                store.set('sessionUser',this.sessionUser);

                this.sessionMessage = historyMessage.get();
            },
            sendMessage: function (item) {
                console.log(item, 'add');
                historyMessage.add(item);
            }
        },
        components: {
            card, list, xtext, message
        }

    };

</script>

<template>
  <div id="chat">
    <div class="sidebar">
      <card :user="user" :search.sync="search"></card>
      <list :user-list="userList" :session-user.sync="sessionUser" :search="search" @onSessionUser="onSessionUser"></list>
    </div>
    <div class="main">
      <message :sessionMessage="sessionMessage" :user="user" :session-user="sessionUser"></message>
      <xtext :sessionMessage="sessionMessage" :user="user" :session-user="sessionUser"
             @sendMessage="sendMessage"></xtext>
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
      width: 200px;
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
    .m-message {
      height: ~'calc(100% - 160px)';
    }
  }
</style>