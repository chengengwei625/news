<template>
  <div class="">
    <div class="home_container">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <div>
      <van-tabbar v-model="active">
        <van-tabbar-item icon="home-o" to="/layout/home">首页</van-tabbar-item>
        <van-tabbar-item icon="manager-o" to="/layout/user">我的</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Layout',
  data() {
    return {
      active: 0
    }
  },
  created() {},
  computed: {},
  methods: {}
}
</script>

<style lang="less" scoped>
.home_contaiiner {
  padding-bottom: 50px;
}
.van-tabbar {
  border-top: 1px solid #f8f8f8;
}
</style>
