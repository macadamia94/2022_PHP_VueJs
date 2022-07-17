<template>
  <div>
    <div>
      <h1>이벤트 클릭</h1>
      <button @click="increaseCnt(); printConsole()">Add 1</button>
      <!-- () 있음 →　실제로 실행, 파라미터값을 보낼 수 있음 -->
      <p>The counter is : {{ cnt }}</p>
    </div>
    <div>
      {{ selectedValue }}
      <select v-model="selectedValue" @change="changeSelect">
      <!-- () 없음 →　주소값만 전달, 파라미터값 보낼 수 없음 -->
        <option>서울</option>
        <option>부산</option>
        <option>제주</option>
      </select>
    </div>
    <div>
      {{ txtVal }}
      <input type="txtVal" v-model="txtVal" @keyup="changeTxtVal" @keyup.enter="enterTxtVal">
      <!-- @change : focus를 잃을 때 반영 / @keyup : 입력할 때마다 반영 / @keyup.enter : Enter칠 때 반영 -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      txtVal: '',
      selectedValue: '',
      cnt: 0
    }
  },
  methods: {
    enterTxtVal() {
      console.log('Enter!!!');
    },
    changeTxtVal() {
      console.log(this.txtVal);
    },
    changeSelect() {
      alert(this.selectedValue);
    },
    increaseCnt() {
      this.cnt++;
    },
    printConsole() {
      console.log(this.cnt);
    }
  }
}
</script>

<style>

</style>