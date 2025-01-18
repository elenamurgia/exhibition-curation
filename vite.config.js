import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            "/rijksmuseum": {
                target: "https://www.rijksmuseum.nl/api/en/collection",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/rijksmuseum/, ""),
            },
        },
    },
});
