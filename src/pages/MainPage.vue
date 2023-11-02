<script setup lang="ts">
import VkInput from '@/components/VkInput.vue';
</script>

<template>
    <div class="page">
        <VkInput
            class="page__vk-input"
            @suggestions="(value) => console.log(value)"
        />
    </div>
</template>

<style scoped lang="scss">
.page {
    display: flex;
    justify-content: center;
    align-items: start;
    height: 100vh;
    background-image: linear-gradient(to bottom, #ffffff 0%, #008da2 100%);

    &__vk-input {
        margin-top: 200px;
    }
}
</style>
