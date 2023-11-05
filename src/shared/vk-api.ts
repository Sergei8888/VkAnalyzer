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
    ): Promise<T | VkError> {
        const response = await cb();
        if ('error' in response) {
            // Too many requests
            if (response.error.error_code === 6) {
                return await apiCall<T>(cb);
            }
            // Profile is private
            if (response.error.error_code === 30) {
                alert('Нельзая получить доступ к приватному профилю');
            }

            throw response;
        }

        return response;
    }

    async function searchUsers(query: string): Promise<UserI[]> {
        const response = await apiCall<UserI[]>(() => {
            return _searchUsers(query);
        });

        if ('error' in response) {
            throw new Error('Unexpected vk api error: ' + response.error);
        }

        return response;
    }

    function _searchUsers(query: string): Promise<UserI[] | VkError> {
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
    }

    async function getFriends(id: number): Promise<UserI[]> {
        const response = await apiCall<UserI[]>(() => {
            return _getFriends(id);
        });

        if ('error' in response) {
            throw new Error('Unexpected vk api error: ' + response.error);
        }

        return response;
    }

    function _getFriends(id: number): Promise<UserI[] | VkError> {
        return new Promise((resolve) => {
            VK.Api.call(
                'friends.get',
                {
                    user_id: id,
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
    }

    async function getWall(ownerId: number) {
        const response = await apiCall<WallPostI[]>(() => {
            return _getWall(ownerId);
        });

        if ('error' in response) {
            throw new Error('Unexpected vk api error: ' + response.error);
        }

        return response;
    }

    function _getWall(ownerId: number): Promise<WallPostI[] | VkError> {
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

                    const wallPosts = response.response.items.map<WallPostI>(
                        (wallPost) => new WallPost(wallPost)
                    );

                    resolve(wallPosts);
                }
            );
        });
    }

    return {
        searchUsers,
        getFriends,
        getWall,
    };
}

type VkSearchResponse<T> = {
    response: {
        count: number;
        items: T[];
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
    comments: {
        count: number;
    };
    likes: {
        count: number;
    };
    reposts: {
        count: number;
    };
    views: {
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
        // Full size photo
        photo_604: string;
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
