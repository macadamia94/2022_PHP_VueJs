<template>
  <main class="mt-3">
    <div class="container">
      <h2 class="text-center">제품 사진 등록</h2>
      <div class="mb-3 row">
        <label class="col-md-3 col-form-label">제품ID</label>
        <div class="col-md-9">{{ productDetail.id }}</div>
      </div>
      <div class="mb-3 row">
        <label class="col-md-3 col-form-label">제품명</label>
        <div class="col-md-9">
          {{ productDetail.product_name }}
        </div>
      </div>
      <div class="mb-3 row">
        <label class="col-md-3 col-form-label">섬네일이미지</label>
        <div class="col-md-9">
          <div class="row">

            <!-- 섬네일 이미지 리스트 가져오는 로직 후 구현 -->
            <div class="col-lg-3 col-md-4 col-sm-2" :key="item.id"
              v-for="item in productImage.filter( c => c.type === 1)">
              <div class="position-relative">
                <img :src="`/static/img/${item.product_id}/${item.type}/${item.path}`" class="img-fluid">
                <div class="position-absolute top-0 end-0" style="cursor: pointer"
                  @click="deleteImage(item.id, item.type, item.path)">X</div>
                <!-- deleteImage : 주소값 연결(바인딩), deleteImage(item.id) : 주소값 호출 (파라미터를 보낼 수 있음) -->
              </div>
            </div>
            <!-- <h1>{{ productDetail.id }}</h1> -->
          </div>
          <input type="file" class="form-control" accept="image/png,image/jpeg"
            @change="uploadFile($event.target.files, 1)" />
          <div class="alert alert-secondary" role="alert">
            <ul>
              <li>이미지 사이즈 : 350 * 350</li>
              <li>파일 사이즈 : 1M 이하</li>
              <li>파일 확장자 : png, jpg만 가능</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="mb-3 row">
        <label class="col-md-3 col-form-label">제품이미지</label>
        <div class="col-md-9">
          <div class="row">

            <!-- 제품 이미지 리스트 가져오는 로직 후 구현 -->
            <div class="col-lg-3 col-md-4 col-sm-2" :key="item.id"
              v-for="item in productImage.filter( c => c.type === 2)">
              <!-- filter(function(c) { return c.type === 2 }) -->
              <div class="position-relative">
                <img :src="`/static/img/${item.product_id}/${item.type}/${item.path}`" class="img-fluid">
                <div class="position-absolute top-0 end-0" style="cursor: pointer"
                  @click="deleteImage(item.id, item.type, item.path)">X</div>
              </div>
            </div>

          </div>
          <input type="file" class="form-control" accept="image/png,image/jpeg"
            @change="uploadFile($event.target.files, 2)" />
          <div class="alert alert-secondary" role="alert">
            <ul>
              <li>최대 5개 가능</li>
              <li>이미지 사이즈 : 700*700</li>
              <li>파일 사이즈 : 1M 이하</li>
              <li>파일 확장자 : png, jpg만 가능</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="mb-3 row">
        <label class="col-md-3 col-form-label">제품설명이미지</label>
        <div class="col-md-9">
          <div class="row">
            <div class="col-lg-6 col-md-8">
              <input type="file" class="form-control" accept="image/png,image/jpeg"
                @change="uploadFile($event.target.files, 3)" />
              <div class="alert alert-secondary" role="alert">
                <ul>
                  <li>파일 사이즈 : 5M 이하</li>
                  <li>파일 확장자 : png, jpg만 가능</li>
                </ul>
              </div>
            </div>

            <div class="col-lg-3 col-md-4 col-sm-2" :key="item.id"
              v-for="item in productImage.filter( c => c.type === 3)">
              <div class="position-relative">
                <img :src="`/static/img/${item.product_id}/${item.type}/${item.path}`" class="img-fluid">
                <div class="position-absolute top-0 end-0" style="cursor: pointer"
                  @click="deleteImage(item.id, item.type, item.path)">X</div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div class="mb-3 row m-auto">
        <router-link class="nav-link" to="/sales">
          <button type="button" class="btn btn-lg btn-dark">확인</button>
        </router-link>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      productName: '',
      productDetail: {},
      productImage: []
    }
  },
  updated() {
    this.getproductImage();
  },
  created() {
    this.productId = this.$route.query.product_id;
    this.productDetail = this.$store.state.sallerSelectedProduct;
    this.getproductImage();
  },
  methods: {
    // async getProductDetail() {
    //   this.productDetail = await this.$get(
    //     `/api/productDetail/${this.productId}`, {}
    //   );
    //   console.log(productDetail);
    // }
    async getproductImage() {
      this.productImage = await this.$get(`/api/productImageList/${this.productDetail.id}`);
    }, 
    async uploadFile(files, type) {
      console.log(files);
      const image = await this.$base64(files[0]); // $base64　→　mixin에 있음
      const formData = { image };
      const { error } = await this.$post(`/api/upload/${this.productDetail.id}/${type}`, formData);
      // $post(`Controller / Method / Path Variable`, formData)
      console.log(error);
    },

    async deleteImage(id, type, path) {
      this.$swal.fire({
        title: '정말 삭제 하시겠습니까?',
        showCancelButton: true,
        confirmButtonText: '삭제',
        cancelButtonText: '취소'
      }).then(async result => {
        if (result.isConfirmed) {
          await this.$delete(`/api/productImageDelete/${id}/${this.productDetail.id}/${type}/${path}`);
          this.$swal.fire('삭제되었습니다.', '', 'success');
        }
      });
      // const result = await this.$delete(`/api/productImageDelete/${id}/${this.productDetail.id}/${type}/${path}`);
      // console.log(result);
    }
  }
}
</script>

<style>

</style>