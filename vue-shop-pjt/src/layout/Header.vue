<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a href="#" class="navbar-brand"> soldout </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link active" to="/">제품리스트</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/detail">제품상세페이지</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/sales">제품등록페이지</router-link>
          </li>
          <li v-if="user.email===undefined">
            <button class="btn btn-danger" type="button" @click="kakaoLogin">로그인</button>
          </li>
          <li v-else>
            <button class="btn btn-danger" type="button" @click="kakaoLogout">로그아웃</button>
          </li>
        </ul>
        <form class="d-flex">
          <input type="search" placeholder="Search" aria-label="Search" class="form-control me-2" />
          <button class="btn btn-outline-success text-white" type="submit" style="border-color:white;">Search</button>
        </form>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    kakaoLogin() {
      window.Kakao.Auth.login({
        scope: 'profile_nickname, profile_image, account_email',
        success: this.getKakaoAccount,
        fail: e => {
          console.error(e);
        }
      });
    },
    getProfile(autoObj) {
      console.log(authObj);
      window.Kakao.API.request({
        url: '/v2/user/me',
        success: async res => {
          const acc = res.kakao_account;
          const params = {
            social_type: 1,
            email: acc.email,
            nickname: acc.profile.nickname,
            profile_img: acc.profile.profile_image_url,
            thumb_img: acc.profile.thumbnail_image_url
          }
          console.log(params);
          const data = await this.$api('/user/signup', params);
          console.log(data.result);
          this.$store.commit('setIuser', data.result);

          alert('로그인 성공!')
        },
        fail: e => {
          console.error(e);
        }
      });
    },
    kakaoLogout() {}
  }
}
</script>

<style>

</style>