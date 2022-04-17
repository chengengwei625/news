<template>
  <div class="user-edit-container">
    <!-- Header 区域 -->
    <van-nav-bar title="编辑资料" left-arrow @click-left="$router.back()" fixed />

    <!-- 用户资料 -->
    <van-cell-group class="action-card">
      <van-cell title="头像" is-link center>
        <template #default>
          <van-image round class="avatar" :src="$store.state.userPhoto" @click="imageClickFn" />
          <!-- file 选择框 -->
          <input type="file" id="input" ref="iptFile" v-show="false" accept="image/*" @change="onFileChange" />
        </template>
      </van-cell>
      <van-cell title="名称" is-link :value="this.$store.state.userName" @click="nameClickFn" />
      <van-cell title="生日" is-link :value="profileObj.birthday" @click="birthdayClickfn" />
    </van-cell-group>
    <!-- 姓名修改弹窗 -->
    <van-dialog :before-close="beforeCloseFn" v-model="show" title="标题" show-cancel-button>
      <input type="text" v-fofo v-model="inputUserName" />
    </van-dialog>
    <!-- 事时间选择器 -->
    <van-popup round v-model="dateTimePickerShow" position="bottom" :style="{ height: '50%' }">
      <van-datetime-picker v-model="currentDate" type="date" title="选择年月日" :min-date="minDate" :max-date="maxDate" @cancel="dateCancelFn" @confirm="confirmFn" />
    </van-popup>
  </div>
</template>

<script>
import { userProfileAPI, updateUserPhotoAPI, updateUserProfileAPI } from '@/api'
import { formatDate } from '@/utils/date'
export default {
  name: 'UserEdit',
  data() {
    return {
      profileObj: {}, //用户基本信息
      show: false, //控制姓名修改弹窗
      inputUserName: '', //用户输入框内容
      minDate: new Date(1920, 0, 1), //最小范围
      maxDate: new Date(), //最大范围(今天)
      currentDate: new Date(2021, 0, 17), //当前时间(打开默认停留的时间)
      dateTimePickerShow: false //日期选择器-弹出层显示/隐藏
    }
  },
  async created() {
    const res = await userProfileAPI()
    // console.log(res)
    this.profileObj = res.data.data
  },
  methods: {
    //文件选择改变事件
    async onFileChange(e) {
      if (e.target.files.length === 0) return //用户取消时判断
      //创建FromData对象
      const theFd = new FormData()
      theFd.append('photo', e.target.files[0])
      const res = await updateUserPhotoAPI(theFd)
      this.profileObj.photo = res.data.data.photo
      // this.$store.commit('SET_USERPHOTO', res.data.data.photo)//更新成功后同步到vuex!!!!!!!!
    },
    imageClickFn() {
      this.$refs.iptFile.click()
    },
    nameClickFn() {
      this.show = true
      this.inputUserName = this.$store.state.userName
    },
    async beforeCloseFn(action, done) {
      if (action === 'confirm') {
        const reg = /^[a-zA-Z0-9\u4e00-\u9fa5]{1,7}$/
        if (reg.test(this.inputUserName) === true) {
          const res = await updateUserProfileAPI({
            name: this.inputUserName
          })
          console.log(res)
          // this.profileObj.name = this.inputUserName
          this.$store.commit('SET_USERNAME', this.inputUserName)
          done()
        } else {
          this.$toast.fail({ message: '用户名只能是1~7位中英数字组合', duration: 2000 })
          done(false)
        }
      } else {
        done()
      }
    },
    //生日点击事件
    birthdayClickfn() {
      this.dateTimePickerShow = true
      this.currentDate = new Date(this.profileObj.birthday) //组件显示默认生日
    },
    //日期选择器-取消事件
    dateCancelFn() {
      this.dateTimePickerShow = false
    },
    //日期选择器-确认事件
    async confirmFn() {
      await updateUserProfileAPI({
        birthday: formatDate(this.currentDate)
      })
      this.dateTimePickerShow = false
      this.profileObj.birthday = formatDate(this.currentDate)
    }
  }
}
</script>

<style lang="less" scoped>
.user-edit-container {
  padding-top: 46px;
  .avatar {
    width: 50px;
    height: 50px;
  }
}
::v-deep .van-dialog__content {
  text-align: center;
  input {
    padding: 0;
    outline: none;
    border: none;
    text-align: center;
  }
}
</style>
