<template>
  <img class="imgsize" v-bind:src="imgSrc">
</template>

<script>
export default {
  data() {
    return {
      imgSrc: 'http://ticketimage.interpark.com/PlayDictionary/DATA/PlayDic/PlayDicUpload/040009/17/09/0400091709_70038_M.gif'
    }
  }
}
</script>

<style scoped>
.imgsize {
  width: 300px;
}
</style>
