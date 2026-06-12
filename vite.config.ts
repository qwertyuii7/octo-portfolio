import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // GitHub Pages deploys to /octo-portfolio/ base path unless a custom domain is used.
  // This automatically handles the base path during the GitHub Actions build.
  base: process.env.GITHUB_ACTIONS ? "/octo-portfolio/" : "/",
});
