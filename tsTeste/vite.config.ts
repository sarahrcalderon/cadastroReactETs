import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src',  
  build: {
    outDir: '../dist',  
    rollupOptions: {
      input: {
        main: 'src/main.ts',  
      },
    },
  },
  server: {
    port: 5173,  
  },
});
