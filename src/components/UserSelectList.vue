<script setup lang="ts">
import UserCard from '@/components/UserCard.vue';
import { UserI } from '@/models/user.ts';

defineProps<{
    users: UserI[];
}>();

defineEmits<{
    (e: 'user-selected', user: UserI): void;
}>();
</script>

<template>
    <ul v-if="users.length" class="user-list">
        <li v-for="user in users" :key="user.id" class="user-list__item">
            <button
                class="user-list__button"
                @click="$emit('user-selected', user)"
            >
                <UserCard
                    :id="user.id"
                    class="user-list__user-card"
                    :first-name="user.firstName"
                    :last-name="user.lastName"
                    :photo="user.avatar"
                    :screen-name="user.screenName"
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
    max-height: 50vh;
    padding: 0;
    margin: 0;
    grid-template: auto / repeat(2, 1fr);
    list-style: none;

    &__user-card {
        transition: 0.3s background-color;
    }

    &__button {
        width: 100%;
        padding: 0;
        border: none;
        cursor: pointer;
        transition: 0.2s background-color;

        &:hover .user-list__user-card {
            background-color: #b9eeff;
        }
    }
}
</style>
