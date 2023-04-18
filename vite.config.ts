import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

function resolve(dir) {
  return path.join(__dirname, ".", dir);
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      less: {
        // javascriptEnabled: true,
        additionalData:`@import "src/styles/index.less";`,
      },
    },
  },
  resolve: {
    alias: {
      "@": resolve("src"),
      static: resolve("public/static"),
    },
  },
});
