<template>
  <div>
    <h1>Rendering</h1>
    <input type="text" v-model="type"><br>
    <!-- 해당 태그 삭제 -->
    <h1 v-if="type ==='A'">A</h1>
    <h1 v-else-if="type ==='B'">B</h1>
    <h1 v-else>C</h1>
    <hr>
    <!-- 해당 태그 display: none -->
    <h1 v-show="type ==='A'">A</h1>
    <h1 v-show="type ==='B'">B</h1>
    <h1 v-show="type !== 'A' && type !== 'B'">C</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      type: 'A'
    }
  }
}
</script>

<style>

</style>