// Purpose: Vite configuration file for the client side of the application
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/graphql": {
        target: "http://localhost:3001",
        changeOrigin: true,
        secure: false,
      },
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
