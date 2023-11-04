<script setup lang="ts">
withDefaults(
    defineProps<{
        firstName: string;
        lastName: string;
        id: number;
        screenName: string;
        photo: string;
        // If true, remove button will be shown
        removable?: boolean;
    }>(),
    {
        removable: false,
    }
);

defineEmits<{
    (e: 'remove', id: number): void;
}>();
</script>

<template>
    <div class="user-card">
        <img
            class="user-card__avatar"
            :src="photo"
            alt="avatar"
            loading="lazy"
            height="100"
            width="100"
        />
        <div class="user-card__info">
            <span class="user-card__name">{{ firstName }} {{ lastName }}</span>
            <span class="user-card__screen-name">{{ screenName }}</span>
            <span class="user-card__id">{{ id }}</span>
        </div>
        <button
            v-if="removable"
            class="user-card__remove-button"
            @click="$emit('remove', id)"
        ></button>
    </div>
</template>

<style scoped lang="scss">
.user-card {
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
        gap: 10px;
        text-align: left;
    }

    &__remove-button {
        width: 20px;
        height: 20px;
        border: none;
        margin-left: auto;
        background-color: transparent;
        background-image: url('@/assets/remove.png');
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
        cursor: pointer;
    }
}
</style>
