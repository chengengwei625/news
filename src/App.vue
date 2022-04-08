<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { getALLChannelsAPI } from '@/api'

export default {
  async created() {
    try {
      const res = await getALLChannelsAPI()
      console.log(res)
    } catch (err) {
      console.log(err)
    }
  }
}
</script>

<style lang="less"></style>
