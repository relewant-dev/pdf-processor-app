import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'shell',
      remotes: {
        chatMf: 'http://localhost:5174/assets/remoteEntry.js',
        sidebarMf: 'http://localhost:5175/assets/remoteEntry.js'
      },
      shared: ['react', 'react-dom']
    })
  ]
});
