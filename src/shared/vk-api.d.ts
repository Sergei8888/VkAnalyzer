export type VkApiSearchApiResponse<T> = {
    response: {
        count: number;
        items: T[];
    };
};

type VkApiUser = {
    id: number;
    first_name: string;
    last_name: string;
};
