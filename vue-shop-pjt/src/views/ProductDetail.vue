<template>
  <div class="row pt-3 pb-3 border-top">
    <div class="col-6">
      <h3>총 상품 금액</h3>
    </div>
    <div class="col-6" style="text-align: right;">
      <h3>{{ getCurrencyFormat(totalPrice) }}원</h3>
    </div>
  </div>
  <div class="d-flex justify-content-between align-items-center">
    <div class="col-6 d-grid p-1">
      <button type="button" class="btn btn-lg btn-dark">장바구니 담기</button>
    </div>
    <div class="col-6 d-grid p-1">
      <button type="button" class="btn btn-lg btn-danger">주문하기</button>
    </div>
  </div>

  <div class="row">
    <div class="col-12">
      <img :src="'/download/${productId}/${productDetail.path}'" class="img-fluid" />
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>