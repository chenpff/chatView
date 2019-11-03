<script>
    export default {
        name:'xtext',
        props: [
            'user',//用户自己
            'sessionUser',//聊天用户
        ],
        data () {
            return {
                text: ''
            };
        },
        methods: {
            sendMessage (e) {
                if (e.ctrlKey && e.keyCode === 13 && this.text.length) {
                    /*
                        sessionType //会话类型 群聊，单聊
                        sessionId //会话id  teamId  userId
                        message //消息
                        fromId //谁发的
                        serverMessageId //服务端消息Id
                        isRead //是否已读
                        time //毫秒时间戳
                    */

                    let item = {
                        sessionType: this.sessionUser.type,
                        sessionId: this.sessionUser.id,
                        message: this.text,
                        fromId: this.user.id,
                        serverMessageId: 0,
                        isRead: 1,
                        time:new Date().getTime(),
                    };
                    console.log(item,'item-add')
                    this.$emit('sendMessage', item);
                    this.text = '';
                }
            }
        }
    };
</script>

<template>
    <div class="m-text">
        <textarea v-if="!sessionUser.id" disabled placeholder="按 Ctrl + Enter 发送" v-model="text" @keyup="sendMessage"></textarea>
        <textarea v-else placeholder="按 Ctrl + Enter 发送" v-model="text" @keyup="sendMessage"></textarea>
    </div>
</template>

<style lang="less">
    .m-text {
        height: 160px;
        border-top: solid 1px #ddd;

        textarea {
            padding: 10px;
            height: 100%;
            width: 100%;
            border: none;
            outline: none;
            font-family: "Micrsofot Yahei";
            resize: none;
        }
    }
</style>
