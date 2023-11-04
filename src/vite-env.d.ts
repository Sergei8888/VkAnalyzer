/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_HOST: string;
    readonly VITE_PORT: string;
    readonly VITE_VK_APP_ID: string;
    readonly VITE_MAX_USER_SEARCH: string;
    readonly VITE_MAX_FRIENDS_GET: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
