import { defineConfig } from 'vite'; import react from '@vitejs/plugin-react'; import federation from '@originjs/vite-plugin-federation';
export default defineConfig({ plugins:[react(), federation({ name:'sidebarMf', filename:'remoteEntry.js', exposes:{ './SidebarApp':'./src/SidebarApp.tsx' }, shared:['react','react-dom'] })] });
