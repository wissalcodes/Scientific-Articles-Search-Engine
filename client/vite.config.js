import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/auth/signup": "http://localhost:5000", // Proxy API requests to another server
      "/search_articles": "http://127.0.0.1:5000", // Proxy API requests to another server
      "/articles_index": "http://localhost:9200", // Proxy API requests to another server
    },
  },
  plugins: [react()],
});
