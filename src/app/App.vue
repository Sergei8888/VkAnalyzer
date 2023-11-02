<script lang="ts" setup>
import { provide } from 'vue';

VK.init({
    apiId: Number(import.meta.env.VITE_VK_APP_ID),
});

VK.Auth.getLoginStatus((response) => {
    if (!response.session) {
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

provide('vk', VK);
</script>

<template>Hello world</template>

<style lang="scss">
@import 'normalize.css';
@import 'scss/global';
</style>
