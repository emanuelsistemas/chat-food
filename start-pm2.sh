#!/bin/bash

# Script para iniciar o projeto ChatFood usando PM2

echo "=== Iniciando o projeto ChatFood com PM2 ==="

# Verificar se o PM2 está instalado
if ! command -v pm2 &> /dev/null; then
    echo "PM2 não está instalado. Instalando..."
    npm install -g pm2
fi

# Instalação de dependências do backend
echo "Verificando dependências do backend..."
cd /root/chat-food/backend
npm install

# Instalação de dependências do frontend
echo "Verificando dependências do frontend..."
cd /root/chat-food/frontend
npm install

# Voltar para o diretório raiz
cd /root/chat-food

# Iniciar as aplicações com PM2
echo "Iniciando backend e frontend de produção com PM2..."
pm2 start ecosystem.config.js --only chatfood-backend,chatfood-frontend-prod

# Salvar a configuração do PM2 para que reinicie automaticamente
echo "Salvando configuração do PM2..."
pm2 save

# Configurar o PM2 para iniciar na inicialização do sistema
echo "Configurando PM2 para iniciar automaticamente no boot..."
pm2 startup

echo ""
echo "Aplicações iniciadas com PM2!"
echo "Para verificar o status, digite: pm2 status"
echo "Para visualizar logs, digite: pm2 logs"
echo "Para parar as aplicações, digite: pm2 stop all"
echo "Backend API disponível em: http://localhost:5000/api/status"
echo "Frontend de produção disponível em: http://localhost (porta 80)"
echo "Acesso externo em: http://sistemachatfood.appbr.io"
