<script setup lang="ts">
import { VkUser } from '@/shared/vk-api';
import UserCard from '@/components/UserCard.vue';

defineProps<{
    users: VkUser[];
}>();
</script>

<template>
    <ul class="user-list">
        <li v-for="user in users" :key="user.id" class="user-list__item">
            <button class="user-list__button">
                <UserCard
                    :id="user.id"
                    :first-name="user.first_name"
                    :last-name="user.last_name"
                    :photo="user.photo_200"
                    :screen-name="user.screen_name"
                />
            </button>
        </li>
    </ul>
</template>

<style scoped lang="scss">
.user-list {
    display: grid;
    overflow: auto;
    width: 100%;
    max-height: 85vh;
    padding: 0;
    background-color: #fff;
    grid-template: auto / repeat(2, 1fr);
    list-style: none;

    &__button {
        width: 100%;
        padding: 0;
        border: none;
        background-color: #fff;
        cursor: pointer;
        transition: 0.2s background-color;

        &:hover {
            background-color: #b9eeff;
        }
    }
}
</style>
