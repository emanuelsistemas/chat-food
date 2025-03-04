#!/bin/bash

# Script para alternar entre modo de desenvolvimento e produção

MODE=$1

case $MODE in
  dev)
    echo "=== Iniciando modo de DESENVOLVIMENTO ==="
    
    # Compilar frontend para produção (necessário para o frontend de produção)
    echo "Compilando frontend para produção..."
    cd /root/chat-food/frontend
    npm run build
    
    # Iniciar serviços de desenvolvimento com PM2
    echo "Iniciando serviços de desenvolvimento com PM2..."
    cd /root/chat-food
    pm2 start ecosystem.config.js --only chatfood-backend,chatfood-frontend-dev
    
    echo "Ambiente de desenvolvimento iniciado!"
    echo "Backend rodando na porta 5000"
    echo "Frontend de desenvolvimento rodando na porta 3000 com hot-reload"
    echo "Para parar, execute: ./dev-mode.sh stop"
    ;;
    
  stop)
    echo "=== Parando modo de DESENVOLVIMENTO ==="
    pm2 stop chatfood-backend chatfood-frontend-dev
    echo "Processos de desenvolvimento parados."
    ;;
    
  prod)
    echo "=== Alternando para modo de PRODUÇÃO ==="
    # Parar serviços de desenvolvimento se estiverem rodando
    pm2 stop chatfood-backend chatfood-frontend-dev 2>/dev/null
    
    # Compilar frontend para produção
    echo "Compilando frontend para produção..."
    cd /root/chat-food/frontend
    npm run build
    
    # Iniciar serviços de produção com PM2
    echo "Iniciando serviços de produção com PM2..."
    cd /root/chat-food
    pm2 start ecosystem.config.js --only chatfood-backend,chatfood-frontend-prod
    
    echo "Ambiente de produção iniciado!"
    echo "Backend rodando na porta 5000"
    echo "Frontend de produção rodando na porta 80"
    ;;
    
  both)
    echo "=== Iniciando AMBOS os ambientes (desenvolvimento e produção) ==="
    
    # Compilar frontend para produção
    echo "Compilando frontend para produção..."
    cd /root/chat-food/frontend
    npm run build
    
    # Iniciar todos os serviços com PM2
    echo "Iniciando todos os serviços com PM2..."
    cd /root/chat-food
    pm2 start ecosystem.config.js
    
    echo "Ambos os ambientes iniciados!"
    echo "Backend rodando na porta 5000"
    echo "Frontend de desenvolvimento rodando na porta 3000 com hot-reload"
    echo "Frontend de produção rodando na porta 80"
    ;;
    
  build)
    echo "=== Atualizando build de PRODUÇÃO ==="
    # Compilar frontend para produção
    echo "Compilando frontend para produção..."
    cd /root/chat-food/frontend
    npm run build
    
    # Reiniciar frontend de produção no PM2
    echo "Reiniciando frontend de produção no PM2..."
    pm2 restart chatfood-frontend-prod
    
    echo "Build de produção atualizado e aplicado!"
    ;;
    
  *)
    echo "Uso: ./dev-mode.sh [dev|stop|prod|both|build]"
    echo ""
    echo "Opções:"
    echo "  dev   - Inicia o ambiente de desenvolvimento (backend na porta 5000, frontend na porta 3000 com hot-reload)"
    echo "  stop  - Para o ambiente de desenvolvimento"
    echo "  prod  - Compila o frontend e inicia o ambiente de produção com PM2 (backend na porta 5000, frontend na porta 80)"
    echo "  both  - Inicia ambos os ambientes (desenvolvimento e produção) simultaneamente"
    echo "  build - Compila o frontend e atualiza a versão de produção"
    ;;
esac
