<script>
export default {
  props: [
    'teamList', //在线qun列表
    'sessionUser', //当前聊天的qun
    'search', //搜索关键字
  ],
  data(){
    return {
      nowSessionUser:this.sessionUser,
      nowTeamList:this.teamList.filter((item) => item.name.indexOf(this.search) > -1),
    }
  },
  watch: {
    sessionUser(val) {
      this.nowSessionUser = val;//监听外部对props属性sessionIndex的变更，并同步到组件内的data属性nowSessionIndex中
    },
    search(val){
      this.nowTeamList = this.teamList.filter((item) => item.name.indexOf(val) > -1);
    },
    teamList(val){
      this.nowTeamList = val;
    }
  },
  methods: {
    select (item) {
      this.nowSessionUser = {
        id:item.id,
        name:item.name,
        avatar:item.avatar,
        message:item.message,
        type:2,//群聊
        index:this.teamList.indexOf(item),
      };
      this.$emit("onSessionUser",this.nowSessionUser);
    }
  },
};
</script>

<template>
<div class="m-list">
  <ul>
  <li v-for="item in nowTeamList" :class="{ active: nowSessionUser.id === item.id }" @click="select(item)">
  <img class="avatar"  width="30" height="30" :alt="item.name" :src="item.avatar">
  <p class="name">{{item.name}}</p>
</li>
</ul>
</div>
</template>

<style lang="less">
.m-list {
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
