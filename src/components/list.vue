<script>
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
            userList(val){
                this.nowUserList = val;
            },
            makeTeam:{
                deep: true,
                    handler (after) {
                    console.log(after);
                }
            }
        },
        methods: {
            select (item) {
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
            mekeTeamPost(){

            }
        },
    };
</script>

<template>
    <div class="m-list">
        <div>
          <button v-if="!makeTeam.status" @click="openMakeTeam">创建群聊</button>
          <button v-else @click="openMakeTeam">取消</button>
          <button v-if="makeTeam.status" @click="mekeTeamPost">确认<a v-if="makeTeam.users.length > 0">({{makeTeam.users.length}})</a></button>
        </div>
        <ul>
            <li v-for="item in nowUserList" :class="{ active: nowSessionUser.id === item.id }" @click="select(item)">
                <input type="checkbox" v-if="makeTeam.status" v-model="makeTeam.users" :value="item.id" @click.stop/>
                <img class="avatar"  width="30" height="30" :alt="item.name" :src="item.avatar">
                <p class="name">{{item.name}}</p>
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
          line-height: normal;
        }
        li {
            padding: 12px 15px;
            border-bottom: 1px solid #292C33;
            cursor: pointer;
            transition: background-color .1s;

            &:hover {
                background-color: rgba(255, 255, 255, 0.03);
            }
            &.active {
                background-color: rgba(255, 255, 255, 0.1);
            }
        }
        .avatar, .name {
            vertical-align: middle;
        }
        .avatar {
            border-radius: 2px;
        }
        .name {
            display: inline-block;
            margin: 0 0 0 15px;
        }
    }
</style>
