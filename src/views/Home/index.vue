<template>
  <div>
    <div>
      <van-nav-bar fixed>
        <template #left>
          <img class="logo" src="@/assets/logo.png" alt="" />
        </template>
        <template #right>
          <van-icon @click="moveSearchPageFn" name="search" size="0.48rem" color="#fff" />
        </template>
      </van-nav-bar>
    </div>
    <!-- tab栏切换 -->
    <div class="main">
      <van-tabs v-model="channelId" @change="channelChangeFn" animated sticky swipeable offset-top="1.226667rem">
        <van-tab :title="obj.name" v-for="obj in userChannelList" :key="obj.id" :name="obj.id"><ArticleList :channelId="channelId"></ArticleList></van-tab>
      </van-tabs>
      <!-- 编辑频道+号图标 -->
      <van-icon name="plus" size="0.37333334rem" class="moreChannels" @click="show = true" />
    </div>
    <!-- 频道管理弹出层 -->
    <van-popup class="channel_popup" v-model="show" get-container="body"><ChannelEdit v-model="channelId" ref="editRef" @closeEV="closeFn" @removeChannelEV="removeChannelFn" @addChannelEV="addChannelFn" :userList="userChannelList" :unCheckList="unCheckChannelList"></ChannelEdit></van-popup>
  </div>
</template>

<script>
import { getUserChannelsAPI, getALLChannelsAPI, updateChannelsAPI, removeTheChannelAPI } from '@/api/index.js'
import ArticleList from './components/ArticleList.vue'
import ChannelEdit from './ChannelEdit.vue'
export default {
  name: 'Home',
  data() {
    return {
      channelId: 0, //tab导航-激活频道ID
      userChannelList: [], //用户选择频道列表
      allChannelList: [], //所有频道列表
      show: false, //频道弹出层
      channelScrollTObj: {} //保存每个频道的滚动位置
    }
  },
  async created() {
    const res = await getUserChannelsAPI()
    // console.log(res)
    this.userChannelList = res.data.data.channels
    // this.channelChangeFn()
    const res2 = await getALLChannelsAPI()
    console.log(res2)
    this.allChannelList = res2.data.data.channels
  },
  computed: {
    unCheckChannelList() {
      // const newArr = this.allChannelList.filter(bigObj => {
      //   const index = this.userChannelList.findIndex(smallObj => {
      //     return smallObj.id === bigObj.id
      //   })
      //   if (index > -1) {
      //     return false
      //   } else {
      //     return true
      //   }
      // })
      // return newArr
      return this.allChannelList.filter(bigObj => this.userChannelList.findIndex(smallObj => smallObj.id === bigObj.id) === -1)
    }
  },
  methods: {
    //tabs切换事件,并获取文章列表数据
    channelChangeFn() {
      //   const res2 = await getALLArticleListAPI({
      //     channel_id: this.channelId,
      //     timestamp: +new Date()
      //   })
      //   console.log(res2)
      //   this.articleList = res2.data.data.results
      this.$nextTick(() => {
        document.documentElement.scrollTop = this.channelScrollTObj[this.channelId]
      })
    },
    //添加频道
    async addChannelFn(channelObj) {
      console.log(channelObj)
      this.userChannelList.push(channelObj)
      // this.userChannelList.forEach((obj, index) => {
      //   delete obj.name
      //   obj.seq = index
      // })

      //数组拷贝并删除name(不能直接操作原数组)
      // const newArr = this.userChannelList.filter(obj => obj.id !== 0)
      // const theNewArr = newArr.map((obj, index) => {
      //   const newObj = { ...obj }//浅拷贝
      //   delete newObj.name
      //   newObj.seq = index
      // })
      const res = await updateChannelsAPI({
        channels: this.userChannelList
      })
      console.log(res)
    },
    //删除频道
    async removeChannelFn(channelObj) {
      const index = this.userChannelList.findIndex(obj => obj.id === channelObj.id)
      this.userChannelList.splice(index, 1)
      //第一种方式:把现在用户数组的数据,再覆盖式的发给后台
      //需要把上面的更新数组过程,封装一个函数,add和remove里调用(笔记里)
      //第二种方式:只调用删除的接口
      const res = await removeTheChannelAPI({
        channelId: channelObj.id
      })
      console.log(res)
    },
    //关闭弹出层
    closeFn() {
      this.show = false
      this.$refs.editRef.isEdit = false
    },
    // 首页-放大镜点击跳转搜索页
    moveSearchPageFn() {
      this.$router.push('/search')
    },
    //监听网页滚动事件
    scrollFn() {
      //document.documentElement==>html,html的scrollTop才获取得到
      this.$route.meta.scrollT = document.documentElement.scrollTop
      this.channelScrollTObj[this.channelId] = document.documentElement.scrollTop
    }
  },
  components: {
    ArticleList,
    ChannelEdit
  },
  activated() {
    window.addEventListener('scroll', this.scrollFn)
    //window和document,监听网页滚动的事件
    //html标签获取scrollTop,滚动的距离,和设置滚动的位置
    //立刻设置,滚动条位置
    document.documentElement.scrollTop = this.$route.meta.scrollT
  },
  //前提：组件缓存，切走了就是失去激活生命周期方法触发
  //无组件缓存，被切走了，destroyed销毁生命周期方法
  deactivated() {
    window.removeEventListener('scroll', this.scrollFn)
  }
}
</script>

<style lang="less" scoped>
.logo {
  width: 100px;
  height: 40px;
}
.main {
  padding-top: 46px;
  padding-bottom: 50px;
}
// 设置 tabs 容器的样式
/deep/ .van-tabs__wrap {
  padding-right: 30px;
  background-color: #fff;
}

// 设置小图标的样式
.moreChannels {
  position: fixed;
  top: 62px;
  right: 8px;
  z-index: 999;
}
.channel_popup {
  width: 100vw;
  height: 100vh;
}
</style>
