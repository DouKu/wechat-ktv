<template>
  <div class="p-detail">
    <div>规则</div>
    <div @click="changeRouter('/rule')">返回</div>
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

<style>
</style>
