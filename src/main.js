import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js'; // Đảm bảo đường dẫn đúng
import store from './store/index.js';

const app = createApp(App);
app.use(router);
app.use(store)

app.mount('#app');
