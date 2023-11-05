<script setup lang="ts">
import UserCard from '@/components/UserList/UserCard.vue';
import { UserI } from '@/models/user.ts';

withDefaults(
    defineProps<{
        users: UserI[];
        // List will render user cards with cross buttons and emit removing event
        removable?: boolean;
    }>(),
    {
        removable: false,
    }
);

defineEmits<{
    (e: 'remove', user: UserI): void;
}>();
</script>

<template>
    <ul class="user-list">
        <li v-for="user in users" :key="user.id" class="user-list__item">
            <UserCard
                :id="user.id"
                :first-name="user.firstName"
                :last-name="user.lastName"
                :photo="user.avatar"
                :screen-name="user.screenName"
                :removable="removable"
                @remove="$emit('remove', user)"
            />
        </li>
    </ul>
</template>

<style scoped lang="scss">
.user-list {
    display: grid;
    justify-content: space-between;
    padding: 0;
    margin: 0;
    gap: 20px;
    grid-auto-rows: min-content;
    grid-template-columns: repeat(2, 1fr);
    list-style: none;
}
</style>
