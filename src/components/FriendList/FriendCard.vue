<script setup lang="ts">
import { computed, ref, watch } from 'vue';

import { useElementVisibility } from '@vueuse/core';

import { useVkApi } from '@/shared/vk-api.ts';
import { Friend, useUserStore } from '@/stores/user.store.ts';

const props = defineProps<{
    firstName: string;
    lastName: string;
    id: number;
    photo: string;
    count: number;
    sex: string;
    age: number | string;
    friendCount?: number;
}>();

const borderColorAlpha = computed(() => {
    switch (props.count) {
        case 0:
            return 0;
        case 1:
            return 0.2;
        case 2:
            return 0.4;
        case 3:
            return 0.6;
        case 4:
            return 0.8;
        default:
            return 1;
    }
});

const cardElem = ref<HTMLElement>();
const cardVisibility = useElementVisibility(cardElem);

const friendCountError = ref('');
// Fetch friend count only when card is visible, to not trigger unnecessary api requests
watch(cardVisibility, () => {
    if (cardVisibility.value && !props.friendCount && !friendCountError.value) {
        useVkApi()
            .getFriendsIds(props.id)
            .then((ids) => {
                const friend = useUserStore().friendList.find(
                    (u) => u.id === props.id
                ) as Friend;
                friend.friendCount = ids.length;
            })
            .catch(() => {
                friendCountError.value = 'невозможно установить';
            });
    }
});
</script>

<template>
    <div
        ref="cardElem"
        class="friend-card"
        :style="{
            border: `4px solid rgba(30, 154, 255, ${borderColorAlpha}`,
        }"
    >
        <img
            class="friend-card__avatar"
            :src="photo"
            alt="avatar"
            loading="lazy"
            height="100"
            width="100"
        />
        <div class="friend-card__info">
            <span class="friend-card__name">
                {{ firstName }} {{ lastName }}
            </span>
            <span class="friend-card__sex">Пол: {{ sex }}</span>
            <span class="friend-card__age">Возраст: {{ age }}</span>
            <span class="friend-card__friends-count">
                Количество друзей:
                {{ friendCountError || friendCount || '...' }}
            </span>
        </div>
    </div>
</template>

<style scoped lang="scss">
.friend-card {
    display: flex;
    width: 100%;
    align-items: center;
    padding: 10px 15px;
    background-color: #fff;

    &__avatar {
        border-radius: 50%;
    }

    &__info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-left: 20px;
        gap: 5px;
        text-align: left;
    }

    &__sex,
    &__age,
    &__friends-count {
        color: #565656;
    }
}
</style>
