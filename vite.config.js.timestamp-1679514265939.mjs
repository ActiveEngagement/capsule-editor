// vite.config.js
import vue from "file:///Users/justinkimbrell/Code/capsule-editor/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { pascalCase } from "file:///Users/justinkimbrell/Code/capsule-editor/node_modules/change-case/dist/index.js";
import path from "path";
import { defineConfig } from "file:///Users/justinkimbrell/Code/capsule-editor/node_modules/vite/dist/node/index.js";
import dts from "file:///Users/justinkimbrell/Code/capsule-editor/node_modules/vite-plugin-dts/dist/index.mjs";

// package.json
var package_default = {
  name: "capsule-editor",
  version: "2.0.0-beta.1",
  files: [
    "dist"
  ],
  type: "module",
  main: "./dist/capsule-editor.umd.cjs",
  module: "./dist/capsule-editor.js",
  types: "./dist/index.d.ts",
  exports: {
    ".": {
      import: "./dist/capsule-editor.js",
      require: "./dist/capsule-editor.umd.cjs",
      types: "./dist/index.d.ts"
    },
    "./dist/style.css": "./dist/style.css"
  },
  browserslist: "last 2 versions, > 0.5%, ie >= 11",
  scripts: {
    dev: "vite",
    build: "vite build",
    preview: "vite preview",
    "pre-release": "npm run build; git add . -A; git commit -m 'pre-release commit'",
    "release-prerelease": "npm run build && npm run commit && npm version prerelease --preid beta; npm run release;",
    "release-patch": 'npm run pre-release && npm version patch -m "%s" && npm run release;',
    "release-patch-beta": 'npm run pre-release && npm version patch -m "%s" --preid beta && npm run release;',
    "release-minor": 'npm run pre-release && npm version minor -m "%s" && npm run release;',
    "release-minor-beta": 'npm run pre-release && npm version minor -m "%s" --preid beta && npm run release;',
    "release-major": 'npm run pre-release && npm version major -m "%s" && npm run release;',
    "release-major-beta": 'npm run pre-release && npm version major -m "%s" --preid beta && npm run release;',
    release: "git add . -A; git commit; git push --tags origin; npm publish;"
  },
  peerDependencies: {
    vue: "^3.0.0"
  },
  dependencies: {
    "@codemirror/autocomplete": "^0.19.0",
    "@codemirror/basic-setup": "^0.19.0",
    "@codemirror/closebrackets": "^0.19.0",
    "@codemirror/commands": "^0.19.0",
    "@codemirror/comment": "^0.19.0",
    "@codemirror/fold": "^0.19.0",
    "@codemirror/gutter": "^0.19.0",
    "@codemirror/highlight": "^0.19.0",
    "@codemirror/history": "^0.19.0",
    "@codemirror/lang-css": "^0.19.1",
    "@codemirror/lang-html": "^0.19.1",
    "@codemirror/lang-javascript": "^0.19.1",
    "@codemirror/language": "^0.19.1",
    "@codemirror/lint": "^0.19.1",
    "@codemirror/matchbrackets": "^0.19.1",
    "@codemirror/panel": "^0.19.1",
    "@codemirror/rangeset": "^0.19.1",
    "@codemirror/rectangular-selection": "^0.19.1",
    "@codemirror/search": "^0.19.1",
    "@codemirror/state": "^0.19.1",
    "@codemirror/text": "^0.19.1",
    "@codemirror/tooltip": "^0.19.1",
    "@codemirror/theme-one-dark": "^0.19.0",
    "@codemirror/view": "^0.19.4",
    "@heroicons/vue": "^2.0.13",
    "@vue-interface/animate-css": "^2.0.0-beta.0",
    "@vue-interface/btn": "^3.0.0-beta.0",
    "@vue-interface/btn-activity": "^2.0.0-beta.0",
    "@vue-interface/btn-dropdown": "^2.0.0-beta.0",
    "@vue-interface/form-control": "^1.0.0-beta.0",
    "@vue-interface/slide-deck": "^2.0.0-beta.0",
    "capsule-lint": "^0.2.1"
  },
  devDependencies: {
    "@vitejs/plugin-vue": "^4.0.0",
    "@vue/compiler-sfc": "^3.2.45",
    "@vue/eslint-config-typescript": "^11.0.2",
    autoprefixer: "^10.4.2",
    "change-case": "^4.1.2",
    eslint: "^8.27.0",
    "eslint-plugin-vue": "^9.7.0",
    pascalcase: "^2.0.0",
    postcss: "^8.4.6",
    tailwindcss: "^3.0.18",
    "ts-vue": "^0.1.0",
    typescript: "^4.9.4",
    vite: "^4.0.0",
    "vite-bundle-visualizer": "^0.4.2",
    "vite-plugin-dts": "^1.7.1",
    vue: "^3.2.37"
  }
};

