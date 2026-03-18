import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import { VitePWA } from "vite-plugin-pwa";
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    nodePolyfills(),
    VitePWA({
  registerType: "autoUpdate",
  includeAssets: ["**/*"],
  manifest: {
    name: "iCUT",
    short_name: "iCUT",
    start_url: "/",
    display: "standalone",
    background_color: "#132736",
    theme_color: "#132736",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/mower_logo.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
  },
  workbox: {
    maximumFileSizeToCacheInBytes: 10485760,
    globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
  },
  devOptions: {
    enabled: false,
  },
}),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    watch: {
      usePolling: true,
      interval: 100,
    },
    host: true,
  },
  //#region minified
  build: {
    sourcemap: false,
    minify: "esbuild",
  },
  //#endregion
});
