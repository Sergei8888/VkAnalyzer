<script setup lang="ts">
import throttle from 'lodash-es/throttle';
import { inject } from 'vue';

import { vkInjectionKey } from '@/shared/injection-keys.ts';
import { VkUser } from '@/shared/vk-api';
import { userSuggestionQueue } from '@/models/user-suggestion-queue.ts';
import SpinnerSvg from '@/assets/spinner.svg';

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
    <div class="vk-input">
        <input
            class="vk-input__input"
            type="text"
            placeholder="Введие id, имя/фамилию или короткое имя пользователя"
            @input="
                (e) => handleInputChange((e.target as HTMLInputElement).value)
            "
        />
        <div v-if="suggestionQueue.isLoading.value" class="vk-input__spinner">
            <SpinnerSvg />
        </div>
    </div>
</template>

<style scoped lang="scss">
.vk-input {
    position: relative;
    width: 100%;
    height: 50px;

    &__input {
        width: 100%;
        height: 100%;
        border-radius: 5px;
    }

    &__spinner {
        position: absolute;
        top: 50%;
        right: 20px;
        transform: translateY(-50%);
    }
}
</style>
