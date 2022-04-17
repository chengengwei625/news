<template>
  <div>
    <!-- 搜索页面头部 -->
    <div class="search-header">
      <!-- 后退按钮 -->
      <van-icon name="arrow-left" color="white" size="0.48rem" class="goback" @click="$router.back()" />
      <!-- 搜索组件 -->
      <van-search @search="searchFn" v-model.trim="kw" @input="inputFn" v-fofo placeholder="请输入搜索关键词" background="#007BFF" shape="round" />
    </div>
    <!-- 搜索建议列表 -->
    <div class="sugg-list" v-if="kw.length !== 0">
      <div class="sugg-item" @click="suggestClickFn(str)" v-for="(str, index) in suggestList" :key="index" v-html="lightFn(str, kw)"></div>
    </div>
    <!-- 搜索历史 -->
    <div class="search-history" v-else>
      <!-- 标题 -->
      <van-cell title="搜索历史">
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #right-icon>
          <van-icon @click="clearFn" name="delete" class="search-icon" />
        </template>
      </van-cell>

      <!-- 历史列表 -->
      <div class="history-list">
        <span @click="historyClickFn(str)" v-for="(str, index) in history" :key="index" class="history-item">{{ str }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { suggestListAPI } from '@/api/index'
export default {
  name: 'Search',
  data() {
    return {
      kw: '', // 搜索关键字
      timer: null,
      suggestList: [], //联想建议列表
      history: JSON.parse(localStorage.getItem('his')) || [] // 搜索历史
    }
  },
  methods: {
    //输入框内容改变触发事件方法
    inputFn() {
      clearTimeout(this.timer)
      if (this.kw.length === 0) {
        this.suggestList = []
      } else {
        this.timer = setTimeout(async () => {
          const res = await suggestListAPI({
            keyworks: this.kw
          })
          console.log(res)
          this.suggestList = res.data.data.options
        }, 500)
      }
    },
    //文字高亮
    lightFn(originStr, target) {
      //如果你要使用变量，作为正则的匹配条件，不能用语法糖简化写法
      const reg = new RegExp(target, 'ig') //i忽略大小写,g全局匹配
      return originStr.replace(reg, match => {
        // match就是匹配中时,原字符串里的那个字符,用人家原来的,只不过我们给个颜色即可
        return `<span style="color:red;">${match}</span>`
      })
    },
    //输入框-搜索事件
    searchFn() {
      //防止录入空值所以得判断
      if (this.kw.length > 0) {
        this.history.push(this.kw)
        this.moveFn(this.kw)
      }
    },
    //联想列表-点击事件
    suggestClickFn(str) {
      this.history.push(str)
      this.moveFn(str)
    },
    //搜索历史-点击事件
    historyClickFn(str) {
      this.moveFn(str)
    },
    moveFn(theKw) {
      //宏任务比微任务晚执行
      setTimeout(() => {
        this.$router.push({
          path: `/search_result/${theKw}`
        })
      })
    },
    clearFn() {
      this.history = []
    }
  },
  watch: {
    history: {
      deep: true,
      handler() {
        const theSet = new Set(this.history)
        const arr = [...theSet]
        localStorage.setItem('his', JSON.stringify(arr))
      }
    }
  }
}
</script>

<style scoped lang="less">
.search-header {
  height: 46px;
  display: flex;
  align-items: center;
  background-color: #007bff;
  overflow: hidden;
  /*后退按钮*/
  .goback {
    padding-left: 14px;
  }
  /*搜索组件*/
  .van-search {
    flex: 1;
  }
}
/*搜索建议列表样式 */
.sugg-list {
  .sugg-item {
    padding: 0 15px;
    border-bottom: 1px solid #f8f8f8;
    font-size: 14px;
    line-height: 50px;
    // 实现省略号的三行代码
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
/**搜索历史 */
.search-icon {
  font-size: 16px;
  line-height: inherit;
}

.history-list {
  padding: 0 10px;
  .history-item {
    display: inline-block;
    font-size: 12px;
    padding: 8px 14px;
    background-color: #efefef;
    margin: 10px 8px 0px 8px;
    border-radius: 10px;
    // border-radius: 10px;
    // background: #e0e0e0;
    box-shadow: 20px 20px 50px #bebebe, -10px -10px 25px #ffffff;
  }
}
</style>
