<template>
  <div class="p-rule">
    <img src="http://os32fgzvj.bkt.clouddn.com/012489fbdca023b5de1f5ddb41e15f61-head-picture.jpg"></img>
    <div class="w-select-event">
      <div class="btn" @click="changeRouter('/detail')">规则</div>
      <div class="btn" @click="changeRouter('/person')">开始</div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    changeRouter (path) {
      this.$router.push(path)
    }
  }
}
</script>

<style scoped>
.p-rule {
  display: flex;
  flex-direction: column;  
  align-items: center;
}
.w-select-event {
  display: flex;
}
.btn {
  box-sizing: border-box;
  width: 100px;
  height: 60px;
  margin: 20px;
  background: orange;
  font-size: 30px;
  line-height: 60px;
}
</style>

