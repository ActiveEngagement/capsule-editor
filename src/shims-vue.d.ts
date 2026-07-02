// Zed's TypeScript server (vtsls) does not load @vue/typescript-plugin, so .ts
// files cannot resolve `.vue` imports without this ambient declaration.
// See https://github.com/zed-industries/zed/issues/18914 (closed as not-planned).
//
// Note: `vue-tsc` ignores this shim and type-checks `.vue` files with full
// precision, so the build/CI type-check is unaffected. Editors that load the
// Vue TS plugin (e.g. VS Code + Volar) also don't need this and get real types.
declare module '*.vue' {
    import type { DefineComponent } from 'vue';

    const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, unknown>;

    export default component;
}
