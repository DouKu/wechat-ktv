<template>
  <div class="p-person">
    <popup-select v-if="musics.length" :musics="musics" v-model="open" @selectMusic="handleSelectMusic"></popup-select>
    <div>
      已选择歌曲{{currentMusic.name || '未选择歌曲'}}
    </div>
    <div v-if="currentMusic._id" class="btn" @click="handleReSelectMusic">重新选择</div>
    <template v-if="firstRecord">
      <div class="btn" @click="startRecord">开始录制</div>
    </template>
    <template v-else>
      <div class="btn" @click="startRecord">重新录制</div>
    </template>
    <div class="btn" @click="uploadVoice">上传</div>
    <div class="btn" @click="addUser">邀请好友</div>
    <audio ref="preAudio" :src="currentMusic.url" preload="true" @ended="preAudioEnd"></audio>
    <audio ref="afterAudio" :src="finalUrl" @ended="afterAudioEnd" preload="true"></audio>
    <div class="btn" @click="startPreVoice">播放原音</div>
    <div class="btn" @click="startRecordVoice">播放录音</div>
    <div>{{finalUrl}}</div>
    <div>
      活动规则
    </div>
    <div>
      排行榜
    </div>
  </div>
</template>

<script>
import popupSelect from '../components/popup-select'
import axios from 'axios'
import config from '../config'
import wx from 'weixin-js-sdk'

export default {
  async created () {
    const chorusId = this.$route.query.chorusId
    if (chorusId) {
      config.chorusId = chorusId
    } else {
    }
    const res = await axios.request({
      url: `${config.baseUrl}/api/auth/audio`,
      method: 'get'
    })
    this.musics = res.data.data
  },
  components: {
    popupSelect
  },
  data () {
    return {
      firstRecord: true,
      musics: [],
      open: true,
      localId: '',
      currentMusic: {},
      finalUrl: 'http://os32fgzvj.bkt.clouddn.com/8rYXE6emqQU9mLpfr-pSA_dk1peuRrqmqleZI1WdzjOfbmklRuLYkz-zzzAcU_9F.mp3'
    }
  },
  methods: {
    addUser () {
      config.recordId = '292929'
    },
    startRecord () {
      wx.startRecord()
      setTimeout(() => {
        this.firstRecord = false
        this.stopRecord()
      }, 15000)
    },
    stopRecord () {
      console.log('stop')
      wx.stopRecord({
        success: res => {
          this.localId = res.localId
        }
      })
    },
    handleReSelectMusic () {
      this.open = true
      console.log(this.open)
    },
    handleSelectMusic (item) {
      this.currentMusic = item
    },
    async getAudios () {
    },
    startPreVoice () {
      this.$refs.preAudio.play()
    },
    startRecordVoice () {
      this.$refs.afterAudio.play()
    },
    preAudioEnd () {
      console.log('播放结束')
      this.$refs.src = this.finalUrl
      this.$refs.afterAudio.play()
    },
    afterAudioEnd () {
      console.log('播放结束')
    },
    uploadVoice () {
      wx.uploadVoice({
        localId: this.localId,
        isShowProgressTips: 0,
        success: async (res) => {
          const serverId = res.serverId // 返回音频的服务器端ID
          const _res = await axios.request({
            url: `${config.baseUrl}/api/auth/chorus`,
            method: 'post',
            data: {
              mediaId: serverId,
              audioId: this.currentMusic._id,
              openid: localStorage.getItem('openid')
            }
          })
          this.finalUrl = _res.data.data.finalUrl
        }
      })
    }
  }
}
</script>

<style>
.p-person {
  position: relative;
  width: 100%;
  height: 100%;
}
.btn {
  font-size: 15px;
  height: 50px;
  margin-bottom: 20px;
  background: greenyellow;
}
</style>
