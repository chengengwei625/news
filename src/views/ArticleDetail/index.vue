<template>
  <div>
    <!-- Header 区域 -->
    <van-nav-bar fixed title="文章详情" left-arrow @click-left="$router.back()" />
    <van-loading color="#1989fa" v-if="Object.keys(artObj).length === 0">加载中...</van-loading>
    <div v-else>
      <!-- 文章信息区域 -->
      <div class="article-container">
        <!-- 文章标题 -->
        <h1 class="art-title">{{ artObj.title }}</h1>

        <!-- 用户信息 -->
        <van-cell center :title="artObj.aut_name" :label="formatDate(artObj.pubdate)">
          <template #icon>
            <img :src="artObj.aut_photo" alt="" class="avatar" />
          </template>
          <template #default>
            <div>
              <van-button @click="followedFn(true)" v-if="artObj.is_followed" type="info" size="mini">已关注</van-button>
              <van-button @click="followedFn(false)" v-else icon="plus" type="info" size="mini" plain>关注</van-button>
            </div>
          </template>
        </van-cell>

        <!-- 分割线 -->
        <van-divider></van-divider>

        <!-- 文章内容 -->
        <div class="art-content" v-html="artObj.content"></div>

        <!-- 分割线 -->
        <van-divider>End</van-divider>

        <!-- 点赞 -->
        <div class="like-box">
          <van-button @click="loveFn(true)" v-if="artObj.attitude === 1" icon="good-job" type="danger" size="small">已点赞</van-button>
          <van-button @click="loveFn(false)" v-else icon="good-job-o" type="danger" plain size="small">点赞</van-button>
        </div>
      </div>
      <!-- 文章评论组件 -->
      <CommentList></CommentList>
    </div>
  </div>
</template>

<script>
import { detailAPI, userFollowedAPI, userUnFollowedAPI, likeArticleAPI, unLikeArticleAPI } from '@/api'
import { timeAgo } from '@/utils/date.js'
import CommentList from './CommentList.vue'

export default {
  name: 'Detail',
  data() {
    return {
      artObj: {}
    }
  },
  async created() {
    const res = await detailAPI({
      artId: this.$route.query.art_id
    })
    console.log(res)
    this.artObj = res.data.data
  },
  methods: {
    formatDate: timeAgo,
    async followedFn(bool) {
      if (bool) {
        //用户点击"已关注"
        //调用取关接口
        this.artObj.is_followed = false
        const res = await userUnFollowedAPI({
          userId: this.artObj.aut_id
        })
        console.log(res)
      } else {
        //用户点击"关注"
        //调用取关接口
        this.artObj.is_followed = true
        const res = await userFollowedAPI({
          userId: this.artObj.aut_id
        })
        console.log(res)
      }
    },
    async loveFn(bool) {
      if (bool) {
        //用户点击"已点赞"
        //调用取关接口
        this.artObj.attitude = 0
        await unLikeArticleAPI({
          artId: this.artObj.art_id
        })
      } else {
        //用户点击"点赞"
        //调用取关接口
        this.artObj.attitude = 1
        await likeArticleAPI({
          artId: this.artObj.art_id
        })
      }
    }
  },
  components: {
    CommentList
  }
}
</script>

<style scoped lang="less">
.article-container {
  padding: 10px;
  margin-top: 46px;
}
.art-title {
  font-size: 16px;
  font-weight: bold;
  margin: 10px 0;
}

.art-content {
  font-size: 12px;
  line-height: 24px;
  width: 100%;
  overflow-x: scroll;
  word-break: break-all;
  /deep/ img {
    width: 100%;
  }
  /deep/ pre {
    white-space: pre-wrap;
    word-wrap: break-word;
  }
}

.van-cell {
  padding: 5px 0;
  &::after {
    display: none;
  }
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #f8f8f8;
  margin-right: 5px;
  border: none;
}

.like-box {
  display: flex;
  justify-content: center;
}
.van-loading {
  text-align: center;
  padding-top: 50px;
}
</style>
