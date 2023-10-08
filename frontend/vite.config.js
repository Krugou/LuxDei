import react from '@vitejs/plugin-react-swc';
import {defineConfig} from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    minify: true,
    terserOptions: {
      compress: {
        // drop_console: true,
      },
      format: {
        comments: false,
      },
    },
  },
});