<script>
    import Vue from 'Vue'
    let _this ;
    export default {
        props: ['sessionMessage', 'user', 'sessionUser'],
        data:function(){
            _this = this;
            return  {

            };
        },
        filters: {
            // 筛选出用户头像
            avatar (item) {
                let user = item.self ? _this.user : _this.sessionUser;
                return user && user.avatar;
            },
            // 将日期过滤为 hour:minutes
            time() {
                let date = new Date();
                return date.getHours() + ':' + date.getMinutes();
            }
        },
        directives: {
            // 发送消息后滚动到底部
            'scroll-bottom' (el) {
                Vue.nextTick(() => {
                    el.scrollTop = el.scrollHeight - el.clientHeight;
                });
            }
        }
    };
</script>

<template>
    <div class="m-message" v-scroll-bottom="sessionMessage">
        <ul>
            <li v-for="item in sessionMessage">
                <p class="time"><span>{{item.date | time}}</span></p>
                <div class="main" :class="{ self: item.fromId === user.id }">
                    <img class="avatar" width="30" height="30" :src="item | avatar" />
                    <div class="text">{{item.message}}</div>
                </div>
            </li>
        </ul>
    </div>
</template>

<style lang="less">
    .m-message {
        padding: 10px 15px;
        overflow-y: scroll;
        
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
</style>