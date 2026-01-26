import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/educamobile': {
        target: 'https://educamobile.colegioarena.com.br',
        changeOrigin: true,
        secure: false,
        configure: (proxy, _options) => {
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            // Adiciona os cookies no servidor proxy em vez de no cliente
            proxyReq.setHeader('Cookie', req.headers.cookie || '');
            // Configura o User-Agent no servidor proxy
            proxyReq.setHeader('User-Agent', 'Mozilla/4.0 (compatible; MSIE 6.0; Windows CE; IEMobile 8.12; MSIEMobile 6.0)');
          });
        },
      },
    },
  },
})
