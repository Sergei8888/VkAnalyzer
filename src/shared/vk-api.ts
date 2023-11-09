import { User, UserI } from '@/models/user.ts';
import { WallPost, WallPostI } from '@/models/wall-post.ts';

export function useVkApi() {
    const defaultParams = {
        v: '5.154',
    };
    const userFields = ['photo_200', 'screen_name', 'sex', 'bdate'];

    // Implements recursive retries when hitting vkapi Too many requests
    async function apiCall<T extends object>(
        cb: () => Promise<T | VkError>
    ): Promise<T> {
        const response = await cb();
        if ('error' in response) {
            // Too many requests
            if (response.error.error_code === 6) {
                return await new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(apiCall<T>(cb));
                    }, 3000);
                });
            }

            throw response.error;
        }

        return response;
    }

    function searchUsers(query: string): Promise<UserI[]> {
        return apiCall(() => {
            return new Promise((resolve) => {
                VK.Api.call(
                    'users.search',
                    {
                        q: query,
                        count: Number(import.meta.env.VITE_MAX_USER_SEARCH),
                        fields: userFields,
                        ...defaultParams,
                    },
                    (response: VkSearchResponse<VkUser> | VkError) => {
                        if ('error' in response) {
                            resolve(response);
                            return;
                        }

                        const users = response.response.items.map<UserI>(
                            (vkUser) => new User(vkUser)
                        );

                        resolve(users);
                    }
                );
            });
        });
    }

    function getFriends(userId: number): Promise<UserI[]> {
        return apiCall(() => {
            return new Promise((resolve) => {
                VK.Api.call(
                    'friends.get',
                    {
                        user_id: userId,
                        count: Number(import.meta.env.VITE_MAX_FRIENDS_GET),
                        fields: userFields,
                        ...defaultParams,
                    },
                    (response: VkSearchResponse<VkUser> | VkError) => {
                        if ('error' in response) {
                            resolve(response);
                            return;
                        }

                        const friends = response.response.items.map<UserI>(
                            (vkUser) => new User(vkUser)
                        );

                        resolve(friends);
                    }
                );
            });
        });
    }

    function getFriendsIds(userId: number): Promise<number[]> {
        return apiCall(() => {
            return new Promise((resolve) => {
                VK.Api.call(
                    'friends.get',
                    {
                        user_id: userId,
                        count: 5000,
                        ...defaultParams,
                    },
                    (response: VkGetIdsResponse | VkError) => {
                        if ('error' in response) {
                            resolve(response);
                            return;
                        }

                        resolve(response.response.items.flat(1));
                    }
                );
            });
        });
    }

    function getWall(ownerId: number): Promise<WallPostI[]> {
        return apiCall(() => {
            return new Promise((resolve) => {
                VK.Api.call(
                    'wall.get',
                    {
                        owner_id: ownerId,
                        count: Number(import.meta.env.VITE_MAX_WALL_GET),
                        ...defaultParams,
                    },
                    (response: VkSearchResponse<VkWallPost> | VkError) => {
                        if ('error' in response) {
                            resolve(response);
                            return;
                        }

                        const wallPosts =
                            response.response.items.map<WallPostI>(
                                (wallPost) => new WallPost(wallPost)
                            );

                        resolve(wallPosts);
                    }
                );
            });
        });
    }

    return {
        searchUsers,
        getFriends,
        getFriendsIds,
        getWall,
    };
}

type VkSearchResponse<T> = {
    response: {
        count: number;
        items: T[];
    };
};

type VkGetIdsResponse = {
    response: {
        count: number;
        items: number[][];
    };
};

export type VkError = {
    error: {
        error_code: number;
        error_msg: string;
    };
};

export type VkUser = {
    id: number;
    first_name: string;
    last_name: string;
    photo_200: string;
    screen_name: string;
    // 1 - female, 2 - male, 0 - not specified
    sex: 1 | 2 | 0;
    // Birth date in format DD.MM.YYYY or DD.MM
    bdate?: string;
};

export type VkWallPost = {
    id: number;
    // unixtime
    date: number;
    text: string;
    comments?: {
        count: number;
    };
    likes?: {
        count: number;
    };
    reposts?: {
        count: number;
    };
    views?: {
        count: number;
    };
    attachments: VkAttachment[];
};

export type VkAttachment =
    | VkPhotoAttachment
    | VkAudioAttachment
    | VkVideoAttachment;

export type VkPhotoAttachment = {
    type: 'photo';
    photo: {
        id: number;
        sizes: {
            type: 's' | 'm' | 'x' | 'o' | 'p' | 'q' | 'r' | 'y' | 'z' | 'w';
            url: string;
        }[];
    };
};

export type VkAudioAttachment = {
    type: 'audio';
    audio: {
        id: number;
        url: string;
    };
};

export type VkVideoAttachment = {
    type: 'video';
    video: {
        id: number;
        // URL
        player: string;
    };
};
