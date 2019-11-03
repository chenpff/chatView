<script>
    export default {
        props: ['check'],
        data(){
            return {
                tabs:[
                    {id:1,name:"在线用户"},
                    {id:2,name:"群聊"}
                ],
                nowCheck:this.check,//1单聊，2群聊
            }
        },
        watch: {
            nowCheck(val) {
                this.check = val;
            }
        },
        methods: {
            select (item) {
                this.nowCheck = item.id;
                this.$emit('update:check', this.nowCheck);
            }
        },
    };
</script>

<template>
  <div class="tab">
    <ul>
      <li v-for="item in tabs" :class="{ active: nowCheck === item.id }" @click="select(item)">
        <p class="name">{{item.name}}</p>
      </li>
    </ul>
  </div>
</template>

<style lang="less">
  .tab {
    ul{
      display: flex;
    }
    li {
      width: 50%;
      font-size: small;
      padding:6px 0;
      border-bottom: 1px solid #292C33;
      border-left: 1px solid #292C33;
      cursor: pointer;
      transition: background-color .1s;

      &:hover {
        background-color: rgba(255, 255, 255, 0.03);
      }
      &.active {
        background-color: rgba(255, 255, 255, 0.1);
        vertical-align: middle;
      }
    }
    .name {
      width: 100%;
      text-align: center;
      vertical-align: middle;
      display: inline-block;
      margin: 0 0 0 5px;
    }
  }
</style>
