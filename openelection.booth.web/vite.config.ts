import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import {readCertificate} from "./aspnetcore-https.ts";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react({
            babel: {
                plugins: [['babel-plugin-react-compiler']],
            },
        }),
        tailwindcss(),
    ],
    server: {
        https: readCertificate(),
        host: '0.0.0.0',
        port: 49494,
        proxy: {
            '/api': 'http://localhost:5150',
            '/hubs': {
                target: 'http://localhost:5150',
                ws: true
            }
        }
    }
})
