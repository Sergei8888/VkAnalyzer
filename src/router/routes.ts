import { RouteRecordRaw } from 'vue-router';

import MainPage from '@/pages/MainPage.vue';
import AuthPage from '@/pages/AuthPage.vue';
import FriendPage from '@/pages/FriendPage.vue';

export const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'main',
        component: MainPage,
    },
    {
        path: '/auth',
        name: 'auth',
        component: AuthPage,
    },
    {
        path: '/friend',
        name: 'friend',
        component: FriendPage,
    },
];
