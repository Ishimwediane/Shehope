import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),  // Tailwind CSS support
    react(),        // React plugin support
  ],
  base: "/Shehope/", // Base path for GitHub Pages deployment
});
