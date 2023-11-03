<script setup lang="ts">
import { ref } from 'vue';

import VkInput from '@/components/VkInput.vue';
import InteractiveUserList from '@/components/UserSelectList.vue';
import { VkUser } from '@/shared/vk-api.ts';

const userSuggestion = ref<VkUser[]>([]);
</script>

<template>
    <div class="user-selector">
        <VkInput
            class="page__vk-input"
            @suggestion="(value) => (userSuggestion = value)"
        />
        <InteractiveUserList :users="userSuggestion" />
    </div>
</template>

<style scoped lang="scss">
.user-selector {
    width: 800px;
}
</style>
