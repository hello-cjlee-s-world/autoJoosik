/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",               // Vite 쓸 때는 필요
        "./src/**/*.{js,jsx,ts,tsx}", // React 컴포넌트 경로
    ],
    theme: {
        extend: {},
    },
    plugins: [],
}