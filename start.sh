#!/bin/bash

# Script para iniciar o projeto ChatFood (backend e frontend)

echo "=== Iniciando o projeto ChatFood ==="

# Instalação de dependências do backend
echo "Instalando dependências do backend..."
cd /root/chat-food/backend
npm install

# Instalação de dependências do frontend
echo "Instalando dependências do frontend..."
cd /root/chat-food/frontend
npm install

# Iniciar o backend em segundo plano
echo "Iniciando o backend na porta 5000..."
cd /root/chat-food/backend
PORT=5000 npm run dev &
BACKEND_PID=$!

# Aguardar o backend iniciar
sleep 3

# Iniciar o frontend em segundo plano na porta 80
echo "Iniciando o frontend na porta 80..."
cd /root/chat-food/frontend
sudo serve -s build -l 80 &
FRONTEND_PID=$!

echo "Servidores iniciados!"
echo "Backend rodando na porta 5000"
echo "Frontend rodando na porta 80"
echo "Acesse a aplicação em: http://sistemachatfood.appbr.io"
echo "Para parar os servidores, pressione CTRL+C"

# Função para encerrar os processos ao pressionar CTRL+C
trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT

# Manter o script rodando
wait
