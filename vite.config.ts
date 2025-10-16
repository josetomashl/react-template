import react from '@vitejs/plugin-react-swc';
import { resolve } from 'node:path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    mode: 'production',
    plugins: [react()],
    resolve: {
      alias: {
        '@': resolve(__dirname, './src')
      }
    },
    build: {
      outDir: 'dist',
      minify: true,
      sourcemap: true,
      manifest: true
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "@/assets/styles/variables" as *;
            @use "@/assets/styles/mixins" as *;
          `
        }
      }
    },
    server: {
      proxy: {
        '/api': {
          target: env.VITE_SERVER_API,
          changeOrigin: true
        }
      }
    }
  };
});
