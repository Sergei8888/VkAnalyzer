<script setup lang="ts">
import { ref } from 'vue';

import { onClickOutside } from '@vueuse/core';

import VkInput from '@/components/UserSelector/VkInput.vue';
import UserSelectList from '@/components/UserSelector/UserSelectList.vue';
import { UserI } from '@/models/user.ts';

const userSuggestion = ref<UserI[]>([]);

defineEmits<{
    (e: 'user-selected', user: UserI): void;
}>();

// Close suggestions when clicked outside
const userSelectorElem = ref();
const isSelectorActive = ref(false);
onClickOutside(userSelectorElem, () => {
    isSelectorActive.value = false;
});
</script>

<template>
    <div ref="userSelectorElem" class="user-selector">
        <VkInput
            class="page__vk-input"
            @focused="isSelectorActive = true"
            @suggestion="(value) => (userSuggestion = value)"
        />
        <UserSelectList
            v-if="userSuggestion.length && isSelectorActive"
            class="user-selector__select-list"
            :users="userSuggestion"
            @user-selected="
                (user) => {
                    $emit('user-selected', user);
                    userSuggestion = [];
                    isSelectorActive = false;
                }
            "
        />
    </div>
</template>

<style scoped lang="scss">
.user-selector {
    position: relative;
    width: 800px;

    &__select-list {
        position: absolute;
    }
}
</style>
