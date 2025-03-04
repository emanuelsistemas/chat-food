const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Importação de rotas
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');

// Configuração da aplicação
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
// Configuração CORS para permitir todas as origens
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'HEAD', 'PATCH'],
  allowedHeaders: '*',
  credentials: true
}));

// Middleware adicional para CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, HEAD, PATCH');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Forwarded-For, X-Real-IP');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  // Responder imediatamente a requisições OPTIONS
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Diretório de arquivos estáticos
app.use(express.static(path.join(__dirname, '../public')));

// Rotas da API
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Rota de status da API
app.get('/api/status', (req, res) => {
  // Log de debug para headers
  console.log('Headers recebidos:', req.headers);
  
  res.json({ 
    status: 'online', 
    timestamp: new Date(),
    headers: req.headers,
    ip: req.ip || req.connection.remoteAddress
  });
});

// Inicialização do servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
