import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/auth/signup": "http://localhost:5000", // Proxy API requests to another server
      "/user_dashboard/my_profile/change_infos": "http://localhost:5000",
    },
  },
  plugins: [react()],
});
