<template>
  <div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list offset="50" :immediate-check="false" v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <ArticleItem @click.native="itemClickFn(obj.art_id)" @reportEV="reportFn" @disLikeEV="disLikeFn" v-for="obj in list" :key="obj.art_id" :artObj="obj"></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import ArticleItem from '@/components/ArticleItem.vue'
import { getALLArticleListAPI, dislikeArticleAPI, reportArticleAPI } from '@/api/index.js'
export default {
  props: {
    // list: Array
    channelId: Number
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      theTime: new Date().getTime(),
      isLoading: false
    }
  },
  components: { ArticleItem },
  created() {
    this.getArticleListFn()
    // const res = await getALLArticleListAPI({ channel_id: this.channelId, timestamp: this.theTime })
    // console.log(res)
    // this.list = res.data.data.results
    // this.theTime = res.data.data.pre_timestamp
  },
  methods: {
    // 专门负责发送请求
    async getArticleListFn() {
      const res = await getALLArticleListAPI({
        channel_id: this.channelId,
        timestamp: this.theTime
      })
      console.log(res)
      this.list = [...this.list, ...res.data.data.results]
      this.theTime = res.data.data.pre_timestamp
      this.loading = false
      if (res.data.data.pre_timestamp === null) {
        this.finished = true
      }
      this.isLoading = false
    },
    // 底部加载事件方法
    async onLoad() {
      this.getArticleListFn()
      // const res = await getALLArticleListAPI({
      //   channel_id: this.channelId,
      //   timestamp: this.theTime
      // })
      // console.log(res)

      // this.list = [...this.list, ...res.data.data.results]
      // this.theTime = res.data.data.pre_timestamp
      // this.loading = false
      // if (res.data.data.pre_timestamp === null) {
      //   this.finished = true
      // }
    },
    // 顶部刷新数据事件方法
    async onRefresh() {
      this.list = []
      this.theTime = new Date().getTime()
      this.getArticleListFn()
      // const res = await getALLArticleListAPI({
      //   channel_id: this.channelId,
      //   timestamp: this.theTime
      // })
      // console.log(res)
      // this.list = [...this.list, ...res.data.data.results]
      // this.theTime = res.data.data.pre_timestamp
      // this.isLoading = false
    },
    // 反馈-不感兴趣
    async disLikeFn(id) {
      // try {
      await dislikeArticleAPI({ artId: id })
      this.$toast.success({ message: '反馈成功', duration: 500 })
      // } catch (err) {
      //   this.$toast.fail({ message: '用户未认证', duration: 500 })
      // }
    },
    // 反馈-垃圾内容
    async reportFn(id, value) {
      // try {
      await reportArticleAPI({ artId: id, type: value })
      this.$toast.success({ message: '举报成功', duration: 500 })
      // } catch (err) {
      //   this.$toast.fail({ message: '用户未认证', duration: 500 })
      // }
    },
    //文章单元格-点击事件
    itemClickFn(id) {
      // console.log(id)
      this.$router.push({
        path: `/detail?art_id=${id}`
      })
    }
  }
}
</script>

<style lang="less" scoped></style>
