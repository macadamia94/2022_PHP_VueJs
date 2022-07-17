<template>
  <div class="container">
    <h1>{{ title }}</h1>
    <div class="dateSearch">
      <input type="date" v-model="selectedDate">
      <button @click="search">검색</button>
    </div>
    <rank-table :list="list" />
  </div>
</template>

<script>
import RankTable from '../components/boxoffice/RankTable';

export default {
  components: {
    RankTable,
  },
  data() {
    return {
      title: '',
      selectedDate: '',
      list: [],
      pathName: '',
    }
  },
  methods: {
    search() {
      const targetDt = this.selectedDate.replaceAll('-', '');
      this.getData(targetDt);
    },
    async getData(targetDt) {
      switch (this.pathName) {
        case 'boxOfficeByDay':
          this.list = (await this.getBoxOfficeByDay(targetDt))
            .boxOfficeResult.dailyBoxOfficeList;
          break;
        case 'boxOfficeByWeek':
          this.list = (await this.getBoxOfficeByWeek(targetDt))
            .boxOfficeResult.weeklyBoxOfficeList;
          break;
      }
    },
    numberComma(num) {
      return String(num).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  },
  created() { // 최소에 딱 한 번만 실행됨
    const d = new Date(); // 현재 날짜
    d.setDate(d.getDate() - 1);
    this.selectedDate = this.getOnlyDateStr(d);
  },
  updated() {
    this.pathName = this.$route.name;
    switch (this.pathName) {
      case 'boxOfficeByDay':
        this.title = '일별 박스오피스';
        break;
      case 'boxOfficeByWeek':
        this.title = '주간 박스오피스';
        break;
    }
  }
}
</script>

<style scoped>
.container {
  display: grid;
  justify-content: center;
}

.dateSearch {
  padding-bottom: 20px;
}
</style>