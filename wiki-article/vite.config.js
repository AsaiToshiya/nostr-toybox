import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import { viteSingleFile } from "vite-plugin-singlefile";

export default defineConfig({
  build: {
    commonjsOptions: {
      include: ["nreq.js", "tlv.js", /node_modules/],
    },
  },
  plugins: [nodePolyfills(), viteSingleFile()],
  base: "./",
});
