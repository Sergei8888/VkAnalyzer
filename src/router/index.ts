import { createRouter, createWebHistory } from 'vue-router';

import { routes } from '@/router/routes.ts';

const router = createRouter({
    history: createWebHistory(),
    scrollBehavior: function (to) {
        if (to.hash) {
            return { el: to.hash, behavior: 'smooth' };
        } else {
            return { left: 0, top: 0 };
        }
    },
    routes,
});

export { router };
