import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3001,
    proxy: {
      // "/": {
      //   target: "http://localhost:3000/",
      //   changeOrigin: true,
      // },
      "/admin": {
        target: "http://localhost:3000/",
        changeOrigin: true,
      },
      "/admin/register": {
        target: "http://localhost:3000/",
        changeOrigin: true,
      },
      "/admin-products": {
        target: "http://localhost:3000/",
        changeOrigin: true,
      },
      "/user": {
        target: "http://localhost:3000/",
        changeOrigin: true,
      },
      "/user/product": {
        target: "http://localhost:3000/",
        changeOrigin: true,
      },
    },
  },
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
