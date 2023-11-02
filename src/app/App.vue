<script lang="ts" setup>
import { provide } from 'vue';

import { vkInjectionKey } from '@/shared/injection-keys.ts';

VK.init({
    apiId: Number(import.meta.env.VITE_VK_APP_ID),
});

VK.Auth.getLoginStatus((response) => {
    let notLoggedIn = !response.session;
    if (notLoggedIn) {
        VkLogin();
    }
});

function VkLogin() {
    VK.Auth.login((response) => {
        if (!response.session) {
            throw Error('Auth error');
        }
    }, 2);
}

provide(vkInjectionKey, VK);
</script>

<template>
    <router-view />
</template>

<style lang="scss">
@import 'scss/design-tokens.scss';
@import 'normalize.css';
@import 'scss/global';
</style>
