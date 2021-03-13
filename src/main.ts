import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { installVueGamepad } from './api/gamepad/install';

import './index.css';

const app = createApp(App);

installVueGamepad(app);

app.use(router).mount('#app');
