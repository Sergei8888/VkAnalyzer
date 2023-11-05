<script setup lang="ts">
import throttle from 'lodash-es/throttle';

import { useUserSuggestionQueue } from '@/models/user-suggestion-queue.ts';
import SpinnerSvg from '@/assets/spinner.svg';
import { UserI } from '@/models/user.ts';

const emit = defineEmits<{
    (e: 'suggestion', users: UserI[]): void;
    (e: 'focused'): void;
}>();

const suggestionQueue = useUserSuggestionQueue(emit);
const triggerSuggestion = throttle((e: Event) => {
    let query = (e.target as HTMLInputElement).value;
    suggestionQueue.addRequest(query);
}, 1000);
</script>

<template>
    <div class="vk-input">
        <input
            class="vk-input__input"
            type="text"
            placeholder="Введие id, имя/фамилию или короткое имя пользователя"
            @focusin="
                () => {
                    triggerSuggestion;
                    emit('focused');
                }
            "
            @input="triggerSuggestion"
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
