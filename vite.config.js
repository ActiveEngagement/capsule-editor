import path from 'path';
import { defineConfig } from 'vite';
import { createVuePlugin } from 'vite-plugin-vue2';
import { name as filename } from './package.json';
import { pascalCase } from "change-case";
import { babel } from '@rollup/plugin-babel';

export default defineConfig({
    build: {
        lib: {
            entry: path.resolve(__dirname, 'index.js'),
            name: filename,
            fileName: (format) => `${filename}.${format}.js`,
        },
        rollupOptions: {
            external: ['vue'],
            output: {
                assetFileNames: ({ name }) => {
                    console.log(name);
                    if(name === 'style.css') {
                        return `${filename}.css`;
                    }
    
                    return name;
                },
                globals: {
                    vue: 'Vue'
                },
            },
            plugins: [
                babel({
                    babelHelpers: 'bundled'
                })
            ]
        },
        watch: !process.env.NODE_ENV && {
            include: [
                './tailwindcss/**/*.js'
            ]
        }
    },
    plugins: [
        createVuePlugin()
    ],
});
