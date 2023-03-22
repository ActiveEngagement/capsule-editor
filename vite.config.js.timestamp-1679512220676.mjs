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
    "@codemirror/basic-setup": "^0.19.0",
    "@codemirror/lang-html": "^0.19.1",
    "@codemirror/panel": "^0.19.0",
    "@codemirror/state": "^0.19.1",
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
  ...package_default.dependencies ? Object.keys(package_default.dependencies) : [],
  ...package_default.peerDependencies ? Object.keys(package_default.peerDependencies) : []
];
console.log(external);
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiLCAicGFja2FnZS5qc29uIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL2p1c3RpbmtpbWJyZWxsL0NvZGUvY2Fwc3VsZS1lZGl0b3JcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9qdXN0aW5raW1icmVsbC9Db2RlL2NhcHN1bGUtZWRpdG9yL3ZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9qdXN0aW5raW1icmVsbC9Db2RlL2NhcHN1bGUtZWRpdG9yL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnO1xuaW1wb3J0IHsgcGFzY2FsQ2FzZSB9IGZyb20gJ2NoYW5nZS1jYXNlJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgZHRzIGZyb20gJ3ZpdGUtcGx1Z2luLWR0cyc7XG5pbXBvcnQgcGtnIGZyb20gJy4vcGFja2FnZS5qc29uJztcblxuY29uc3QgZmlsZU5hbWUgPSBwa2cubmFtZTtcblxuY29uc3QgZXh0ZXJuYWwgPSBbXG4gICAgLi4uKHBrZy5kZXBlbmRlbmNpZXMgPyBPYmplY3Qua2V5cyhwa2cuZGVwZW5kZW5jaWVzKSA6IFtdKSxcbiAgICAuLi4ocGtnLnBlZXJEZXBlbmRlbmNpZXMgPyBPYmplY3Qua2V5cyhwa2cucGVlckRlcGVuZGVuY2llcykgOiBbXSlcbl07XG5cbmNvbnNvbGUubG9nKGV4dGVybmFsKTtcblxuZXhwb3J0IGRlZmF1bHQgKHsgY29tbWFuZCB9KSA9PiBkZWZpbmVDb25maWcoe1xuICAgIGJ1aWxkOiB7XG4gICAgICAgIHNvdXJjZW1hcDogY29tbWFuZCA9PT0gJ2J1aWxkJyxcbiAgICAgICAgbGliOiB7XG4gICAgICAgICAgICBlbnRyeTogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ2luZGV4LnRzJyksXG4gICAgICAgICAgICBuYW1lOiBwYXNjYWxDYXNlKGZpbGVOYW1lKSxcbiAgICAgICAgICAgIGZpbGVOYW1lLFxuICAgICAgICB9LFxuICAgICAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICAgICAgICBleHRlcm5hbCxcbiAgICAgICAgICAgIG91dHB1dDoge1xuICAgICAgICAgICAgICAgIGdsb2JhbHM6IGV4dGVybmFsLnJlZHVjZSgoY2FycnksIGRlcCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihjYXJyeSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgW2RlcF06IHBhc2NhbENhc2UoZGVwKVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9LCB7fSksXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHdhdGNoOiAhcHJvY2Vzcy5lbnYuTk9ERV9FTlYgJiYge1xuICAgICAgICAgICAgaW5jbHVkZTogW1xuICAgICAgICAgICAgICAgICcuL3RhaWx3aW5kY3NzLyoqLyouanMnXG4gICAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICB9LFxuICAgIHBsdWdpbnM6IFtcbiAgICAgICAgdnVlKCksXG4gICAgICAgIGR0cygpXG4gICAgXSxcbn0pOyIsICJ7XG4gIFwibmFtZVwiOiBcImNhcHN1bGUtZWRpdG9yXCIsXG4gIFwidmVyc2lvblwiOiBcIjIuMC4wLWJldGEuMVwiLFxuICBcImZpbGVzXCI6IFtcbiAgICBcImRpc3RcIlxuICBdLFxuICBcInR5cGVcIjogXCJtb2R1bGVcIixcbiAgXCJtYWluXCI6IFwiLi9kaXN0L2NhcHN1bGUtZWRpdG9yLnVtZC5janNcIixcbiAgXCJtb2R1bGVcIjogXCIuL2Rpc3QvY2Fwc3VsZS1lZGl0b3IuanNcIixcbiAgXCJ0eXBlc1wiOiBcIi4vZGlzdC9pbmRleC5kLnRzXCIsXG4gIFwiZXhwb3J0c1wiOiB7XG4gICAgXCIuXCI6IHtcbiAgICAgIFwiaW1wb3J0XCI6IFwiLi9kaXN0L2NhcHN1bGUtZWRpdG9yLmpzXCIsXG4gICAgICBcInJlcXVpcmVcIjogXCIuL2Rpc3QvY2Fwc3VsZS1lZGl0b3IudW1kLmNqc1wiLFxuICAgICAgXCJ0eXBlc1wiOiBcIi4vZGlzdC9pbmRleC5kLnRzXCJcbiAgICB9LFxuICAgIFwiLi9kaXN0L3N0eWxlLmNzc1wiOiBcIi4vZGlzdC9zdHlsZS5jc3NcIlxuICB9LFxuICBcImJyb3dzZXJzbGlzdFwiOiBcImxhc3QgMiB2ZXJzaW9ucywgPiAwLjUlLCBpZSA+PSAxMVwiLFxuICBcInNjcmlwdHNcIjoge1xuICAgIFwiZGV2XCI6IFwidml0ZVwiLFxuICAgIFwiYnVpbGRcIjogXCJ2aXRlIGJ1aWxkXCIsXG4gICAgXCJwcmV2aWV3XCI6IFwidml0ZSBwcmV2aWV3XCIsXG4gICAgXCJwcmUtcmVsZWFzZVwiOiBcIm5wbSBydW4gYnVpbGQ7IGdpdCBhZGQgLiAtQTsgZ2l0IGNvbW1pdCAtbSAncHJlLXJlbGVhc2UgY29tbWl0J1wiLFxuICAgIFwicmVsZWFzZS1wcmVyZWxlYXNlXCI6IFwibnBtIHJ1biBidWlsZCAmJiBucG0gcnVuIGNvbW1pdCAmJiBucG0gdmVyc2lvbiBwcmVyZWxlYXNlIC0tcHJlaWQgYmV0YTsgbnBtIHJ1biByZWxlYXNlO1wiLFxuICAgIFwicmVsZWFzZS1wYXRjaFwiOiBcIm5wbSBydW4gcHJlLXJlbGVhc2UgJiYgbnBtIHZlcnNpb24gcGF0Y2ggLW0gXFxcIiVzXFxcIiAmJiBucG0gcnVuIHJlbGVhc2U7XCIsXG4gICAgXCJyZWxlYXNlLXBhdGNoLWJldGFcIjogXCJucG0gcnVuIHByZS1yZWxlYXNlICYmIG5wbSB2ZXJzaW9uIHBhdGNoIC1tIFxcXCIlc1xcXCIgLS1wcmVpZCBiZXRhICYmIG5wbSBydW4gcmVsZWFzZTtcIixcbiAgICBcInJlbGVhc2UtbWlub3JcIjogXCJucG0gcnVuIHByZS1yZWxlYXNlICYmIG5wbSB2ZXJzaW9uIG1pbm9yIC1tIFxcXCIlc1xcXCIgJiYgbnBtIHJ1biByZWxlYXNlO1wiLFxuICAgIFwicmVsZWFzZS1taW5vci1iZXRhXCI6IFwibnBtIHJ1biBwcmUtcmVsZWFzZSAmJiBucG0gdmVyc2lvbiBtaW5vciAtbSBcXFwiJXNcXFwiIC0tcHJlaWQgYmV0YSAmJiBucG0gcnVuIHJlbGVhc2U7XCIsXG4gICAgXCJyZWxlYXNlLW1ham9yXCI6IFwibnBtIHJ1biBwcmUtcmVsZWFzZSAmJiBucG0gdmVyc2lvbiBtYWpvciAtbSBcXFwiJXNcXFwiICYmIG5wbSBydW4gcmVsZWFzZTtcIixcbiAgICBcInJlbGVhc2UtbWFqb3ItYmV0YVwiOiBcIm5wbSBydW4gcHJlLXJlbGVhc2UgJiYgbnBtIHZlcnNpb24gbWFqb3IgLW0gXFxcIiVzXFxcIiAtLXByZWlkIGJldGEgJiYgbnBtIHJ1biByZWxlYXNlO1wiLFxuICAgIFwicmVsZWFzZVwiOiBcImdpdCBhZGQgLiAtQTsgZ2l0IGNvbW1pdDsgZ2l0IHB1c2ggLS10YWdzIG9yaWdpbjsgbnBtIHB1Ymxpc2g7XCJcbiAgfSxcbiAgXCJwZWVyRGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcInZ1ZVwiOiBcIl4zLjAuMFwiXG4gIH0sXG4gIFwiZGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcIkBjb2RlbWlycm9yL2Jhc2ljLXNldHVwXCI6IFwiXjAuMTkuMFwiLFxuICAgIFwiQGNvZGVtaXJyb3IvbGFuZy1odG1sXCI6IFwiXjAuMTkuMVwiLFxuICAgIFwiQGNvZGVtaXJyb3IvcGFuZWxcIjogXCJeMC4xOS4wXCIsXG4gICAgXCJAY29kZW1pcnJvci9zdGF0ZVwiOiBcIl4wLjE5LjFcIixcbiAgICBcIkBjb2RlbWlycm9yL3RoZW1lLW9uZS1kYXJrXCI6IFwiXjAuMTkuMFwiLFxuICAgIFwiQGNvZGVtaXJyb3Ivdmlld1wiOiBcIl4wLjE5LjRcIixcbiAgICBcIkBoZXJvaWNvbnMvdnVlXCI6IFwiXjIuMC4xM1wiLFxuICAgIFwiQHZ1ZS1pbnRlcmZhY2UvYW5pbWF0ZS1jc3NcIjogXCJeMi4wLjAtYmV0YS4wXCIsXG4gICAgXCJAdnVlLWludGVyZmFjZS9idG5cIjogXCJeMy4wLjAtYmV0YS4wXCIsXG4gICAgXCJAdnVlLWludGVyZmFjZS9idG4tYWN0aXZpdHlcIjogXCJeMi4wLjAtYmV0YS4wXCIsXG4gICAgXCJAdnVlLWludGVyZmFjZS9idG4tZHJvcGRvd25cIjogXCJeMi4wLjAtYmV0YS4wXCIsXG4gICAgXCJAdnVlLWludGVyZmFjZS9mb3JtLWNvbnRyb2xcIjogXCJeMS4wLjAtYmV0YS4wXCIsXG4gICAgXCJAdnVlLWludGVyZmFjZS9zbGlkZS1kZWNrXCI6IFwiXjIuMC4wLWJldGEuMFwiLFxuICAgIFwiY2Fwc3VsZS1saW50XCI6IFwiXjAuMi4xXCJcbiAgfSxcbiAgXCJkZXZEZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiQHZpdGVqcy9wbHVnaW4tdnVlXCI6IFwiXjQuMC4wXCIsXG4gICAgXCJAdnVlL2NvbXBpbGVyLXNmY1wiOiBcIl4zLjIuNDVcIixcbiAgICBcIkB2dWUvZXNsaW50LWNvbmZpZy10eXBlc2NyaXB0XCI6IFwiXjExLjAuMlwiLFxuICAgIFwiYXV0b3ByZWZpeGVyXCI6IFwiXjEwLjQuMlwiLFxuICAgIFwiY2hhbmdlLWNhc2VcIjogXCJeNC4xLjJcIixcbiAgICBcImVzbGludFwiOiBcIl44LjI3LjBcIixcbiAgICBcImVzbGludC1wbHVnaW4tdnVlXCI6IFwiXjkuNy4wXCIsXG4gICAgXCJwYXNjYWxjYXNlXCI6IFwiXjIuMC4wXCIsXG4gICAgXCJwb3N0Y3NzXCI6IFwiXjguNC42XCIsXG4gICAgXCJ0YWlsd2luZGNzc1wiOiBcIl4zLjAuMThcIixcbiAgICBcInRzLXZ1ZVwiOiBcIl4wLjEuMFwiLFxuICAgIFwidHlwZXNjcmlwdFwiOiBcIl40LjkuNFwiLFxuICAgIFwidml0ZVwiOiBcIl40LjAuMFwiLFxuICAgIFwidml0ZS1idW5kbGUtdmlzdWFsaXplclwiOiBcIl4wLjQuMlwiLFxuICAgIFwidml0ZS1wbHVnaW4tZHRzXCI6IFwiXjEuNy4xXCIsXG4gICAgXCJ2dWVcIjogXCJeMy4yLjM3XCJcbiAgfVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE2UyxPQUFPLFNBQVM7QUFDN1QsU0FBUyxrQkFBa0I7QUFDM0IsT0FBTyxVQUFVO0FBQ2pCLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sU0FBUzs7O0FDSmhCO0FBQUEsRUFDRSxNQUFRO0FBQUEsRUFDUixTQUFXO0FBQUEsRUFDWCxPQUFTO0FBQUEsSUFDUDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLE1BQVE7QUFBQSxFQUNSLE1BQVE7QUFBQSxFQUNSLFFBQVU7QUFBQSxFQUNWLE9BQVM7QUFBQSxFQUNULFNBQVc7QUFBQSxJQUNULEtBQUs7QUFBQSxNQUNILFFBQVU7QUFBQSxNQUNWLFNBQVc7QUFBQSxNQUNYLE9BQVM7QUFBQSxJQUNYO0FBQUEsSUFDQSxvQkFBb0I7QUFBQSxFQUN0QjtBQUFBLEVBQ0EsY0FBZ0I7QUFBQSxFQUNoQixTQUFXO0FBQUEsSUFDVCxLQUFPO0FBQUEsSUFDUCxPQUFTO0FBQUEsSUFDVCxTQUFXO0FBQUEsSUFDWCxlQUFlO0FBQUEsSUFDZixzQkFBc0I7QUFBQSxJQUN0QixpQkFBaUI7QUFBQSxJQUNqQixzQkFBc0I7QUFBQSxJQUN0QixpQkFBaUI7QUFBQSxJQUNqQixzQkFBc0I7QUFBQSxJQUN0QixpQkFBaUI7QUFBQSxJQUNqQixzQkFBc0I7QUFBQSxJQUN0QixTQUFXO0FBQUEsRUFDYjtBQUFBLEVBQ0Esa0JBQW9CO0FBQUEsSUFDbEIsS0FBTztBQUFBLEVBQ1Q7QUFBQSxFQUNBLGNBQWdCO0FBQUEsSUFDZCwyQkFBMkI7QUFBQSxJQUMzQix5QkFBeUI7QUFBQSxJQUN6QixxQkFBcUI7QUFBQSxJQUNyQixxQkFBcUI7QUFBQSxJQUNyQiw4QkFBOEI7QUFBQSxJQUM5QixvQkFBb0I7QUFBQSxJQUNwQixrQkFBa0I7QUFBQSxJQUNsQiw4QkFBOEI7QUFBQSxJQUM5QixzQkFBc0I7QUFBQSxJQUN0QiwrQkFBK0I7QUFBQSxJQUMvQiwrQkFBK0I7QUFBQSxJQUMvQiwrQkFBK0I7QUFBQSxJQUMvQiw2QkFBNkI7QUFBQSxJQUM3QixnQkFBZ0I7QUFBQSxFQUNsQjtBQUFBLEVBQ0EsaUJBQW1CO0FBQUEsSUFDakIsc0JBQXNCO0FBQUEsSUFDdEIscUJBQXFCO0FBQUEsSUFDckIsaUNBQWlDO0FBQUEsSUFDakMsY0FBZ0I7QUFBQSxJQUNoQixlQUFlO0FBQUEsSUFDZixRQUFVO0FBQUEsSUFDVixxQkFBcUI7QUFBQSxJQUNyQixZQUFjO0FBQUEsSUFDZCxTQUFXO0FBQUEsSUFDWCxhQUFlO0FBQUEsSUFDZixVQUFVO0FBQUEsSUFDVixZQUFjO0FBQUEsSUFDZCxNQUFRO0FBQUEsSUFDUiwwQkFBMEI7QUFBQSxJQUMxQixtQkFBbUI7QUFBQSxJQUNuQixLQUFPO0FBQUEsRUFDVDtBQUNGOzs7QUR0RUEsSUFBTSxtQ0FBbUM7QUFPekMsSUFBTSxXQUFXLGdCQUFJO0FBRXJCLElBQU0sV0FBVztBQUFBLEVBQ2IsR0FBSSxnQkFBSSxlQUFlLE9BQU8sS0FBSyxnQkFBSSxZQUFZLElBQUksQ0FBQztBQUFBLEVBQ3hELEdBQUksZ0JBQUksbUJBQW1CLE9BQU8sS0FBSyxnQkFBSSxnQkFBZ0IsSUFBSSxDQUFDO0FBQ3BFO0FBRUEsUUFBUSxJQUFJLFFBQVE7QUFFcEIsSUFBTyxzQkFBUSxDQUFDLEVBQUUsUUFBUSxNQUFNLGFBQWE7QUFBQSxFQUN6QyxPQUFPO0FBQUEsSUFDSCxXQUFXLFlBQVk7QUFBQSxJQUN2QixLQUFLO0FBQUEsTUFDRCxPQUFPLEtBQUssUUFBUSxrQ0FBVyxVQUFVO0FBQUEsTUFDekMsTUFBTSxXQUFXLFFBQVE7QUFBQSxNQUN6QjtBQUFBLElBQ0o7QUFBQSxJQUNBLGVBQWU7QUFBQSxNQUNYO0FBQUEsTUFDQSxRQUFRO0FBQUEsUUFDSixTQUFTLFNBQVMsT0FBTyxDQUFDLE9BQU8sUUFBUTtBQUNyQyxpQkFBTyxPQUFPLE9BQU8sT0FBTztBQUFBLFlBQ3hCLENBQUMsR0FBRyxHQUFHLFdBQVcsR0FBRztBQUFBLFVBQ3pCLENBQUM7QUFBQSxRQUNMLEdBQUcsQ0FBQyxDQUFDO0FBQUEsTUFDVDtBQUFBLElBQ0o7QUFBQSxJQUNBLE9BQU8sQ0FBQyxRQUFRLElBQUksWUFBWTtBQUFBLE1BQzVCLFNBQVM7QUFBQSxRQUNMO0FBQUEsTUFDSjtBQUFBLElBQ0o7QUFBQSxFQUNKO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDTCxJQUFJO0FBQUEsSUFDSixJQUFJO0FBQUEsRUFDUjtBQUNKLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
