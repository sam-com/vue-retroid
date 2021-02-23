import { createApp } from 'vue'
import App from './App.vue'
import {installVueGamepad} from "../api/gamepad/install";

const app = createApp(App);

installVueGamepad(app);

app.mount('#app');