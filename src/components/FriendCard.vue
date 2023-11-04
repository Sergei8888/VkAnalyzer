<script setup lang="ts">
defineProps<{
    firstName: string;
    lastName: string;
    id: number;
    photo: string;
    count: number;
    sex: string;
    age?: number;
}>();
</script>

<template>
    <div class="friend-card">
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
    &__age {
        color: #565656;
    }
}
</style>
