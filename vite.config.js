import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      "/auth": {
        target: "http://3.37.58.77:8080",
        changeOrigin: true,
      },
    },
  },
});
