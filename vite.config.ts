import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/

export default {
  server: {
    port: 5173, // For local development
  },
  preview: {
    port: 8081, // For production preview
  },
};