<script>
    export default {
        props: ['user', 'search'],
        data(){
            return{
                nowSearch:this.search
            }
        },
        watch: {
            search() {
                this.nowSearch = this.search;
            },
            nowSearch() {
                this.$emit('update:search', this.nowSearch);
            }
        },
    };
</script>

<template>
    <div class="m-card">
        <header>
            <img class="avatar" width="50" height="50" :alt="user.name" :src="user.avatar">
            <p class="name">{{user.name}}</p>
        </header>
        <footer>
            <input class="search" type="text" placeholder="搜索..." v-model="nowSearch">
        </footer>
    </div>
</template>

<style lang="less">
    .m-card {
        padding: 12px;
        border-bottom: solid 1px #24272C;

        footer {
            margin-top: 10px;
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
            font-size: 16px;
        }
        .search {
            padding: 0 10px;
            width: 100%;
            font-size: 12px;
            color: #fff;
            height: 30px;
            line-height: 30px;
            border: solid 1px #3a3a3a;
            border-radius: 4px;
            outline: none;
            background-color: #26292E;
        }
    }
</style>
