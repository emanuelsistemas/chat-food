// Exemplo de servidor HTTP nativo em Node.js
const http = require('http');

// Criar um servidor HTTP simples
const server = http.createServer((req, res) => {
  // Definir cabeçalhos de resposta
  res.writeHead(200, {'Content-Type': 'text/html'});
  
  // Enviar uma resposta HTML simples
  res.end(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Servidor HTTP Nativo do Node.js</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          line-height: 1.6;
        }
        .container {
          background-color: #f5f5f5;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        h1 { color: #333; }
        .info { color: #0066cc; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Servidor HTTP Nativo do Node.js</h1>
        <p>Este é um exemplo simples de um servidor web criado usando apenas o módulo HTTP nativo do Node.js.</p>
        <p>Informações da requisição:</p>
        <ul class="info">
          <li><strong>URL:</strong> ${req.url}</li>
          <li><strong>Método:</strong> ${req.method}</li>
          <li><strong>Data/Hora:</strong> ${new Date().toLocaleString()}</li>
        </ul>
        <p>O módulo HTTP é integrado ao Node.js e não requer instalação de pacotes externos.</p>
      </div>
    </body>
    </html>
  `);
});

// Porta para o servidor
const PORT = 3500;

// Iniciar o servidor
server.listen(PORT, () => {
  console.log(`Servidor HTTP nativo rodando em http://localhost:${PORT}`);
  console.log('Pressione Ctrl+C para encerrar');
});
