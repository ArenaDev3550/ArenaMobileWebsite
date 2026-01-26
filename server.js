import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();

const allowedOrigins = [
  'https://meufrontend.com',
  'http://localhost', // Seu servidor backend
  'http://localhost:8000', // Seu servidor backend
  'http://localhost:5173' // Para desenvolvimento
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Origem não permitida pelo CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.get('/api/educamobile/proxy', async (req, res) => {
  try {
    const path = req.query.path || '';
    const targetUrl = `https://educamobile.colegioarena.com.br/${path}`;
    // Constrói a string de cookies a partir dos parâmetros
    const cookieString = Object.entries(req.query)
      .map(([key, value]) => `${key}=${value}`)
      .join('; ');

    const response = await axios.get(targetUrl, {
      headers: {
        'Cookie': cookieString,
        'User-Agent': 'Mozilla/4.0 (compatible; MSIE 6.0; Windows CE; IEMobile 8.12; MSIEMobile 6.0)',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'pt-BR,pt;q=0.8,en-US;q=0.5,en;q=0.3',
      },
    });

    res.send(response.data);
  } catch (error) {
    console.error('Erro proxy:', error);
    res.status(500).send(error.message);
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});