<script setup lang="ts">
import { ref } from 'vue';

import VkInput from '@/components/VkInput.vue';
import UserSelectList from '@/components/UserSelectList.vue';
import { UserI } from '@/models/user.ts';

const userSuggestion = ref<UserI[]>([]);

defineEmits<{
    (e: 'user-selected', user: UserI): void;
}>();
</script>

<template>
    <div class="user-selector">
        <VkInput
            class="page__vk-input"
            @suggestion="(value) => (userSuggestion = value)"
        />
        <UserSelectList
            class="user-selector__select-list"
            :users="userSuggestion"
            @user-selected="
                (user) => {
                    $emit('user-selected', user);
                    userSuggestion = [];
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
