<script setup lang="ts">
import throttle from 'lodash-es/throttle';
import { inject } from 'vue';

import { vkInjectionKey } from '@/shared/injection-keys.ts';
import { VkUser } from '@/shared/vk-api';
import { userSuggestionQueue } from '@/models/user-suggestion-queue.ts';

const emit = defineEmits<{
    (e: 'suggestion', value: VkUser[]): void;
}>();

const vk = inject(vkInjectionKey);
if (!vk) throw new Error('vk is not provided');

const suggestionQueue = userSuggestionQueue(vk, emit);
const handleInputChange = throttle(
    (value: string) => suggestionQueue.addRequest(value),
    1000
);
</script>

<template>
    <input
        class="vk-input"
        type="text"
        placeholder="Введие id, имя/фамилию или короткое имя пользователя"
        @input="(e) => handleInputChange((e.target as HTMLInputElement).value)"
    />
    {{ suggestionQueue.isLoading }}
</template>

<style scoped lang="scss">
.vk-input {
    width: 100%;
    height: 50px;
    border-radius: 5px;
}
</style>
