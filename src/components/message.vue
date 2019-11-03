<script>
    import Vue from 'Vue';
    import helper from "../assets/plugins/helper";
    let _this ;
    export default {
        props: ['user', 'sessionUser'],
        data:function(){
            _this = this;
            return  {
                search:'',
                message:this.sessionUser.message,
            };
        },
        watch:{
            sessionUser(){
                this.message = this.sessionUser.message;
            },
            search(search){
                this.message = this.sessionUser.message.filter((item)=> item.message.indexOf(search) > -1);
            }
        },
        filters: {
            // 筛选出用户头像
            avatar (item) {
                let user = item.fromId === _this.user.id ? _this.user : _this.sessionUser;
                return user && user.avatar;
            },
            // 将日期过滤为 hour:minutes
            time(item) {
                let date = new Date(item.time);
                return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
            }
        },
        directives: {
            // 发送消息后滚动到底部
            'scroll-bottom' (el) {
                Vue.nextTick(() => {
                    el.scrollTop = el.scrollHeight - el.clientHeight;
                });
            }
        },
        methods:{
            searchLine(e){
                console.log(e,'e');
                console.log(e.scrollHeight,'e');
            }
        }
    };
</script>

<template>
    <div class="box">
        <div class="m-message" v-scroll-bottom="message">
            <ul>
                <li v-for="item in message">
                    <p class="time" v-if=false><span>{{item.time | time}}</span></p>
                    <div class="main" :class="{ self: item.fromId === user.id }">
                        <img class="avatar" width="30" height="30" :src="item | avatar" />
                        <div class="text">{{item.message}}<span v-if="search">  |  {{item | time}}</span></div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="tools">
          <input class="search" type="text" placeholder="搜索历史记录..." v-model="search">
        </div>
    </div>
</template>

<style lang="less">
    .box{
      position:relative ;
    .m-message {
        height: ~'calc(100% - 35px)' ;
        padding: 15px;
        overflow-y: scroll;

        ul{
        }
        li {
            margin-bottom: 15px;
        }
        .time {
            margin: 7px 0;
            text-align: center;

            > span {
                display: inline-block;
                padding: 0 18px;
                font-size: 12px;
                color: #fff;
                border-radius: 2px;
                background-color: #dcdcdc;
            }
        }
        .avatar {
            float: left;
            margin: 0 10px 0 0;
            border-radius: 3px;
        }
        .text {
            display: inline-block;
            position: relative;
            padding: 0 10px;
            max-width: ~'calc(100% - 40px)';
            min-height: 30px;
            line-height: 2.5;
            font-size: 12px;
            text-align: left;
            word-break: break-all;
            background-color: #fafafa;
            border-radius: 4px;

            &:before {
                content: " ";
                position: absolute;
                top: 9px;
                right: 100%;
                border: 6px solid transparent;
                border-right-color: #fafafa;
            }
            >span{
            }
        }

        .self {
            text-align: right;

            .avatar {
                float: right;
                margin: 0 0 0 10px;
            }
            .text {
                background-color: #b2e281;

                &:before {
                    right: inherit;
                    left: 100%;
                    border-right-color: transparent;
                    border-left-color: #b2e281;
                }
            }
        }
    }
      .tools{
          position: absolute;
          height: 35px;
          bottom: 0px;
          left: 0;
          right: 0;
        .search{
          display: inline-block;
          height: 25px;
          border: 0px;
          padding: 3px 5px;
          margin: 3px 0 2px 0;
          font-size: smaller;
          float: right;
        }
      }
    }
</style>
