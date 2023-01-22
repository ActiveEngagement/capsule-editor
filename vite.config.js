import vue from '@vitejs/plugin-vue';
import { pascalCase } from 'change-case';
import path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { name } from './package.json';

export default defineConfig({
    build: {
        sourcemap: true,
        lib: {
            entry: path.resolve('index.ts'),
            name: pascalCase(name),
            fileName: name,
        },
        rollupOptions: {
            external: ['vue'],
            output: {
                globals: {
                    vue: 'Vue'
                },
            }
        },
        watch: !process.env.NODE_ENV && {
            include: [
                './tailwindcss/**/*.js'
            ]
        }
    },
    plugins: [
        vue(),
        dts()
    ],
});
