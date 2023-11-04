<script setup lang="ts">
import { Friend } from '@/stores/user.store.ts';
import FriendCard from '@/components/FriendCard.vue';

defineProps<{
    friends: Friend[];
}>();
</script>

<template>
    <ul class="friend-list">
        <li
            v-for="friend in friends"
            :key="friend.id"
            class="friend-list__item"
        >
            <FriendCard
                :id="friend.id"
                :first-name="friend.firstName"
                :last-name="friend.lastName"
                :sex="friend.sex"
                :count="friend.count"
                :photo="friend.avatar"
                :age="friend.age ?? 'Не указано'"
            />
        </li>
    </ul>
</template>

<style scoped lang="scss">
.friend-list {
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
