import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig({
  optimizeDeps: {
    include: ["nip49.js"],
  },
  build: {
    commonjsOptions: {
      include: ["nip49.js", /node_modules/],
    },
  },
  plugins: [nodePolyfills()],
});
