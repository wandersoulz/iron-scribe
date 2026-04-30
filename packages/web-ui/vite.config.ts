import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@iron-scribe/model": path.resolve(__dirname, "../model/src/index.ts"),
      "@iron-scribe/data/ancestries": path.resolve(
        __dirname,
        "../data/src/ancestries/core/index.ts",
      ),
      "@iron-scribe/data/skills": path.resolve(
        __dirname,
        "../data/src/skills/core/skills.ts",
      ),
      "@iron-scribe/data/rules/damage": path.resolve(
        __dirname,
        "../data/src/rules/damage.ts",
      ),
      "@iron-scribe/data": path.resolve(__dirname, "../data/src/index.ts"),
      "@iron-scribe/ui-shared": path.resolve(
        __dirname,
        "../ui-shared/src/index.ts",
      ),
      "react-native": "react-native-web",
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("/data/src/raw/core/ancestries/")) {
            return "data-core-ancestries";
          }
          if (id.includes("/data/src/skills/")) {
            return "data-skills";
          }
          if (id.includes("/data/src/raw/rules/")) {
            return "data-raw-rules";
          }
          if (id.includes("/data/src/raw/core/classes/")) {
            return "data-core-classes";
          }
        },
      },
    },
  },
});
