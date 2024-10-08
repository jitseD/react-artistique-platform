import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  site: 'https://www.jitsedekeyser.be',
  base: '/devine/react-artistique-platform',
  plugins: [react()],
})
