<template>
  <div>
    <!-- 搜索结果页-头部导航 -->
    <div class="search-result-container">
      <!-- 点击实现后退效果 -->
      <van-nav-bar title="搜索结果" left-arrow @click-left="$router.go(-1)" fixed />
    </div>
    <!-- 文章列表 -->
    <div>
      <van-list :immediate-check="false" v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <ArticleItem @click.native="itemClickFn(obj.art_id)" :isShow="false" v-for="obj in articleList" :key="obj.art_id" :artObj="obj"></ArticleItem>
      </van-list>
    </div>
  </div>
</template>

<script>
import { searchResultAPI } from '@/api'
import ArticleItem from '@/components/ArticleItem.vue'
export default {
  name: 'SearchResult',
  data() {
    return {
      page: 1,
      articleList: [],
      loading: false,
      finished: false
    }
  },
  async created() {
    const res = await searchResultAPI({
      page: this.page,
      q: this.$route.params.kw
    })
    // console.log(res)
    // console.log(this.$route.params) //{kw: '好不好'}
    this.articleList = res.data.data.results
    //403表示没有权限
  },
  methods: {
    async onLoad() {
      if (this.articleList.length > 0) {
        this.page++
        const res = await searchResultAPI({
          page: this.page,
          q: this.$route.params.kw
        })
        if (res.data.data.results.length === 0) {
          this.finished = true
          return
        }
        // console.log(res)
        // console.log(this.$route.params) //{kw: '好不好'}
        this.articleList = [...this.articleList, ...res.data.data.results]
        this.loading = false
      }
    },
    itemClickFn(id) {
      // console.log(id)
      this.$router.push({
        path: `/detail?art_id=${id}`
      })
    }
  },
  components: {
    ArticleItem
  }
}
</script>

<style lang="less" scoped>
.search-result-container {
  padding-top: 46px;
}
</style>
