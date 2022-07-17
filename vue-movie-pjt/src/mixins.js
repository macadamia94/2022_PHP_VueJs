// 전역에서 통신하기 쉽게 하려고 이 파일 만듬
import axios from 'axios';

export default {
  data() {
    return {
      key: '32310a7d53bb1238e9424d45143eae9f',
      baseUrl: 'http://www.kobis.or.kr/kobisopenapi/webservice/rest/',
      boxOfficeByDay: 'boxoffice/searchDailyBoxOfficeList.json',
      boxOfficeByWeek: 'boxoffice/searchWeeklyBoxOfficeList.json',
    };
  },
  methods: {
    async $api(url, parameter) {
      return (
        await axios
          .get(url, {
            params: parameter,
          })
          .catch(e => {
            console.log(e);
          })
      ).data;
    },
    async getBoxOfficeByDay(targetDt) {
      const parameter = {
        key: this.key,
        targetDt, // 'targetDt': targetDt 같은 의미 (key값과 value값이 같으면 생략가능)
      };
      const url = this.baseUrl + this.boxOfficeByDay;
      return await this.$api(url, parameter);
    },
    async getBoxOfficeByWeek(targetDt, weekGb) {
      const parameter = {
        key: this.key,
        targetDt,
        weekGb,
      };
      const weekUrl = this.baseUrl + this.boxOfficeByWeek;
      return await this.$api(weekUrl, parameter);
    },
    getOnlyDateStr(date) {
      return date.toISOString().split('T')[0];
    },
  },
};
