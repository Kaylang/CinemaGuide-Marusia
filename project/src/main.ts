import './assets/main.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import type { IYT } from './types/youtube';

declare global {
  interface Window {
    YT?: IYT;
  }
}

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');
