import { ref } from 'vue';

import { useVkApi, VkUser } from '@/shared/vk-api.ts';

// Add suggestion request to queue with addRequest method, and then it will emit 'suggestion' event with suggestions
export function userSuggestionQueue(
    vk: typeof VK,
    suggestionEmit: (e: 'suggestion', value: VkUser[]) => void
) {
    const isLoading = ref(false);
    let suggestionRequestQueue: Promise<VkUser[]>[] = [];

    function addRequest(query: string) {
        const userSuggestionRequest = getUserSuggestionRequest(query, vk);
        suggestionRequestQueue.push(userSuggestionRequest);
        isLoading.value = true;

        userSuggestionRequest.then((result) => {
            // If request was least in queue, emit suggestions and clear queue
            if (suggestionRequestQueue.at(-1) === userSuggestionRequest) {
                suggestionEmit('suggestion', result);
                suggestionRequestQueue = [];
                isLoading.value = false;
                return;
            }

            // If request was not least in queue, remove it from queue
            suggestionRequestQueue.splice(
                suggestionRequestQueue.indexOf(userSuggestionRequest),
                1
            );
        });
    }

    function getUserSuggestionRequest(query: string, vk: typeof VK) {
        let userSuggestionsRequest: Promise<VkUser[]>;

        if (!query) {
            userSuggestionsRequest = new Promise((resolve) => {
                resolve([]);
            });
        } else {
            userSuggestionsRequest = useVkApi(vk).searchUsers(query);
        }

        return userSuggestionsRequest;
    }

    return { addRequest, isLoading };
}
