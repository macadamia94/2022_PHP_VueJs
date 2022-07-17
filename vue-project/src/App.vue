<template>
  <div id="app">
    <TodoHeader></TodoHeader>
    <TodoInput @childAddTodo="addTodo" @noInputValue="showModal"></TodoInput>
    <TodoList :propsItems="todoItems" @childRemoveTodo="removeTodo"></TodoList>
    <TodoFooter @clearTodo="clearTodo"></TodoFooter>
  </div>
  <AlertModal :show="modalShow" header="알림창" body="내용을 입력해 주세요." @close="hiddenModal"></AlertModal>
</template>

<script>
import TodoHeader from './components/todo/TodoHeader.vue';
import TodoInput from './components/todo/TodoInput.vue';
import TodoList from './components/todo/TodoList.vue';
import TodoFooter from './components/todo/TodoFooter.vue';
import AlertModal from './components/common/AlertModal.vue';
//import TodoDao from './dao/TodoDao';
import axios from 'axios';
import DateUtils from './utils/DateUtils';

export default {
  name: 'App',
  data() {
    return {
      todoItems: [],
      modalShow: false,
    }
  },
  methods: {
    showModal() {
      this.modalShow = true;
    },
    hiddenModal() {
      this.modalShow = false;
    },
    addTodo(todoItem) {
      const param = {
        'todo': todoItem
      };
      axios.post('/todo/index', param)
        .then(res => {
          console.log(res);
          if (res.status === 200 && res.data) {
            const item = {
              'itodo': res.data.result,
              'todo': todoItem,
              'created_at': DateUtils.getTimestamp(new Date())
            }
            this.todoItems.push(item);
          }
        });
    },
    removeTodo(key) {
      this.todoItems.forEach((item, idx) => {
        if (item.itodo === key) {
          this.todoItems.splice(idx, 1);
          axios.delete(`/todo/index/${item.itodo}`)
            .then(res => {
              console.log(res);
            });
        }
      });
    },
    clearTodo() {
      axios.delete(`/todo/index`)
        .then(res => {
          if (res.status === 200 && res.data.result) {
            this.todoItems.splice(0);
          }
        });
    }
  },
  components: {
    TodoHeader,
    TodoInput,
    TodoList,
    TodoFooter,
    AlertModal
  },
  created() {
    axios.get('/todo/index')
      .then(res => {
        if (res.status === 200 && res.data.length > 0) {
          res.data.forEach(item => {
            this.todoItems.push(item);
          });
        }
        console.log(res);
      });
  }
}
</script>

<style>
body {
  text-align: center;
  background-color: #F6F6F8;
}

input {
  border-style: groove;
  width: 200px;
}

button {
  border-style: groove;
}

.ctnt {
  font-size: 1rem;
}

.d-flex {
  display: flex;
}

.flex-col {
  flex-direction: column;
}

.flex-row {
  flex-direction: row;
}

.grow_1 {
  flex-grow: 1;
}

.shadow {
  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03);
}

.justify_content_evenly {
  justify-content: space-evenly;
}
</style>
