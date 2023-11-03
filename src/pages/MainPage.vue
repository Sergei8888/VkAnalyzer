<script setup lang="ts">
import UserSelector from '@/components/UserSelector.vue';
</script>

<template>
    <div class="page">
        <UserSelector class="page__user-selector" />
    </div>
</template>

<style scoped lang="scss">
.page {
    display: flex;
    height: 100vh;
    flex-direction: column;
    align-items: center;
    padding: 0 60px;
    background-image: linear-gradient(to bottom, #ffffff 0%, #008da2 100%);

    &__user-selector {
        margin-top: 50px;
    }
}
</style>
