import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import mixins from './mixins';

createApp(App).mixin(mixins).use(router).use(store).mount('#app');

window.Kakao.init('27e59c58018f729bd92b7f089b97a022');
