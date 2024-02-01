import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/auth/signup": "http://localhost:5000", // Proxy API requests to another server
      "/forgot_password/reset_password_verified": "http://localhost:5000", // Proxy API requests to another server
    },
  },
  plugins: [react()],
});
