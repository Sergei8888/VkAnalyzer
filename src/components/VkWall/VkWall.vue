<script setup lang="ts">
import WallPost from '@/components/VkWall/WallPost.vue';
import { WallPostI } from '@/models/wall-post.ts';

defineProps<{
    posts: WallPostI[];
}>();
</script>

<template>
    <ul class="vk-wall">
        <li v-for="post in posts" :key="post.id" class="vk-wall__post">
            <WallPost :post="post" />
        </li>
    </ul>
</template>

<style scoped lang="scss">
.vk-wall {
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0;
    gap: 10px;
    list-style: none;
}
</style>
