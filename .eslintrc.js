module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
    ],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
    ],
    rules: {
        '@typescript-eslint/no-namespace': 0,
        '@typescript-eslint/no-empty-interface': 0,
        '@typescript-eslint/no-inferrable-types': 1,
        '@typescript-eslint/ban-ts-comment': 1,
        '@typescript-eslint/no-empty-function': 1,
        '@typescript-eslint/no-explicit-any': 0,
        'prefer-const': 1,
    },
};