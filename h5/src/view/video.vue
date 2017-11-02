<template>
  <div class="p-video">
    <video ref="video" style="object-fit:fill; width: 100%; height: 100%;" src="http://os32fgzvj.bkt.clouddn.com/test.mp4" preload="auto" webkit-playsinline="true" playsinline="true" x-webkit-airplay="allow" x5-video-player-type="h5" x5-video-player-fullscreen="true" x5-video-orientation="portraint"></video>
    <div class="btn" @click="playVideo">播放视频</div>
    <div class="btn" @click="pauseVideo">暂停视频</div>
    <div class="btn" @click="stopVideo">停止视频</div>
  </div>
</template>

<script>
export default {
  mounted () {
    setTimeout(() => {
      this.$router.push('/rule')
    }, 2000)
  },
  methods: {
    playVideo () {
      this.$refs.video.play()
    },
    pauseVideo () {
      this.$refs.video.pause()
    },
    stopVideo () {
      this.$refs.video.currentTime = 0
      this.$refs.video.pause()
    }
  }
}
</script>

<style>
.p-video {
  width: 100%;
}

.btn {
  font-size: 15px;
  height: 50px;
  margin-bottom: 20px;
  background: greenyellow;
}
</style>

