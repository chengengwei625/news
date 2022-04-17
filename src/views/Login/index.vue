<template>
  <div>
    <van-nav-bar title="新闻头条-登录" />
    <div>
      <van-form @submit="onSubmit">
        <van-field v-model="user.mobile" required name="mobile" label="手机号" placeholder="请输入11位手机号" :rules="[{ required: true, message: '请填写手机号', pattern: /^1[3-9]\d{9}$/ }]" />
        <van-field v-model="user.code" type="password" name="code" label="密码" placeholder="请输入6位密码" :rules="[{ required: true, message: '请填写密码', pattern: /^\d{6}$/ }]" />
        <div style="margin: 16px">
          <van-button round block type="info" native-type="submit">登录</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { loginAPI } from '@/api'
import { setToken } from '@/utils/token'
export default {
  name: 'LoginIndex',
  data() {
    return {
      user: {
        mobile: '13076586371',
        code: '246810'
      }
    }
  },
  created: {},
  computed: {},
  methods: {
    // this.$toast.setDefaultOptions({ duration: 2000 })
    async onSubmit() {
      this.$toast.loading({
        message: '登录中',
        forbidClick: true,
        duration: 2000
      })
      try {
        const res = await loginAPI(this.user)
        console.log(res)
        this.$toast.success({ message: '登录成功', duration: 500 })
        setToken(res.data.data.token)
        localStorage.setItem('refresh_token', res.data.data.refresh_token)
        this.$router.replace({
          path: this.$route.query.path || 'layout/home'
        })
      } catch (err) {
        this.$toast.fail({ message: '登录失败', duration: 500 })
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
