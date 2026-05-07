import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  build: {
    target: 'esnext'
  },
  plugins: [
    react(),
    federation({
      name: 'chatMf',
      filename: 'remoteEntry.js',
      exposes: { './ChatApp': './src/ChatApp.tsx' },
      shared: ['react', 'react-dom']
    })
  ]
});
