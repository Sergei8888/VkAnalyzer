<script setup lang="ts">
defineProps<{
    firstName: string;
    lastName: string;
    id: number;
    screenName: string;
    photo: string;
}>();
</script>

<template>
    <div class="user-card">
        <img
            class="user-card__avatar"
            :src="photo"
            alt="avatar"
            loading="lazy"
        />
        <div class="user-card__info">
            <span class="user-card__name">{{ firstName }} {{ lastName }}</span>
            <span class="user-card__screen-name">{{ screenName }}</span>
            <span class="user-card__id">{{ id }}</span>
        </div>
    </div>
</template>

<style scoped lang="scss">
.user-card {
    display: flex;
    width: 100%;
    align-items: center;
    padding: 10px 15px;

    &__avatar {
        max-height: 100px;
        border-radius: 50%;
        aspect-ratio: 1 / 1;
    }

    &__info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-left: 20px;
        gap: 10px;
        text-align: left;
    }
}
</style>
