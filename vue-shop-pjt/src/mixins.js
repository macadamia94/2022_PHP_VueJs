import axios from 'axios';

export default {
  methods: {
    async $post(url, param) {
      // param → data
      return (
        await axios({
          method: 'post',
          url,
          data: param, // data: param → data
        }).catch(e => {
          console.error(e);
        })
      ).data;
    },
    async $get(url, param) {
      // url: 문자열, param: 객체
      return (
        await axios
          .get(url, {
            params: param,
          })
          .catch(e => {
            console.error(e);
          })
      ).data;
    },
    $base64(file) {
      return new Promise(resolve => {
        const fr = new FileReader(); // FileReader 객체화
        fr.onload = e => {
          // onload : 로딩이 끝나면 {} 실행
          resolve(e.target.result); // 로딩이 끝난 문자열 (이미지를 문자열로 쪼갬)
        };
        fr.readAsDataURL(file); //  파일을 읽어들임
      });
    },
  },
};
