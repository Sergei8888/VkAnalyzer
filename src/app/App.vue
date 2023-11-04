<script lang="ts" setup>
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
</script>

<template>
    <router-view />
</template>

<style lang="scss">
@import 'scss/design-tokens';
@import 'normalize.css';
@import 'scss/global';
</style>
