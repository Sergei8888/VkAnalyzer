import { ref } from 'vue';

import { useVkApi } from '@/shared/vk-api.ts';
import { UserI } from '@/models/user.ts';

// Add suggestion request to queue with addRequest method, and then it will emit 'suggestion' event with suggestions
export function userSuggestionQueue(
    suggestionEmit: (e: 'suggestion', value: UserI[]) => void
) {
    const isLoading = ref(false);
    let suggestionRequestQueue: Promise<UserI[]>[] = [];

    function addRequest(query: string) {
        const userSuggestionRequest = getUserSuggestionRequest(query);
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

    function getUserSuggestionRequest(query: string) {
        let userSuggestionsRequest: Promise<UserI[]>;

        if (!query) {
            userSuggestionsRequest = new Promise((resolve) => {
                resolve([]);
            });
        } else {
            userSuggestionsRequest = useVkApi().searchUsers(query);
        }

        return userSuggestionsRequest;
    }

    return { addRequest, isLoading };
}
