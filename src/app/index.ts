import { createApp } from 'vue';

import { createPinia } from 'pinia';

import App from '@/app/App.vue';
import { router } from '@/router';

const pinia = createPinia();

export const readyApp = createApp(App).use(router).use(pinia);
