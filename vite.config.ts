import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "/Settl-React-PWA/",
  plugins: [
    react(),
    tsconfigPaths(),
    VitePWA({
      manifest: {
        short_name: "React App",
        name: "Settl",
        icons: [
          {
            src: "settl icon.png",
            sizes: "64x64 32x32 24x24 16x16",
            type: "image/png",
          },
          {
            src: "settl icon.png",
            type: "image/png",
            sizes: "192x192",
          },
          {
            src: "settl icon.png",
            type: "image/png",
            sizes: "512x512",
          },
        ],
        start_url: "/Settl-React-PWA/",
        display: "standalone",
        theme_color: "#000000",
        background_color: "#ffffff",
      },
      registerType: "autoUpdate",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
        maximumFileSizeToCacheInBytes: 10 * 1024 * 1024, // 10 MB
      },
    }),
  ],
  css: {
    postcss: {
      plugins: [tailwindcss(), autoprefixer()],
    },
  },
  server: {
    open: true,
  },
  build: {
    outDir: "dist",
  },
});
