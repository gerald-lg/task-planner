import { resolve } from "node:path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  base: "/task-planner/",
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "@planner": resolve(__dirname, "src/planner"),
    },
  },
  plugins: [react()],
});
