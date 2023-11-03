export function useVkApi(vk: typeof VK) {
    const userFields = ['photo_200', 'screen_name'];
    function searchUsers(query: string): Promise<VkUser[]> {
        return new Promise((resolve, reject) => {
            vk.Api.call(
                'users.search',
                {
                    q: query,
                    count: 30,
                    fields: userFields,
                    v: '5.154',
                },
                (response: VkSearchResponse<VkUser> | VkError) => {
                    if ('error' in response) {
                        reject(Error(response.error.error_msg));
                        return;
                    }

                    resolve(response.response.items);
                }
            );
        });
    }

    return {
        searchUsers,
    };
}

type VkSearchResponse<T> = {
    response: {
        count: number;
        items: T[];
    };
};

type VkError = {
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
};
