//封装中间件函数插件
import Vue from 'vue'
const directiveObj = {
  install() {
    Vue.directive('fofo', {
      //指令所在van-search组件
      //组件根标签是div,input在内部
      //以上都是原生标签对象

      //指令所在标签，被插入到真实DOM时才触发，如果标签用display：none隐藏再出现，不会在触发inserted的
      inserted(el) {
        //搜索页面el是div
        //文章评论el是textarea
        //以后e1还可能是input呢
        //知识点：原生DOM.nodeName拿到标签名字（注意：大写的字符串）
        if (el.nodeName === 'TEXTAREA' || el.nodeName === 'INPUT') {
          el.focus()
        } else {
          //el本身不是输入框，尝试往里获取一下
          const theInput = el.querySelector('input')
          const theTextArea = el.querySelector('textarea')
          if (theInput) theInput.focus()
          if (theTextArea) theTextArea.focus()
        }
      },
      //指令所在标签,被更新时触发
      update(el) {
        if (el.nodeName === 'TEXTAREA' || el.nodeName === 'INPUT') {
          el.focus()
        } else {
          //el本身不是输入框，尝试往里获取一下
          const theInput = el.querySelector('input')
          const theTextArea = el.querySelector('textarea')
          if (theInput) theInput.focus()
          if (theTextArea) theTextArea.focus()
        }
      }
    })
  }
}
export default directiveObj
