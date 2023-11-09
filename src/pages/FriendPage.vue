<script setup lang="ts">
import { useRoute } from 'vue-router';

import { ref } from 'vue';

import { useVkApi, VkError } from '@/shared/vk-api.ts';
import { WallPostI } from '@/models/wall-post.ts';
import { useUserStore } from '@/stores/user.store.ts';
import UserList from '@/components/UserList/UserList.vue';
import VkWall from '@/components/VkWall/VkWall.vue';
import { UserI } from '@/models/user.ts';

// Validating friend id from query params
const route = useRoute();
let friendId = route.query.friendId;
if (!friendId || isNaN(Number(friendId))) {
    throw new Error(
        'You need to have friendId in query params convertable to number to render this page'
    );
}

// Loading wall posts
const errorDuringWallLoading = ref('');
const wallPosts = ref<WallPostI[]>();
useVkApi()
    .getWall(Number(friendId))
    .then((wp) => {
        wallPosts.value = wp;
    })
    .catch((err: VkError) => {
        errorDuringWallLoading.value = err.error.error_msg;
    });

// Loading friends from selected users list
const userStore = useUserStore();
const friendsFromSelectedUsers = ref<UserI[]>();
userStore.getFriendSubsetFromSelectedUsers(Number(friendId)).then((friends) => {
    friendsFromSelectedUsers.value = friends;
});
</script>

<template>
    <div class="page">
        <div class="content-wrapper">
            <div class="content-wrapper__block">
                <h2>Список друзей из списка исходный</h2>
                <UserList
                    v-if="friendsFromSelectedUsers?.length"
                    class="page__user-list"
                    :users="friendsFromSelectedUsers"
                />
                <h3 v-else>Исходный список пользователей не сформирован</h3>
            </div>
            <div class="content-wrapper__block">
                <h2>Стена пользователя</h2>
                <VkWall
                    v-if="wallPosts"
                    class="page__wall"
                    :posts="wallPosts"
                />
                <h3 v-else class="error-heading">
                    Нет данных о пользователе: {{ errorDuringWallLoading }}
                </h3>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.page {
    &__user-list {
        grid-template-columns: 1fr;
    }

    &__user-list,
    &__wall {
        overflow: auto;
        max-height: 80vh;
    }
}

.content-wrapper {
    display: flex;
    gap: 30px;

    &__block {
        width: 50%;
    }
}
</style>
