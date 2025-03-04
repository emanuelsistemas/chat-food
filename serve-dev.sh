#!/bin/bash

# Compilar o frontend
cd /root/chat-food/frontend
npm run build

# Servir a versão compilada na porta 3000 para "desenvolvimento"
npx serve -s build -l 3000
