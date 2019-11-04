<script>
    export default {
        props: [
            'teamList', //在线qun列表
            'sessionUser', //当前聊天的qun
            'search', //搜索关键字
        ],
        data() {
            return {
                nowSessionUser: this.sessionUser,
                nowTeamList: this.teamList.filter((item) => item.name.indexOf(this.search) > -1),
            }
        },
        watch: {
            sessionUser(val) {
                this.nowSessionUser = val;//监听外部对props属性sessionIndex的变更，并同步到组件内的data属性nowSessionIndex中
            },
            search(val) {
                this.nowTeamList = this.teamList.filter((item) => item.name.indexOf(val) > -1);
            },
            teamList(val) {
                this.nowTeamList = val;
            }
        },
        methods: {
            select(item) {
                this.nowSessionUser = {
                    id: item.id,
                    name: item.name,
                    avatar: item.avatar,
                    message: item.message,
                    type: 2,//群聊
                    index: this.teamList.indexOf(item),
                };
                this.$emit("onSessionUser", this.nowSessionUser);
            },
            unReadNum(item) {
                return item.message.filter((d) => {
                    return d.isRead === 0;
                }).length;
            }
        },
    };
</script>

<template>
    <div class="m-list">
        <ul>
            <li v-for="item in nowTeamList" :class="{ active: nowSessionUser.id === item.id }" @click="select(item)">
                <img class="avatar" :alt="item.name" :src="item.avatar">
                <i v-if="num = unReadNum(item)">{{num}}</i>
                <span>
                    <p class="name">{{item.name}}</p>
                    <p class="desc">{{item.message[0] ? item.message[item.message.length - 1].message : ''}}</p>
                </span>
            </li>
        </ul>
    </div>
</template>

<style lang="less">
    .m-list {
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
        img {
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
        .avatar, .name {
            vertical-align: middle;
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
        i {
            display: flex;
            height: 20px;
            width: 20px;
            position: absolute;
            left: 30px;
            top: 5px;
            background-color: #f52c2c;
            font-size: 8px;
            border-radius: 50%;
            justify-content: center;
            align-items: center;
        }
        span {
            display: inline-block;
            flex-flow: column;
            width: 165px;
        }
        .desc {
            line-height: 10px;
            margin: 0px 0px 5px 10px;
            font-size: smaller;
            color: #928e8e;
            height: 10px;
        }
    }
</style>
