<template>
  <tr>
    <td>{{ item.product_name }}</td>
    <td>{{ getPrice }}</td>
    <td>{{ item.category }}</td>
    <td>{{ getDeliveryPrice }}</td>
  </tr>
</template>

<script>
export default {
  props: {  //속성
    item: Object
  },
  computed: {
    getPrice() {
      return this.numberComma(this.item.price);
    },
    getDeliveryPrice() {
      return this.numberComma(this.item.delivery_price);
    }
  },
  methods: {
    numberComma(num) {
      return String(num).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  },
}
</script>

<style scoped>

</style>