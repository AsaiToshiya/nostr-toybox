import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig({
  build: {
    commonjsOptions: {
      include: ["nreq.js", "tlv.js", /node_modules/],
    },
  },
  plugins: [nodePolyfills()],
  base: "./",
});
