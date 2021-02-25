import { createApp } from 'vue';
import App from './App.vue';
import './index.css';
import { installVueGamepad } from './api/gamepad/install';

const app = createApp(App);

installVueGamepad(app);

app.mount('#app');
