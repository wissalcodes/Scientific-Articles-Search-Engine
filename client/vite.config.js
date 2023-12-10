import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    // proxy: {
    //   "/members": {
    //     target: "http://127.0.0.1:5000",
    //     changeOrigin: true,
    //   },
    // },
  },
  plugins: [react()],
});
