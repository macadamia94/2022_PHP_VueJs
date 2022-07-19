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
        const fr = new FileReader();
        fr.onload = e => {
          resolve(e.target.result);
        };
        fr.readAsDataURL(file);
      });
    },
  },
};
