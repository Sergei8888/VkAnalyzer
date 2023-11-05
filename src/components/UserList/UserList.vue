<script setup lang="ts">
import UserCard from '@/components/UserList/UserCard.vue';
import { useUserStore } from '@/stores/user.store.ts';
import { UserI } from '@/models/user.ts';

defineProps<{
    users: UserI[];
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
                removable
                @remove="useUserStore().removeSelectedUser"
            />
        </li>
    </ul>
</template>

<style scoped lang="scss">
.user-list {
    display: grid;
    max-height: 80vh;
    justify-content: space-between;
    padding: 0;
    margin: 0;
    gap: 20px;
    grid-auto-rows: min-content;
    grid-template-columns: repeat(2, 1fr);
    list-style: none;
}
</style>
