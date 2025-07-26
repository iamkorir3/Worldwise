import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";

export default defineConfig({
  plugins: [
    react(),
    eslint({
      overrideConfig: {
        rules: {
          "react/prop-types": "off", // This is the correct way now
        },
      },
    }),
  ],
});
