<template>
  <div class="w-popup-select" v-show="show">
    <div class="w-popup-container">
      <h1>请选择歌曲</h1>
      <div v-for="(item, index) in musics" :key="index" class="w-select-item" @click="handleChoose(item)">{{item.name}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default () {
        return false
      }
    },
    musics: Array
  },
  watch: {
    value (val) {
      console.log(val, 'val')
      this.show = val
    }
  },
  created () {
    // TODO 获取歌曲资源
  },
  methods: {
    handleChoose (item) {
      this.show = false
      this.$emit('input', this.show)
      this.$emit('selectMusic', item)
    }
  },
  data () {
    return {
      show: this.value
    }
  }
}
</script>

<style scoped>
h1 {
  width: 100%;
  margin: 0;
  font-size: 40px;
}
.w-popup-select {
  z-index: 10;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, .6);
  width: 100%;
  height: 100%;
}
.w-popup-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: 40px;
  width: 600px;
  height: 500px;
  background: white;
  border-radius: 10px;
}
.w-select-item {
  width: 40%;
  height: 70px;
  margin: 10px 10px;
  line-height: 70px;
  font-size: 30px;
  background: orange;
}
</style>