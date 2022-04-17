<template>
  <diV
    ><!-- 一条文章单元格 -->
    <van-cell>
      <!-- 标题区域的插槽 -->
      <template #title>
        <div class="title-box">
          <!-- 标题 -->
          <span>{{ artObj.title }}</span>
          <!-- 单图 -->
          <img v-if="artObj.cover.type === 1" class="thumb" v-lazy="artObj.cover.images[0]" />
          <!-- <van-image lazy-load v-if="artObj.cover.type === 1" class="thumb" :src="artObj.cover.images[0]">
            <template v-slot:error>图片走丢了</template>
          </van-image> -->
        </div>
        <!-- 三张图片 -->
        <div class="thumb-box" v-if="artObj.cover.type > 1">
          <img class="thumb" v-for="(imgUrl, index) in artObj.cover.images" :key="index" v-lazy="imgUrl" />
          <!-- <van-image lazy-load class="thumb" v-for="(imgUrl, index) in artObj.cover.images" :key="index" :src="imgUrl">
            <template v-slot:error>图片走丢了</template>
          </van-image> -->
        </div>
      </template>
      <!-- label 区域的插槽 -->
      <template #label>
        <div class="label-box">
          <div>
            <span>{{ artObj.aut_name }}</span>
            <span>{{ artObj.comm_count }} 评论</span>
            <span>{{ formatTime(artObj.pubdate) }}</span>
          </div>
          <!-- 反馈按钮 -->
          <van-icon v-show="isShow" name="cross" @click.stop="show = true" />
        </div>
      </template>
    </van-cell>
    <!-- 关闭按钮弹出层 -->
    <van-action-sheet @close="closeFn" @cancel="cancelFn" :cancel-text="bottomText" get-container="body" v-model="show" :actions="actions" @select="onSelect"
  /></diV>
</template>

<script>
import { timeAgo } from '@/utils/date.js'
import { firstActions, secondActions } from '@/api/report'
export default {
  props: {
    artObj: Object,
    isShow: {
      type: Boolean,
      default: true
    }
    // obj: {
    //   // 文章信息对象
    //   type: Object,
    //   default() {
    //     return {}
    //   }
    // }
  },
  data() {
    return {
      show: false,
      actions: firstActions,
      bottomText: '取消'
    }
  },
  methods: {
    formatTime: timeAgo,
    //反馈面板-反馈面板-"选项事件"
    onSelect(action, item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      // this.show = false
      if (action.name === '反馈垃圾内容') {
        this.actions = secondActions
        this.bottomText = '返回'
      } else if (action.name === '不感兴趣') {
        this.$emit('disLikeEV', this.artObj.art_id)
        this.show = false
      } else {
        // 这里就是二级反馈
        this.$emit('reportEV', this.artObj.art_id, action.value) // 外面需要反馈类型的值
        // this.actions = firstActions
        // this.show = false
        this.show = false // 会调用closeFn
      }
    },
    //反馈面板-底部按钮-点击事件
    cancelFn() {
      if (this.bottomText === '返回') {
        this.show = true
        this.actions = firstActions
        this.bottomText = '取消'
      }
    },
    //反馈面板-关闭面板-触发事件
    closeFn() {
      this.actions = firstActions
      this.bottomText = '取消'
    },
    //文章单元格点击事件
    cellClickFn() {}
  }
}
</script>
<style scoped lang="less">
/* 图片的样式, 矩形黄金比例：0.618 */
.title-box {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.label-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.label-box span {
  margin: 0 3px;
  &:first-child {
    margin-left: 0;
  }
}
//黄金比例
.thumb {
  min-width: 90px;
  width: 113px;
  height: 70px;
  background-color: #f8f8f8;
  object-fit: cover;
}

/* 三图, 图片容器 */
.thumb-box {
  display: flex;
  justify-content: space-between;
}
</style>
