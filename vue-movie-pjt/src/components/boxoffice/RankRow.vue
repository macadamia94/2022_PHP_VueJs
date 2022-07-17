<template>
  <tr>
    <td>{{ item.rank }}</td>
    <td>{{ item.movieNm }}</td>
    <td>{{ item.openDt }}</td>
    <td>{{ audiAcc }}</td>
    <td>{{ salesAcc }}</td>
  </tr>
</template>

<script>
export default {
  props: {
    item: Object
  },
  computed: {
    audiAcc() {
      return this.numberComma(this.item.audiAcc);
    },
    salesAcc() {
      return this.numberComma(this.item.salesAcc);
    },
  },
  methods: {
    numberComma(num) {
      return String(num).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }
}
</script>

<style>

</style>