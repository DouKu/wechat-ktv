<template>
  <div style="height: 100%;">
    微信测试 {{showText}}
    <a v-show="showToAuth" :href="authUrl" style="font-size: 20px;">跳转授权</a>
    <div class="btn" @click="startRecord">开始录音</div>
    <div class="btn" @click="stopRecord">停止录音</div>
    <div class="btn" @click="playVoice">播放录音</div>
    <div class="btn" @click="pauseVoice">暂停播放</div>
    <div class="btn" @click="stopVoice">停止播放</div>
    <div class="btn" @click="translateVoice">识别语音</div>
    <div class="btn" @click="uploadVoice">上传</div>
    <div class="btn" @click="changeRouter('/video')">开始</div>
  </div>
</template>

<script>
import axios from 'axios'
import config from '../config'
import wx from 'weixin-js-sdk'

export default {
  data () {
    return {
      showToAuth: false,
      authUrl: `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${config.appId}&redirect_uri=${encodeURIComponent(config.redirectUrl)}&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect`,
      localId: '',
      showText: ''
    }
  },
  methods: {
    changeRouter (path) {
      this.$router.push(path)
    },
    translateVoice () {
      wx.translateVoice({
        localId: this.localId, // 需要识别的音频的本地Id，由录音相关接口获得
        isShowProgressTips: 0,
        success: res => {
          this.showText = res.translateResult // 语音识别的结果
        }
      })
    },
    startRecord () {
      wx.startRecord()
      setTimeout(() => {
        this.stopRecord()
      }, 5000)
    },
    stopRecord () {
      wx.stopRecord({
        success: res => {
          this.localId = res.localId
        }
      })
    },
    playVoice () {
      wx.playVoice({
        localId: this.localId // 需要播放的音频的本地ID，由stopRecord接口获得
      })
    },
    pauseVoice () {
      wx.pauseVoice({
        localId: this.localId // 需要暂停的音频的本地ID，由stopRecord接口获得
      })
    },
    stopVoice () {
      wx.stopVoice({
        localId: this.localId // 需要停止的音频的本地ID，由stopRecord接口获得
      })
    },
    uploadVoice () {
      wx.uploadVoice({
        localId: this.localId,
        isShowProgressTips: 0,
        success: (res) => {
          const serverId = res.serverId // 返回音频的服务器端ID
          axios.request({
            url: `${config.baseUrl}/api/auth/audio`,
            method: 'post',
            data: {
              mediaId: serverId
            }
          })
        }
      })
    }
  },
  async mounted () {
    console.log(window.location.href)
    const wechatCode = this.$route.query.code
    const saveOpenId = window.localStorage.getItem('openid')
    if (!saveOpenId && !wechatCode) {
      this.showToAuth = true
    } else if (wechatCode && !saveOpenId) {
      this.showToAuth = false
      try {
        const res = await axios.request({
          method: 'post',
          url: `${config.baseUrl}/api/wechat/exchangeToken`,
          data: {
            code: wechatCode
          }
        })
        window.localStorage.setItem('openid', res.data.data.openid)
      } catch (error) {
      }
    } else {
      this.showToAuth = false
    }
  }
}
</script>

<style scoped>
.btn {
  font-size: 15px;
  height: 50px;
  margin-bottom: 20px;
  background: greenyellow;
}
</style>
