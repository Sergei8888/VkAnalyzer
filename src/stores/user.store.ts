import { defineStore } from 'pinia';

import { ref } from 'vue';

import { useVkApi } from '@/shared/vk-api.ts';
import { UserI } from '@/models/user.ts';

// Define pinia user store
export const useUserStore = defineStore('users', () => {
    const selectedUsers = ref<UserI[]>([]);
    const friendList = ref<Friend[]>([]);

    function addSelectedUser(user: UserI) {
        if (selectedUsers.value.find((u) => u.id === user.id)) return;
        selectedUsers.value.push(user);
    }

    function removeSelectedUser(id: number) {
        selectedUsers.value = selectedUsers.value.filter((u) => u.id !== id);
    }

    async function findFriendsOfSelectedUsers() {
        const friendRequests = selectedUsers.value.map((u) =>
            useVkApi().getFriends(u.id)
        );

        const foundUsers = (await Promise.all(friendRequests)).flat(1);
        friendList.value = transformUsersToFriends(foundUsers);
    }

    /**
     * Transforms an array of users to array of friends by reducing duplication by id.
     * @example
     * [{ id: 3}, {id: 3}, {id: 1}] => [{id:3, count: 2}, {id: 1, count: 1}]
     */
    function transformUsersToFriends(users: UserI[]): Friend[] {
        const transformedObj: { [key: number]: Friend } = {};

        users.forEach((user) => {
            if (transformedObj[user.id]) {
                transformedObj[user.id].count++;
            } else {
                transformedObj[user.id] = { ...user, count: 1 };
            }
        });

        return Object.values(transformedObj);
    }

    return {
        addSelectedUser,
        removeSelectedUser,
        findFriendsOfSelectedUsers,
        selectedUsers,
        friendList,
    };
});

export interface Friend extends UserI {
    // How many times this friend was found for selected users
    count: number;
}
