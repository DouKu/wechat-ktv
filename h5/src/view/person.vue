<template>
  <div class="p-person">
    <popup-select v-model="open" @selectMusic="handleSelectMusic"></popup-select>
    <div>
      已选择歌曲{{currentMusic.title || '未选择歌曲'}}
    </div>
    <div class="btn" @click="handleReSelectMusic">重新选择</div>
  </div>
</template>

<script>
import popupSelect from '../components/popup-select'
export default {
  components: {
    popupSelect
  },
  data () {
    return {
      open: true,
      currentMusic: {}
    }
  },
  methods: {
    handleReSelectMusic () {
      this.open = true
      console.log(this.open)
    },
    handleSelectMusic (item) {
      this.currentMusic = item
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
