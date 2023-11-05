<script setup lang="ts">
import { useRoute } from 'vue-router';

import { ref } from 'vue';

import { useVkApi, VkError } from '@/shared/vk-api.ts';
import { WallPostI } from '@/models/wall-post.ts';

const route = useRoute();
const friendId = route.query.friendId;
if (!friendId || isNaN(Number(friendId))) {
    throw new Error(
        'You need to have friendId in query params convertable to number to render this page'
    );
}

const errorDuringInfoLoading = ref('');

const wall = ref<WallPostI[]>();
useVkApi()
    .getWall(Number(friendId))
    .then((wallPosts) => {
        wall.value = wallPosts;
    })
    .catch((err: VkError) => {
        errorDuringInfoLoading.value = err.error.error_msg;
    });
</script>

<template>
    <div class="page">
        {{ wall }}

        <h1 v-if="errorDuringInfoLoading" class="error-heading">
            Нет данных о пользователе: {{ errorDuringInfoLoading }}
        </h1>
    </div>
</template>

<style scoped lang="scss">
.error-heading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>
