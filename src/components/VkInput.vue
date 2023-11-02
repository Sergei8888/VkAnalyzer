<script setup lang="ts">
import throttle from 'lodash-es/throttle';
import { inject } from 'vue';

import { vkInjectionKey } from '@/shared/injection-keys.ts';
import { VkApiSearchApiResponse, VkApiUser } from '@/shared/vk-api';

const emit = defineEmits<{
    (e: 'suggestions', value: VkApiUser[]): void;
}>();

const vk = inject(vkInjectionKey);

const handleInputChange = throttle(_handleInputChange, 300);
function _handleInputChange(value: string) {
    if (!vk) {
        throw Error('VK is not provided');
    }

    searchUsers(value)
        .then((response) => {
            emit('suggestions', response.response.items);
        })
        .catch((error) => {
            throw new Error(error);
        });
}
function searchUsers(
    query: string
): Promise<VkApiSearchApiResponse<VkApiUser>> {
    return new Promise((resolve, reject) => {
        if (!vk) {
            reject(Error('VK is not provided'));
            return;
        }

        vk.Api.call(
            'users.search',
            {
                q: query,
                count: 30,
                v: '5.154',
            },
            (response) => {
                resolve(response);
            }
        );
    });
}
</script>

<template>
    <input
        class="vk-input"
        type="text"
        placeholder="Введие id, имя/фамилию или короткое имя пользователя"
        @input="(e) => handleInputChange((e.target as HTMLInputElement).value)"
    />
</template>

<style scoped lang="scss">
.vk-input {
    width: 700px;
    height: 50px;
    border-radius: 5px;
}
</style>
