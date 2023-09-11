/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './index.html',
        './src/**/*.vue'
    ],
    theme: {
        extend: {},
    },
    plugins: [
        require('@vue-interface/btn/tailwindcss')(),
        require('@vue-interface/dropdown-menu/tailwindcss')
    ],
    safelist: [
        ...require('@vue-interface/dropdown-menu/tailwindcss/safelist')(),
    ]
};