<template>
  <main class="mt-3">
    <div class="container">
      <h2 class="text-center mb-3">제품 등록</h2>
      <div class="mb-3 row">
        <label class="col-md-3 col-form-label">제품명</label>
        <div class="col-md-9">
          <input type="text" class="form-control" v-model="product.product_name" />
        </div>
      </div>
      <div class="mb-3 row">
        <label class="col-md-3 col-form-label">제품 가격</label>
        <div class="col-md-9">
          <div class="input-group mb-3">
            <input type="number" class="form-control" v-model="product.product_price" />
            <span class="input-group-text">원</span>
          </div>
        </div>
      </div>
      <div class="mb-3 row">
        <label class="col-md-3 col-form-label">배송비</label>
        <div class="col-md-9">
          <div class="input-group mb-3">
            <input type="number" class="form-control" v-model="product.delivery_price" />
            <span class="input-group-text">원</span>
          </div>
        </div>
      </div>
      <div class="mb-3 row">
        <label class="col-md-3 col-form-label">추가배송비(도서산간)</label>
        <div class="col-md-9">
          <div class="input-group mb-3">
            <input type="number" class="from-control" v-model="product.add_delivery_price" />
            <span class="input-group-text">원</span>
          </div>
        </div>
      </div>
      <div class="mb-3 row">
        <label class="col-md-3 col-form-label">제품 카테고리</label>
        <div class="col-md-9">
          <div class="row">
            <div class="col-auto">
              <select class="form-select" v-model="cate1" @change="changeCategory1">
                <option :value="cate" :key="i" v-for="(cate, i) in category1">{{ cate }}</option>
              </select>
            </div>
            <div class="col-auto">
              <select class="form-select" v-model="cate1" @change="changeCategory2">
                <option :value="cate" :key="i" v-for="(cate, i) in category2">{{ cate }}</option>
              </select>
            </div>
            <div class="col-auto">
              <select class="form-select" v-model="cate1" @change="changeCategory3">
                <option :value="cate" :key="i" v-for="(cate, i) in category3">{{ cate }}</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div class="mb-3 row">
        <label class="col-md-3 col-form-label">태그</label>
        <div class="col-md-9">
          <input type="text" class="form-control" v-model="product.tags" />
        </div>
      </div>
      <div class="mb-3 row">
        <label class="col-md-3 col-form-label">출고일</label>
        <div class="col-md-9">
          <div class="input-group mb-3">
            <input type="number" class="form-control" v-model="product.outbound_days" />
            <span class="input-group-text">일 이내 출고</span>
          </div>
        </div>
      </div>
      <div class="mb-3 row">
        <div class="col-6 d-grid p1">
          <button type="button" class="btn btn-lg btn-dark" @click="goToList">취소하기</button>
        </div>
        <div class="col-6 d-grid p1">
          <button type="button" class="btn btn-lg btn-danger" @click="productInsert">저장하기</button>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'ProductCreate',
  components: {},
  data() {
    return {
      product: {
        product_name: '',
        product_price: 0,
        delivery_price: 0,
        add_delivery_price: 0,
        tags: '',
        outbound_days: 0,
        seller_id: 1,
        category_id: 1,
      },
      categoryList: [],
      category1: [],
      category2: [],
      category3: [],

      cate1: '',
      cate2: '',
      cate3: '',
    };
  },
  computed: {
    user() {
      return this.$store.state.user; // user 정보가 바뀔 때마다 자동으로 user() 갱신
    },
  },
  created() {
    this.getCategoryList(); // created 단계에서 getCategoryList를 실행시켜 data 미리 호출
  },
  mounted() {
    if (this.user.email == undefined) {
      // user email이 없으면 초기화면으로 돌아가게 함
      alert('로그인을 해야 이용할 수 있습니다.');
      this.$router.push({ path: '/' });
    }
  },
  methods: {
    goToList() {
      this.$router.push({ path: '/sales' }); // 해당 메소드 실행 시, /sales로 라우팅
    },
    async getCategoryList() {
      let categoryList = await this.$api('/api/categoryList', {}); // sql categoryList를 통해 data 호출
      this.categoryList = categoryList;

      let oCategory = {}; // oCategory를 오브젝트로 선언
      categoryList.forEach((item) => {
        oCategory[item.category] = item.id; // oCategory에 categoryList data를 forEach를 통해 넣어주고, item.id로 선언
      });

      let category1 = []; // category를 배열로 선언
      for (let key in oCategory) {
        category1.push(key); // category에 oCategory의 key값을 넣어줌
      }
      this.category1 = category1;

      let category2 = []; // category를 배열로 선언
      category2 = categoryList.filter((c) => {
        return c.category1 == category1[0];
      });

      let oCategory2 = {}; // oCategory를 오브젝트로 선언
      category2.forEach((item) => {
        oCategory2[item.category2] = item.id; // oCategory에 categoryList data를 forEach를 통해 넣어주고, item.id로 선언
      });

      category2 = []; // category를 배열로 선언
      for (let key in oCategory2) {
        category2.push(key);
      }

      this.category2 = category2;
    },
    ChageCategory2() {
      let categoryList = this.categoryList.filter((c) => {
        return c.category1 == this.cate1 && c.category2 == this.cate2;
      });

      let oCategory3 = {};
      categoryList.forEach((item) => {
        oCategory3[item.category3] = item.id;
      });

      let category3 = [];
      for (let dey in oCategory3) {
        category3.push(key);
      }
      this.category3 = category3;
    },
    productInsert() {
      if (this.product.product_name == '') {
        // 제품명에 값이 없을 시 해당 alert 출력
        return this.$swal('제품명은 필수 입력값입니다.');
      }

      if (this.product.product_price == '' || this.product.product_price == 0) {
        // 제품가격에 값이 없거나 0일 시 해당 alert 출력
        return this.$swal('제품가격을 입력하세요.');
      }

      if (this.product.delivery_price == '' || this.product.delivery_price == 0) {
        return this.$swal('배송료를 입력하세요.');
      }

      if (this.product.product_description == '') {
        // 제품설명에 값이 없을 시 해당 alert 출력
        return this.$swal('제품설명은 필수 입력값입니다.');
      }

      if (this.product.outbound_days == '' || this.product.outbound_days == 0) {
        return this.$swal('출고일을 입력하세요.');
      }

      this.product.category_id = this.categoryList.filter((c) => {
        // product의 category_id는 category와 cate가 같은 값을 가지는 categoryList의 data의 0번째 id 선언
        return c.category == this.cate1 && c.category2 == this.cate2 && c.category3 == this.cate3;
      })[0].id;

      console.log(this.product.category_id);

      this.$swal
        .fire({
          // 위의 조건들이 충족 시 sweetAlert2 실행
          title: '정말 등록하시겠습니까?',
          showCancelButton: true,
          confirmButtonText: '생성',
          cancelButtonText: '취소',
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            await this.$api('/api/productInsert', { param: [this.product] }); // product data를 파라미터로 보내고, sql productInsert를 통해 data Insert
            this.$swal.fire('저장되었습니다!', '', 'success');
            this.$router.push({ path: '/sales' }); // /sales로 라우팅
          }
        });
    },
  },
};
</script>