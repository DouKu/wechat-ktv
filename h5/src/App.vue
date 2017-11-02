<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import wx from 'weixin-js-sdk'
import config from './config'
import axios from 'axios'
export default {
  name: 'app',
  async mounted () {
    const res = await axios.request({
      url: `${config.baseUrl}/api/wechat/getJSConfig`,
      method: 'get',
      params: {
        url: window.location.href
      }
    })
    wx.config(res.data.data)
    wx.ready(function () {
      console.log('config success')// config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
    })
    wx.error(function (res) {
      // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
      console.log('wx jsapi err:', res)
    })
    wx.onMenuShareTimeline({
      title: '美莱周年庆', // 分享标题
      link: `${config.redirectUrl}?type=share`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: 'http://os32fgzvj.bkt.clouddn.com/012489fbdca023b5de1f5ddb41e15f61-head-picture.jpg', // 分享图标
      success: () => {
        console.log(config.recordId, '分享ID')
        console.log('分享成功')
        // 用户确认分享后执行的回调函数
      },
      cancel: () => {
        console.log('分享失败')
        // 用户取消分享后执行的回调函数
      }
    })
    wx.onMenuShareAppMessage({
      title: '美莱周年庆', // 分享标题
      desc: '唱歌', // 分享描述
      link: `${config.redirectUrl}?type=share`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: 'http://os32fgzvj.bkt.clouddn.com/012489fbdca023b5de1f5ddb41e15f61-head-picture.jpg', // 分享图标
      // type: '', // 分享类型,music、video或link，不填默认为link
      // dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
      success: () => {
        console.log('分享成功')
        // 用户确认分享后执行的回调函数
      },
      cancel: () => {
        console.log('分享失败')
        // 用户取消分享后执行的回调函数
      }
    })
  }
}
</script>

<style>
#app {
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