// vite.config.js
var __vite_injected_original_dirname = "/Users/justinkimbrell/Code/capsule-editor";
var fileName = package_default.name;
var external = [
  "@heroicons/vue/24/outline",
  "@heroicons/vue/24/solid",
  "eslint/lib/cli-engine/formatters",
  ...package_default.dependencies ? Object.keys(package_default.dependencies) : [],
  ...package_default.peerDependencies ? Object.keys(package_default.peerDependencies) : []
];
var vite_config_default = ({ command }) => defineConfig({
  build: {
    sourcemap: command === "build",
    lib: {
      entry: path.resolve(__vite_injected_original_dirname, "index.ts"),
      name: pascalCase(fileName),
      fileName
    },
    rollupOptions: {
      external,
      output: {
        globals: external.reduce((carry, dep) => {
          return Object.assign(carry, {
            [dep]: pascalCase(dep)
          });
        }, {})
      }
    },
    watch: !process.env.NODE_ENV && {
      include: [
        "./tailwindcss/**/*.js"
      ]
    }
  },
  plugins: [
    vue(),
    dts()
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiLCAicGFja2FnZS5qc29uIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL2p1c3RpbmtpbWJyZWxsL0NvZGUvY2Fwc3VsZS1lZGl0b3JcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9qdXN0aW5raW1icmVsbC9Db2RlL2NhcHN1bGUtZWRpdG9yL3ZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9qdXN0aW5raW1icmVsbC9Db2RlL2NhcHN1bGUtZWRpdG9yL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnO1xuaW1wb3J0IHsgcGFzY2FsQ2FzZSB9IGZyb20gJ2NoYW5nZS1jYXNlJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgZHRzIGZyb20gJ3ZpdGUtcGx1Z2luLWR0cyc7XG5pbXBvcnQgcGtnIGZyb20gJy4vcGFja2FnZS5qc29uJztcblxuY29uc3QgZmlsZU5hbWUgPSBwa2cubmFtZTtcblxuY29uc3QgZXh0ZXJuYWwgPSBbXG4gICAgJ0BoZXJvaWNvbnMvdnVlLzI0L291dGxpbmUnLFxuICAgICdAaGVyb2ljb25zL3Z1ZS8yNC9zb2xpZCcsXG4gICAgJ2VzbGludC9saWIvY2xpLWVuZ2luZS9mb3JtYXR0ZXJzJyxcbiAgICAuLi4ocGtnLmRlcGVuZGVuY2llcyA/IE9iamVjdC5rZXlzKHBrZy5kZXBlbmRlbmNpZXMpIDogW10pLFxuICAgIC4uLihwa2cucGVlckRlcGVuZGVuY2llcyA/IE9iamVjdC5rZXlzKHBrZy5wZWVyRGVwZW5kZW5jaWVzKSA6IFtdKVxuXTtcblxuZXhwb3J0IGRlZmF1bHQgKHsgY29tbWFuZCB9KSA9PiBkZWZpbmVDb25maWcoe1xuICAgIGJ1aWxkOiB7XG4gICAgICAgIHNvdXJjZW1hcDogY29tbWFuZCA9PT0gJ2J1aWxkJyxcbiAgICAgICAgbGliOiB7XG4gICAgICAgICAgICBlbnRyeTogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ2luZGV4LnRzJyksXG4gICAgICAgICAgICBuYW1lOiBwYXNjYWxDYXNlKGZpbGVOYW1lKSxcbiAgICAgICAgICAgIGZpbGVOYW1lLFxuICAgICAgICB9LFxuICAgICAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICAgICAgICBleHRlcm5hbCxcbiAgICAgICAgICAgIG91dHB1dDoge1xuICAgICAgICAgICAgICAgIGdsb2JhbHM6IGV4dGVybmFsLnJlZHVjZSgoY2FycnksIGRlcCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihjYXJyeSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgW2RlcF06IHBhc2NhbENhc2UoZGVwKVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9LCB7fSksXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHdhdGNoOiAhcHJvY2Vzcy5lbnYuTk9ERV9FTlYgJiYge1xuICAgICAgICAgICAgaW5jbHVkZTogW1xuICAgICAgICAgICAgICAgICcuL3RhaWx3aW5kY3NzLyoqLyouanMnXG4gICAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICB9LFxuICAgIHBsdWdpbnM6IFtcbiAgICAgICAgdnVlKCksXG4gICAgICAgIGR0cygpXG4gICAgXSxcbn0pOyIsICJ7XG4gIFwibmFtZVwiOiBcImNhcHN1bGUtZWRpdG9yXCIsXG4gIFwidmVyc2lvblwiOiBcIjIuMC4wLWJldGEuMVwiLFxuICBcImZpbGVzXCI6IFtcbiAgICBcImRpc3RcIlxuICBdLFxuICBcInR5cGVcIjogXCJtb2R1bGVcIixcbiAgXCJtYWluXCI6IFwiLi9kaXN0L2NhcHN1bGUtZWRpdG9yLnVtZC5janNcIixcbiAgXCJtb2R1bGVcIjogXCIuL2Rpc3QvY2Fwc3VsZS1lZGl0b3IuanNcIixcbiAgXCJ0eXBlc1wiOiBcIi4vZGlzdC9pbmRleC5kLnRzXCIsXG4gIFwiZXhwb3J0c1wiOiB7XG4gICAgXCIuXCI6IHtcbiAgICAgIFwiaW1wb3J0XCI6IFwiLi9kaXN0L2NhcHN1bGUtZWRpdG9yLmpzXCIsXG4gICAgICBcInJlcXVpcmVcIjogXCIuL2Rpc3QvY2Fwc3VsZS1lZGl0b3IudW1kLmNqc1wiLFxuICAgICAgXCJ0eXBlc1wiOiBcIi4vZGlzdC9pbmRleC5kLnRzXCJcbiAgICB9LFxuICAgIFwiLi9kaXN0L3N0eWxlLmNzc1wiOiBcIi4vZGlzdC9zdHlsZS5jc3NcIlxuICB9LFxuICBcImJyb3dzZXJzbGlzdFwiOiBcImxhc3QgMiB2ZXJzaW9ucywgPiAwLjUlLCBpZSA+PSAxMVwiLFxuICBcInNjcmlwdHNcIjoge1xuICAgIFwiZGV2XCI6IFwidml0ZVwiLFxuICAgIFwiYnVpbGRcIjogXCJ2aXRlIGJ1aWxkXCIsXG4gICAgXCJwcmV2aWV3XCI6IFwidml0ZSBwcmV2aWV3XCIsXG4gICAgXCJwcmUtcmVsZWFzZVwiOiBcIm5wbSBydW4gYnVpbGQ7IGdpdCBhZGQgLiAtQTsgZ2l0IGNvbW1pdCAtbSAncHJlLXJlbGVhc2UgY29tbWl0J1wiLFxuICAgIFwicmVsZWFzZS1wcmVyZWxlYXNlXCI6IFwibnBtIHJ1biBidWlsZCAmJiBucG0gcnVuIGNvbW1pdCAmJiBucG0gdmVyc2lvbiBwcmVyZWxlYXNlIC0tcHJlaWQgYmV0YTsgbnBtIHJ1biByZWxlYXNlO1wiLFxuICAgIFwicmVsZWFzZS1wYXRjaFwiOiBcIm5wbSBydW4gcHJlLXJlbGVhc2UgJiYgbnBtIHZlcnNpb24gcGF0Y2ggLW0gXFxcIiVzXFxcIiAmJiBucG0gcnVuIHJlbGVhc2U7XCIsXG4gICAgXCJyZWxlYXNlLXBhdGNoLWJldGFcIjogXCJucG0gcnVuIHByZS1yZWxlYXNlICYmIG5wbSB2ZXJzaW9uIHBhdGNoIC1tIFxcXCIlc1xcXCIgLS1wcmVpZCBiZXRhICYmIG5wbSBydW4gcmVsZWFzZTtcIixcbiAgICBcInJlbGVhc2UtbWlub3JcIjogXCJucG0gcnVuIHByZS1yZWxlYXNlICYmIG5wbSB2ZXJzaW9uIG1pbm9yIC1tIFxcXCIlc1xcXCIgJiYgbnBtIHJ1biByZWxlYXNlO1wiLFxuICAgIFwicmVsZWFzZS1taW5vci1iZXRhXCI6IFwibnBtIHJ1biBwcmUtcmVsZWFzZSAmJiBucG0gdmVyc2lvbiBtaW5vciAtbSBcXFwiJXNcXFwiIC0tcHJlaWQgYmV0YSAmJiBucG0gcnVuIHJlbGVhc2U7XCIsXG4gICAgXCJyZWxlYXNlLW1ham9yXCI6IFwibnBtIHJ1biBwcmUtcmVsZWFzZSAmJiBucG0gdmVyc2lvbiBtYWpvciAtbSBcXFwiJXNcXFwiICYmIG5wbSBydW4gcmVsZWFzZTtcIixcbiAgICBcInJlbGVhc2UtbWFqb3ItYmV0YVwiOiBcIm5wbSBydW4gcHJlLXJlbGVhc2UgJiYgbnBtIHZlcnNpb24gbWFqb3IgLW0gXFxcIiVzXFxcIiAtLXByZWlkIGJldGEgJiYgbnBtIHJ1biByZWxlYXNlO1wiLFxuICAgIFwicmVsZWFzZVwiOiBcImdpdCBhZGQgLiAtQTsgZ2l0IGNvbW1pdDsgZ2l0IHB1c2ggLS10YWdzIG9yaWdpbjsgbnBtIHB1Ymxpc2g7XCJcbiAgfSxcbiAgXCJwZWVyRGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcInZ1ZVwiOiBcIl4zLjAuMFwiXG4gIH0sXG4gIFwiZGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcIkBjb2RlbWlycm9yL2F1dG9jb21wbGV0ZVwiOiBcIl4wLjE5LjBcIixcbiAgICBcIkBjb2RlbWlycm9yL2Jhc2ljLXNldHVwXCI6IFwiXjAuMTkuMFwiLFxuICAgIFwiQGNvZGVtaXJyb3IvY2xvc2VicmFja2V0c1wiOiBcIl4wLjE5LjBcIixcbiAgICBcIkBjb2RlbWlycm9yL2NvbW1hbmRzXCI6IFwiXjAuMTkuMFwiLFxuICAgIFwiQGNvZGVtaXJyb3IvY29tbWVudFwiOiBcIl4wLjE5LjBcIixcbiAgICBcIkBjb2RlbWlycm9yL2ZvbGRcIjogXCJeMC4xOS4wXCIsXG4gICAgXCJAY29kZW1pcnJvci9ndXR0ZXJcIjogXCJeMC4xOS4wXCIsXG4gICAgXCJAY29kZW1pcnJvci9oaWdobGlnaHRcIjogXCJeMC4xOS4wXCIsXG4gICAgXCJAY29kZW1pcnJvci9oaXN0b3J5XCI6IFwiXjAuMTkuMFwiLFxuICAgIFwiQGNvZGVtaXJyb3IvbGFuZy1jc3NcIjogXCJeMC4xOS4xXCIsXG4gICAgXCJAY29kZW1pcnJvci9sYW5nLWh0bWxcIjogXCJeMC4xOS4xXCIsXG4gICAgXCJAY29kZW1pcnJvci9sYW5nLWphdmFzY3JpcHRcIjogXCJeMC4xOS4xXCIsXG4gICAgXCJAY29kZW1pcnJvci9sYW5ndWFnZVwiOiBcIl4wLjE5LjFcIixcbiAgICBcIkBjb2RlbWlycm9yL2xpbnRcIjogXCJeMC4xOS4xXCIsXG4gICAgXCJAY29kZW1pcnJvci9tYXRjaGJyYWNrZXRzXCI6IFwiXjAuMTkuMVwiLFxuICAgIFwiQGNvZGVtaXJyb3IvcGFuZWxcIjogXCJeMC4xOS4xXCIsXG4gICAgXCJAY29kZW1pcnJvci9yYW5nZXNldFwiOiBcIl4wLjE5LjFcIixcbiAgICBcIkBjb2RlbWlycm9yL3JlY3Rhbmd1bGFyLXNlbGVjdGlvblwiOiBcIl4wLjE5LjFcIixcbiAgICBcIkBjb2RlbWlycm9yL3NlYXJjaFwiOiBcIl4wLjE5LjFcIixcbiAgICBcIkBjb2RlbWlycm9yL3N0YXRlXCI6IFwiXjAuMTkuMVwiLFxuICAgIFwiQGNvZGVtaXJyb3IvdGV4dFwiOiBcIl4wLjE5LjFcIixcbiAgICBcIkBjb2RlbWlycm9yL3Rvb2x0aXBcIjogXCJeMC4xOS4xXCIsXG4gICAgXCJAY29kZW1pcnJvci90aGVtZS1vbmUtZGFya1wiOiBcIl4wLjE5LjBcIixcbiAgICBcIkBjb2RlbWlycm9yL3ZpZXdcIjogXCJeMC4xOS40XCIsXG4gICAgXCJAaGVyb2ljb25zL3Z1ZVwiOiBcIl4yLjAuMTNcIixcbiAgICBcIkB2dWUtaW50ZXJmYWNlL2FuaW1hdGUtY3NzXCI6IFwiXjIuMC4wLWJldGEuMFwiLFxuICAgIFwiQHZ1ZS1pbnRlcmZhY2UvYnRuXCI6IFwiXjMuMC4wLWJldGEuMFwiLFxuICAgIFwiQHZ1ZS1pbnRlcmZhY2UvYnRuLWFjdGl2aXR5XCI6IFwiXjIuMC4wLWJldGEuMFwiLFxuICAgIFwiQHZ1ZS1pbnRlcmZhY2UvYnRuLWRyb3Bkb3duXCI6IFwiXjIuMC4wLWJldGEuMFwiLFxuICAgIFwiQHZ1ZS1pbnRlcmZhY2UvZm9ybS1jb250cm9sXCI6IFwiXjEuMC4wLWJldGEuMFwiLFxuICAgIFwiQHZ1ZS1pbnRlcmZhY2Uvc2xpZGUtZGVja1wiOiBcIl4yLjAuMC1iZXRhLjBcIixcbiAgICBcImNhcHN1bGUtbGludFwiOiBcIl4wLjIuMVwiXG4gIH0sXG4gIFwiZGV2RGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcIkB2aXRlanMvcGx1Z2luLXZ1ZVwiOiBcIl40LjAuMFwiLFxuICAgIFwiQHZ1ZS9jb21waWxlci1zZmNcIjogXCJeMy4yLjQ1XCIsXG4gICAgXCJAdnVlL2VzbGludC1jb25maWctdHlwZXNjcmlwdFwiOiBcIl4xMS4wLjJcIixcbiAgICBcImF1dG9wcmVmaXhlclwiOiBcIl4xMC40LjJcIixcbiAgICBcImNoYW5nZS1jYXNlXCI6IFwiXjQuMS4yXCIsXG4gICAgXCJlc2xpbnRcIjogXCJeOC4yNy4wXCIsXG4gICAgXCJlc2xpbnQtcGx1Z2luLXZ1ZVwiOiBcIl45LjcuMFwiLFxuICAgIFwicGFzY2FsY2FzZVwiOiBcIl4yLjAuMFwiLFxuICAgIFwicG9zdGNzc1wiOiBcIl44LjQuNlwiLFxuICAgIFwidGFpbHdpbmRjc3NcIjogXCJeMy4wLjE4XCIsXG4gICAgXCJ0cy12dWVcIjogXCJeMC4xLjBcIixcbiAgICBcInR5cGVzY3JpcHRcIjogXCJeNC45LjRcIixcbiAgICBcInZpdGVcIjogXCJeNC4wLjBcIixcbiAgICBcInZpdGUtYnVuZGxlLXZpc3VhbGl6ZXJcIjogXCJeMC40LjJcIixcbiAgICBcInZpdGUtcGx1Z2luLWR0c1wiOiBcIl4xLjcuMVwiLFxuICAgIFwidnVlXCI6IFwiXjMuMi4zN1wiXG4gIH1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBNlMsT0FBTyxTQUFTO0FBQzdULFNBQVMsa0JBQWtCO0FBQzNCLE9BQU8sVUFBVTtBQUNqQixTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFNBQVM7OztBQ0poQjtBQUFBLEVBQ0UsTUFBUTtBQUFBLEVBQ1IsU0FBVztBQUFBLEVBQ1gsT0FBUztBQUFBLElBQ1A7QUFBQSxFQUNGO0FBQUEsRUFDQSxNQUFRO0FBQUEsRUFDUixNQUFRO0FBQUEsRUFDUixRQUFVO0FBQUEsRUFDVixPQUFTO0FBQUEsRUFDVCxTQUFXO0FBQUEsSUFDVCxLQUFLO0FBQUEsTUFDSCxRQUFVO0FBQUEsTUFDVixTQUFXO0FBQUEsTUFDWCxPQUFTO0FBQUEsSUFDWDtBQUFBLElBQ0Esb0JBQW9CO0FBQUEsRUFDdEI7QUFBQSxFQUNBLGNBQWdCO0FBQUEsRUFDaEIsU0FBVztBQUFBLElBQ1QsS0FBTztBQUFBLElBQ1AsT0FBUztBQUFBLElBQ1QsU0FBVztBQUFBLElBQ1gsZUFBZTtBQUFBLElBQ2Ysc0JBQXNCO0FBQUEsSUFDdEIsaUJBQWlCO0FBQUEsSUFDakIsc0JBQXNCO0FBQUEsSUFDdEIsaUJBQWlCO0FBQUEsSUFDakIsc0JBQXNCO0FBQUEsSUFDdEIsaUJBQWlCO0FBQUEsSUFDakIsc0JBQXNCO0FBQUEsSUFDdEIsU0FBVztBQUFBLEVBQ2I7QUFBQSxFQUNBLGtCQUFvQjtBQUFBLElBQ2xCLEtBQU87QUFBQSxFQUNUO0FBQUEsRUFDQSxjQUFnQjtBQUFBLElBQ2QsNEJBQTRCO0FBQUEsSUFDNUIsMkJBQTJCO0FBQUEsSUFDM0IsNkJBQTZCO0FBQUEsSUFDN0Isd0JBQXdCO0FBQUEsSUFDeEIsdUJBQXVCO0FBQUEsSUFDdkIsb0JBQW9CO0FBQUEsSUFDcEIsc0JBQXNCO0FBQUEsSUFDdEIseUJBQXlCO0FBQUEsSUFDekIsdUJBQXVCO0FBQUEsSUFDdkIsd0JBQXdCO0FBQUEsSUFDeEIseUJBQXlCO0FBQUEsSUFDekIsK0JBQStCO0FBQUEsSUFDL0Isd0JBQXdCO0FBQUEsSUFDeEIsb0JBQW9CO0FBQUEsSUFDcEIsNkJBQTZCO0FBQUEsSUFDN0IscUJBQXFCO0FBQUEsSUFDckIsd0JBQXdCO0FBQUEsSUFDeEIscUNBQXFDO0FBQUEsSUFDckMsc0JBQXNCO0FBQUEsSUFDdEIscUJBQXFCO0FBQUEsSUFDckIsb0JBQW9CO0FBQUEsSUFDcEIsdUJBQXVCO0FBQUEsSUFDdkIsOEJBQThCO0FBQUEsSUFDOUIsb0JBQW9CO0FBQUEsSUFDcEIsa0JBQWtCO0FBQUEsSUFDbEIsOEJBQThCO0FBQUEsSUFDOUIsc0JBQXNCO0FBQUEsSUFDdEIsK0JBQStCO0FBQUEsSUFDL0IsK0JBQStCO0FBQUEsSUFDL0IsK0JBQStCO0FBQUEsSUFDL0IsNkJBQTZCO0FBQUEsSUFDN0IsZ0JBQWdCO0FBQUEsRUFDbEI7QUFBQSxFQUNBLGlCQUFtQjtBQUFBLElBQ2pCLHNCQUFzQjtBQUFBLElBQ3RCLHFCQUFxQjtBQUFBLElBQ3JCLGlDQUFpQztBQUFBLElBQ2pDLGNBQWdCO0FBQUEsSUFDaEIsZUFBZTtBQUFBLElBQ2YsUUFBVTtBQUFBLElBQ1YscUJBQXFCO0FBQUEsSUFDckIsWUFBYztBQUFBLElBQ2QsU0FBVztBQUFBLElBQ1gsYUFBZTtBQUFBLElBQ2YsVUFBVTtBQUFBLElBQ1YsWUFBYztBQUFBLElBQ2QsTUFBUTtBQUFBLElBQ1IsMEJBQTBCO0FBQUEsSUFDMUIsbUJBQW1CO0FBQUEsSUFDbkIsS0FBTztBQUFBLEVBQ1Q7QUFDRjs7O0FEeEZBLElBQU0sbUNBQW1DO0FBT3pDLElBQU0sV0FBVyxnQkFBSTtBQUVyQixJQUFNLFdBQVc7QUFBQSxFQUNiO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBLEdBQUksZ0JBQUksZUFBZSxPQUFPLEtBQUssZ0JBQUksWUFBWSxJQUFJLENBQUM7QUFBQSxFQUN4RCxHQUFJLGdCQUFJLG1CQUFtQixPQUFPLEtBQUssZ0JBQUksZ0JBQWdCLElBQUksQ0FBQztBQUNwRTtBQUVBLElBQU8sc0JBQVEsQ0FBQyxFQUFFLFFBQVEsTUFBTSxhQUFhO0FBQUEsRUFDekMsT0FBTztBQUFBLElBQ0gsV0FBVyxZQUFZO0FBQUEsSUFDdkIsS0FBSztBQUFBLE1BQ0QsT0FBTyxLQUFLLFFBQVEsa0NBQVcsVUFBVTtBQUFBLE1BQ3pDLE1BQU0sV0FBVyxRQUFRO0FBQUEsTUFDekI7QUFBQSxJQUNKO0FBQUEsSUFDQSxlQUFlO0FBQUEsTUFDWDtBQUFBLE1BQ0EsUUFBUTtBQUFBLFFBQ0osU0FBUyxTQUFTLE9BQU8sQ0FBQyxPQUFPLFFBQVE7QUFDckMsaUJBQU8sT0FBTyxPQUFPLE9BQU87QUFBQSxZQUN4QixDQUFDLEdBQUcsR0FBRyxXQUFXLEdBQUc7QUFBQSxVQUN6QixDQUFDO0FBQUEsUUFDTCxHQUFHLENBQUMsQ0FBQztBQUFBLE1BQ1Q7QUFBQSxJQUNKO0FBQUEsSUFDQSxPQUFPLENBQUMsUUFBUSxJQUFJLFlBQVk7QUFBQSxNQUM1QixTQUFTO0FBQUEsUUFDTDtBQUFBLE1BQ0o7QUFBQSxJQUNKO0FBQUEsRUFDSjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ0wsSUFBSTtBQUFBLElBQ0osSUFBSTtBQUFBLEVBQ1I7QUFDSixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
