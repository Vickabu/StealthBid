import { defineConfig } from "vite";
import { resolve } from "vite";

export default defineConfig({
  appType: "mpa",
  base: "",
  build: {
    target: "esnext",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "./index.html"),
        profile: resolve(__dirname, "./profile/index.html"),
        listing: resolve(__dirname, "./listing/index.html"),
        createListing: resolve(__dirname, "./listing/create.html"),
      },
    },
  },
});
