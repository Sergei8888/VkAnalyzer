module.exports = {
    root: true,

    env: {
        browser: true,
        node: true,
    },

    // VK OpenApi
    globals: {
        "VK": "writable",
    },

    plugins: ['prettier', '@typescript-eslint/eslint-plugin', 'import'],

    parser: 'vue-eslint-parser',

    parserOptions: {
        parser: {
            js: 'espree',
            ts: '@typescript-eslint/parser',
            '<template>': '@typescript-eslint/parser',
        },
        requireConfigFile: false,
    },

    extends: [
        // Prettier
        'prettier',
        // JS base
        'eslint:recommended',
        // TS
        'plugin:@typescript-eslint/recommended',
        // Import resolver
        'plugin:import/typescript',
        // Vue 3
        'plugin:vue/vue3-recommended',
        'plugin:vue-scoped-css/vue3-recommended',
    ],

    settings: {
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx'],
        },

        'import/resolver': {
            alias: [
                ['@', './src'],
                ['@/*', './src/*'],
            ],
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue', '.d.ts'],
            },
            typescript: {
                alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
                // use <root>/path/to/folder/tsconfig.json
                project: __dirname,
            },
        },
    },

    rules: {
        // Import
        'import/order': [
            'error',
            {
                pathGroups: [
                    {
                        pattern: '@uniscope/shared',
                        group: 'sibling',
                        position: 'before',
                    },
                ],

                'newlines-between': 'always-and-inside-groups',

                groups: [
                    'builtin',
                    'external',
                    ['parent', 'internal', 'sibling'],
                    'index',
                    'type',
                    'object',
                ],

                warnOnUnassignedImports: true,
            },
        ],
        'import/no-default-export': 'error',

        // Typescript
        '@typescript-eslint/explicit-member-accessibility': [
            'error',
            {
                accessibility: 'explicit',
                overrides: {
                    accessors: 'explicit',
                    constructors: 'no-public',
                    methods: 'explicit',
                    properties: 'off',
                    parameterProperties: 'explicit',
                },
            },
        ],
        '@typescript-eslint/no-explicit-any': 'off',

        // General
        // == and != restrictions
        eqeqeq: 1,
        // Production rules
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        // Comment formatting
        'spaced-comment': [
            'error',
            'always',
            {
                exceptions: ['-', '+'],
                markers: ['/'],
            },
        ],

        // Vue
        'vue/component-tags-order': [
            'error',
            {
                order: ['script', 'template', 'style'],
            },
        ],
        'vue/html-indent': [
            'error',
            4,
            {
                attribute: 1,
                baseIndent: 1,
                closeBracket: 0,
                alignAttributesVertically: true,
                ignores: [],
            },
        ],
        // Hack to deal with prettier styling
        'vue/max-attributes-per-line': [
            'error',
            {
                singleline: {
                    max: 20,
                },
                multiline: {
                    max: 1,
                },
            },
        ],
        'vue/singleline-html-element-content-newline': 'off',
        'vue/html-self-closing': [
            'error',
            {
                html: {
                    void: 'always',
                    normal: 'never',
                    component: 'always',
                },
            },
        ],
        'vue/block-lang': [
            'error',
            {
                script: {lang: 'ts'},
                style: {lang: 'scss'},
                template: {lang: 'html'},
            },
        ],
        'vue-scoped-css/enforce-style-type': [
            'error',
            {allows: ['scoped', 'plain']},
        ],
        // Vue component naming
        'vue/component-name-in-template-casing': ['error', 'PascalCase'],
        'vue/component-definition-name-casing': ['error', 'PascalCase'],
        // Fix script setup macros errors
        'vue/script-setup-uses-vars': 'error',

        // Fixing false positive end of line error after git
        'prettier/prettier': [
            'error',
            {
                endOfLine: 'auto',
            },
        ],
    },
};
