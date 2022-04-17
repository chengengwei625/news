<template>
  <div>
    <!-- 弹出层的头部区域 -->
    <van-nav-bar title="频道管理">
      <template #right>
        <van-icon name="cross" size="0.37333334rem" color="white" @click="closeFn" />
      </template>
    </van-nav-bar>
    <!-- 我的频道 -->
    <div class="my-channel-box">
      <div class="channel-title">
        <span
          >我的频道
          <span class="small-title"> 点击{{ isEdit ? '进入' : '删除' }}频道 </span>
        </span>
        <span @click="editFn">{{ isEdit ? '完成' : '编辑' }}</span>
      </div>
      <!-- 我的频道列表 -->
      <van-row type="flex">
        <van-col @click="delUserChannel(obj)" span="6" v-for="obj in userList" :key="obj.id">
          <div class="channel-item van-hairline--surround">
            {{ obj.name }}
            <!-- 删除的徽标 -->
            <van-badge v-show="isEdit && obj.id !== 0" color="transparent" class="cross-badge">
              <template #content>
                <van-icon name="cross" class="badge-icon" color="#cfcfcf" size="0.32rem" />
              </template>
            </van-badge>
          </div>
        </van-col>
      </van-row>
    </div>

    <!-- 更多频道 -->
    <div class="more-channel-box">
      <div class="channel-title">
        <span>点击添加更多频道：</span>
      </div>
      <!-- 更多频道列表 -->
      <van-row type="flex">
        <van-col span="6" v-for="obj in unCheckList" :key="obj.id" @click="moreFn(obj)">
          <div class="channel-item van-hairline--surround">{{ obj.name }}</div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    userList: Array,
    unCheckList: Array
  },
  data() {
    return {
      isEdit: false
    }
  },
  methods: {
    editFn() {
      this.isEdit = !this.isEdit
    },
    moreFn(channelObj) {
      if (this.isEdit === true) {
        // this.userList.push(channelObj)
        this.$emit('addChannelEV', channelObj)
      }
    },
    //用户删除频道事件
    delUserChannel(obj) {
      if (this.isEdit) {
        if (obj.id !== 0) {
          this.$emit('removeChannelEV', obj)
        }
      } else {
        this.$emit('closeEV')
        this.$emit('input', obj.id) //把值传给index.vue对应的v-mode变量
      }
    },
    closeFn() {
      this.$emit('closeEV')
      // this.isEdit = false
    }
  }
}
</script>

<style scoped lang="less">
.van-popup,
.popup-container {
  background-color: transparent;
  height: 100%;
  width: 100%;
}

.popup-container {
  display: flex;
  flex-direction: column;
}

.pop-header {
  height: 90px;
  background-color: #007bff;
  color: white;
  text-align: center;
  font-size: 14px;
  position: relative;
  .title {
    width: 100%;
    position: absolute;
    bottom: 15px;
  }
}

.pop-body {
  flex: 1;
  overflow: scroll;
  padding: 8px;
  background-color: white;
}

.my-channel-box,
.more-channel-box {
  .channel-title {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    line-height: 28px;
    padding: 0 6px;
  }
}

.channel-item {
  font-size: 12px;
  text-align: center;
  line-height: 36px;
  margin: 5px;
  border-radius: 10px;
  background: #e0e0e0;
  box-shadow: 20px 20px 50px #bebebe, -10px -10px 25px #ffffff;
}

/*删除的微标 */
.cross-badge {
  position: absolute;
  right: -3px;
  top: 0;
  border: none;
}
.van-icon:before {
  color: #666;
}

.van-nav-bar__content .van-icon:before {
  color: #fff;
}
/*提示文字 */
.small-title {
  font-size: 10px;
  color: gray;
}
</style>
