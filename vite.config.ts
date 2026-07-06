import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  // GitHub Pages deploys to /octo-portfolio/ base path unless a custom domain is used.
  // This automatically handles the base path during the GitHub Actions build.
  base: process.env.GITHUB_ACTIONS ? "/octo-portfolio/" : "/",
});
