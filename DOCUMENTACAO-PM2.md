# Documentação de Configuração do PM2 - ChatFood

Este documento detalha as configurações do PM2 e os modos de operação (desenvolvimento e produção) para o projeto ChatFood.

## Índice

1. [Visão Geral](#visão-geral)
2. [Arquivos de Configuração](#arquivos-de-configuração)
3. [Modo de Produção](#modo-de-produção)
4. [Modo de Desenvolvimento](#modo-de-desenvolvimento)
5. [Fluxo de Trabalho Recomendado](#fluxo-de-trabalho-recomendado)
6. [Comandos Úteis](#comandos-úteis)
7. [Troubleshooting](#troubleshooting)

## Visão Geral

O projeto ChatFood utiliza o PM2 para gerenciar os processos do backend e frontend em ambiente de produção. Para desenvolvimento, foi criado um script personalizado que facilita a alternância entre os ambientes.

### Componentes Principais:

- **Backend**: Node.js/Express rodando na porta 5000
- **Frontend**: React servido como aplicação estática na porta 80
- **Gerenciador de Processos**: PM2 para produção, scripts personalizados para desenvolvimento

## Arquivos de Configuração

### ecosystem.config.js

Este arquivo contém as configurações do PM2 para os processos do backend e frontend:

```javascript
module.exports = {
  apps: [
    {
      name: 'chatfood-backend',
      script: 'src/server.js',
      cwd: './backend',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
      env: {
        NODE_ENV: 'production',
        PORT: 5000
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 5000
      }
    },
    {
      name: 'chatfood-frontend',
      script: 'npx',
      args: 'serve -s build -l 80',
      cwd: './frontend',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
      env: {
        NODE_ENV: 'production'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ]
}
```

### start-pm2.sh

Script para iniciar o projeto em modo de produção com PM2:

```bash
#!/bin/bash

# Script para iniciar o projeto ChatFood com PM2

echo "=== Iniciando o projeto ChatFood com PM2 ==="

# Verificar dependências do backend
echo "Verificando dependências do backend..."
cd /root/chat-food/backend
npm install

# Verificar dependências do frontend
echo "Verificando dependências do frontend..."
cd /root/chat-food/frontend
npm install

# Iniciar backend e frontend com PM2
echo "Iniciando backend e frontend com PM2..."
cd /root/chat-food
pm2 start ecosystem.config.js

# Salvar configuração para reiniciar automaticamente após reboot
echo "Salvando configuração do PM2..."
pm2 save

# Configurar PM2 para iniciar automaticamente no boot
echo "Configurando PM2 para iniciar automaticamente no boot..."
pm2 startup

echo "Aplicações iniciadas com PM2!"
echo "Para verificar o status, digite: pm2 status"
echo "Para visualizar logs, digite: pm2 logs"
echo "Para parar as aplicações, digite: pm2 stop all"
echo "Backend API disponível em: http://localhost:5000/api/status"
echo "Frontend disponível em: http://localhost"
echo "Acesso externo em: http://sistemachatfood.appbr.io"
```

### dev-mode.sh

Script para alternar entre os modos de desenvolvimento e produção:

```bash
#!/bin/bash

# Script para alternar entre modo de desenvolvimento e produção

MODE=$1

case $MODE in
  dev)
    echo "=== Iniciando modo de DESENVOLVIMENTO ==="
    # Parar PM2 se estiver rodando
    pm2 delete all 2>/dev/null
    
    # Iniciar backend em modo de desenvolvimento
    echo "Iniciando backend em modo de desenvolvimento..."
    cd /root/chat-food/backend
    PORT=5000 npm run dev &
    BACKEND_PID=$!
    
    # Iniciar frontend em modo de desenvolvimento
    echo "Iniciando frontend em modo de desenvolvimento..."
    cd /root/chat-food/frontend
    # Compilar o frontend para desenvolvimento
    npm run build
    # Servir o frontend na porta 80
    sudo serve -s build -l 80 &
    FRONTEND_PID=$!
    
    echo "Ambiente de desenvolvimento iniciado!"
    echo "Backend rodando na porta 5000"
    echo "Frontend rodando na porta 80"
    echo "Para parar, pressione CTRL+C ou execute: ./dev-mode.sh stop"
    
    # Salvar PIDs em arquivo temporário
    echo "$BACKEND_PID $FRONTEND_PID" > /tmp/chatfood-dev-pids
    
    # Função para encerrar os processos ao pressionar CTRL+C
    trap "kill $BACKEND_PID $FRONTEND_PID; rm /tmp/chatfood-dev-pids; exit" INT
    
    # Manter o script rodando
    wait
    ;;
    
  stop)
    echo "=== Parando modo de DESENVOLVIMENTO ==="
    if [ -f /tmp/chatfood-dev-pids ]; then
      PIDS=$(cat /tmp/chatfood-dev-pids)
      kill $PIDS 2>/dev/null
      rm /tmp/chatfood-dev-pids
      echo "Processos de desenvolvimento encerrados."
    else
      echo "Nenhum processo de desenvolvimento encontrado."
    fi
    ;;
    
  prod)
    echo "=== Alternando para modo de PRODUÇÃO ==="
    # Parar modo de desenvolvimento se estiver rodando
    if [ -f /tmp/chatfood-dev-pids ]; then
      PIDS=$(cat /tmp/chatfood-dev-pids)
      kill $PIDS 2>/dev/null
      rm /tmp/chatfood-dev-pids
    fi
    
    # Compilar frontend para produção
    echo "Compilando frontend para produção..."
    cd /root/chat-food/frontend
    npm run build
    
    # Iniciar com PM2
    echo "Iniciando serviços com PM2..."
    cd /root/chat-food
    ./start-pm2.sh
    ;;
    
  build)
    echo "=== Atualizando build de PRODUÇÃO ==="
    # Compilar frontend para produção
    echo "Compilando frontend para produção..."
    cd /root/chat-food/frontend
    npm run build
    
    # Verificar se estamos em modo de desenvolvimento ou produção
    if [ -f /tmp/chatfood-dev-pids ]; then
      echo "Detectado modo de desenvolvimento. Reiniciando servidor frontend..."
      # Obter o PID do frontend
      PIDS=$(cat /tmp/chatfood-dev-pids)
      FRONTEND_PID=$(echo $PIDS | cut -d' ' -f2)
      
      # Matar o processo do frontend
      kill $FRONTEND_PID 2>/dev/null
      
      # Iniciar o frontend novamente
      cd /root/chat-food/frontend
      sudo serve -s build -l 80 &
      NEW_FRONTEND_PID=$!
      
      # Atualizar o arquivo de PIDs
      BACKEND_PID=$(echo $PIDS | cut -d' ' -f1)
      echo "$BACKEND_PID $NEW_FRONTEND_PID" > /tmp/chatfood-dev-pids
      
      echo "Frontend reiniciado em modo de desenvolvimento!"
    else
      # Reiniciar frontend no PM2
      echo "Reiniciando frontend no PM2..."
      pm2 restart chatfood-frontend
      
      echo "Build de produção atualizado e aplicado!"
    fi
    ;;
    
  *)
    echo "Uso: ./dev-mode.sh [dev|stop|prod|build]"
    echo ""
    echo "Opções:"
    echo "  dev   - Inicia o ambiente de desenvolvimento (backend na porta 5000, frontend na porta 80)"
    echo "  stop  - Para o ambiente de desenvolvimento"
    echo "  prod  - Compila o frontend e inicia o ambiente de produção com PM2"
    echo "  build - Compila o frontend e atualiza a versão de produção sem reiniciar o backend"
    ;;
esac
```

## Modo de Produção

O modo de produção é gerenciado pelo PM2 e é otimizado para desempenho, estabilidade e confiabilidade.

### Características:

- **Gerenciamento de Processos**: PM2 monitora e reinicia automaticamente os processos em caso de falha
- **Inicialização Automática**: Os serviços são configurados para iniciar automaticamente no boot do sistema
- **Logs Centralizados**: PM2 gerencia os logs de ambos os serviços
- **Monitoramento**: Recursos como CPU e memória são monitorados pelo PM2

### Como Iniciar:

```bash
./start-pm2.sh
```

ou

```bash
./dev-mode.sh prod
```

### Verificar Status:

```bash
pm2 status
```

### Visualizar Logs:

```bash
pm2 logs
pm2 logs chatfood-backend
pm2 logs chatfood-frontend
```

### Acessar Aplicação:

- **Backend API**: http://localhost:5000/api/status
- **Frontend**: http://localhost:3000 (com hot-reload)
- **Acesso externo**: http://sistemachatfood.appbr.io

## Modo de Desenvolvimento

O modo de desenvolvimento é otimizado para facilitar o desenvolvimento e teste de alterações.

### Características:

- **Backend**: Executa com nodemon, que reinicia automaticamente quando há alterações no código
- **Frontend**: Servidor de desenvolvimento do React na porta 3000 com hot-reload (atualizações automáticas)
- **Hot-Reload**: Alterações no código do frontend são aplicadas automaticamente sem necessidade de recompilação manual

### Como Iniciar:

```bash
./dev-mode.sh dev
```

### Como Parar:

```bash
./dev-mode.sh stop
```

### Recompilar Frontend Após Alterações:

```bash
./dev-mode.sh build
```

### Acessar Aplicação:

- **Backend API**: http://localhost:5000/api/status
- **Frontend**: http://localhost:3000 (com hot-reload)

## Fluxo de Trabalho Recomendado

1. **Iniciar Desenvolvimento**:
   ```bash
   ./dev-mode.sh dev
   ```

2. **Fazer Alterações no Código**:
   - Editar arquivos do backend em `/root/chat-food/backend/src`
   - Editar arquivos do frontend em `/root/chat-food/frontend/src`

3. **Testar Alterações**:
   - Backend: As alterações são aplicadas automaticamente pelo nodemon
   - Frontend: As alterações são aplicadas automaticamente pelo servidor de desenvolvimento do React (hot-reload)

4. **Alternar para Produção**:
   ```bash
   ./dev-mode.sh prod
   ```

5. **Atualizar Apenas o Frontend em Produção**:
   ```bash
   ./dev-mode.sh build
   ```

## Comandos Úteis

### PM2 (Modo de Produção)

- **Iniciar todos os serviços**: `pm2 start ecosystem.config.js`
- **Parar todos os serviços**: `pm2 stop all`
- **Reiniciar todos os serviços**: `pm2 restart all`
- **Reiniciar apenas o backend**: `pm2 restart chatfood-backend`
- **Reiniciar apenas o frontend**: `pm2 restart chatfood-frontend`
- **Visualizar logs**: `pm2 logs`
- **Visualizar status**: `pm2 status`
- **Salvar configuração**: `pm2 save`
- **Configurar inicialização automática**: `pm2 startup`

### Scripts Personalizados

- **Iniciar modo de desenvolvimento**: `./dev-mode.sh dev`
- **Parar modo de desenvolvimento**: `./dev-mode.sh stop`
- **Alternar para produção**: `./dev-mode.sh prod`
- **Recompilar frontend**: `./dev-mode.sh build`
- **Iniciar em produção**: `./start-pm2.sh`

## Troubleshooting

### Porta 5000 em Uso

Se a porta 5000 já estiver em uso, você verá um erro como:

```
Error: getaddrinfo EADDRINUSE :::5000
```

Solução:
```bash
# Verificar o que está usando a porta
lsof -i :5000

# Matar o processo
kill -9 <PID>
```

### Porta 80 em Uso

Se a porta 80 já estiver em uso, você verá um erro ao iniciar o frontend.

Solução:
```bash
# Verificar o que está usando a porta
lsof -i :80

# Matar o processo
sudo kill -9 <PID>
```

### PM2 Não Inicia Automaticamente Após Reboot

Se os serviços não iniciarem automaticamente após reiniciar o sistema:

```bash
# Verificar se o PM2 está configurado para iniciar automaticamente
pm2 startup

# Salvar a configuração atual
pm2 save
```

### Problemas com o Build do Frontend

Se o frontend não compilar corretamente:

```bash
# Limpar cache do npm
cd /root/chat-food/frontend
npm cache clean --force

# Reinstalar dependências
rm -rf node_modules
npm install

# Tentar compilar novamente
npm run build
```

---
