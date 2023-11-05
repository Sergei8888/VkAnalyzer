<script setup lang="ts">
import { computed } from 'vue';

import { WallPostI } from '@/models/wall-post.ts';
import {
    AudioAttachmentI,
    MediaAttachment,
    PhotoAttachmentI,
    VideoAttachmentI,
} from '@/models/attachment.ts';

const props = defineProps<{
    post: WallPostI;
}>();

const videoAttachments = computed(() => {
    return props.post.attachments.filter((attach: MediaAttachment) => {
        return attach.type === 'video';
    }) as VideoAttachmentI[];
});

const photoAttachments = computed(() => {
    return props.post.attachments.filter((attach: MediaAttachment) => {
        return attach.type === 'photo';
    }) as PhotoAttachmentI[];
});

const audioAttachments = computed(() => {
    return props.post.attachments.filter((attach: MediaAttachment) => {
        return attach.type === 'audio';
    }) as AudioAttachmentI[];
});
</script>

<template>
    <div class="wall-post">
        <div class="wall-post__intro">
            <span>Запись {{ post.id }} опубликована {{ post.date }}</span>
        </div>
        <div class="wall-post__main-info">
            <span>{{ post.text }}</span>
            <iframe
                v-for="videoAttach in videoAttachments"
                :key="videoAttach.video.id"
                :src="videoAttach.video.playerUrl"
            ></iframe>
            <img
                v-for="photoAttach in photoAttachments"
                :key="photoAttach.photo.id"
                class="wall-post__photo"
                :src="photoAttach.photo.url"
                alt="Vk post photo"
            />
            <audio
                v-for="audioAttach in audioAttachments"
                :key="audioAttach.audio.id"
                :src="audioAttach.audio.url"
                controls
            ></audio>
        </div>
        <div class="wall-post__statistic">
            <span>
                Лайков: {{ post.likes.count }} Комментариев:
                {{ post.comments.count }} Просмотров:
                {{ post.views.count }} Репостов: {{ post.reposts.count }}
            </span>
        </div>
    </div>
</template>

<style scoped lang="scss">
.wall-post {
    background-color: #fff;

    &__intro,
    &__main-info,
    &__statistic {
        padding: 10px 15px;
    }

    &__main-info {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    &__photo {
        object-fit: contain;
        width: auto;
        height: 400px;
    }
}
</style>
