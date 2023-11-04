<script setup lang="ts">
import UserSelector from '@/components/UserSelector.vue';
import { useUserStore } from '@/stores/user.store.ts';
import UserList from '@/components/UserList.vue';
import FriendList from '@/components/FriendList.vue';
import SolveButton from '@/components/SolveButton.vue';

const userStore = useUserStore();
</script>

<template>
    <div class="page">
        <UserSelector
            class="page__user-selector"
            @user-selected="(user) => userStore.addSelectedUser(user)"
        />
        <div class="user-lists-wrapper">
            <div class="user-lists-wrapper__list-block">
                <h2>Исходный список пользователей</h2>
                <UserList
                    class="user-lists-wrapper__list"
                    :users="userStore.selectedUsers"
                />
            </div>
            <div class="user-lists-wrapper__list-block">
                <h2>Список друзей</h2>
                <FriendList
                    class="user-lists-wrapper__list"
                    :friends="userStore.friendList"
                />
            </div>
        </div>
        <SolveButton
            class="page__solve-button"
            @click="userStore.findFriendsOfSelectedUsers()"
        />
    </div>
</template>

<style scoped lang="scss">
.user-lists-wrapper {
    display: flex;
    width: 100%;
    gap: 60px;

    &__list-block {
        width: 50%;
    }

    &__list {
        overflow: auto;
        width: 100%;
        max-height: 80vh;
    }
}

.page {
    display: flex;
    height: 100vh;
    flex-direction: column;
    align-items: center;
    padding: 60px 60px;
    background-image: linear-gradient(
        to bottom,
        #ffffff 0%,
        var(--backgroundColor) 100%
    );
    gap: 20px;

    &__solve-button {
        margin-top: auto;
    }
}
</style>
