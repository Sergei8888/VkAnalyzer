import vue from '@vitejs/plugin-vue';
import { defineConfig, loadEnv, UserConfig } from 'vite';
import Unfonts from 'unplugin-fonts/vite';
import svgLoader from 'vite-svg-loader';

// https://vitejs.dev/config/
// Because of vite spec
// eslint-disable-next-line import/no-default-export
export default defineConfig(({ mode }): UserConfig => {
    const env = { ...process.env, ...loadEnv(mode, process.cwd()) };

    return {
        server: {
            host: env.VITE_HOST,
            port: Number(env.VITE_PORT),
        },

        plugins: [
            // Basic vue plugin
            vue(),
            // Loading svg as components and optimize through svgo
            svgLoader({
                defaultImport: 'component',
            }),
            // Add fonts from Google fonts (or other online providers)
            Unfonts({
                google: {
                    families: [
                        {
                            name: 'Montserrat',
                            styles: 'wght@400;500',
                        },
                    ],
                },
            }),
        ],

        build: {
            sourcemap: true,
        },

        resolve: {
            alias: {
                '@': '/src',
            },
        },
    };
});
