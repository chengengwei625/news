<template>
  <div id="app">
    <!-- 优化组件是否缓存 -->
    <keep-alive exclude="Search,SearchResult,Detail,UserEdit">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less"></style>
