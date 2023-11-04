<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
    <p>{{ route.query.friendId }}</p>
</template>

<style scoped lang="scss"></style>
