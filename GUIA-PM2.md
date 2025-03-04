# Guia de Uso do PM2 no Projeto ChatFood

## O que é o PM2?

PM2 é um gerenciador de processos para aplicações Node.js que facilita:
- Manter aplicações sempre ativas
- Reiniciar automaticamente em caso de falhas
- Gerenciar logs
- Monitorar recursos
- Iniciar aplicações automaticamente após reinicialização do servidor

## Configuração do PM2 no ChatFood

O projeto ChatFood utiliza o PM2 para gerenciar dois processos principais:

1. **Backend (Node.js/Express)**: API REST rodando na porta 5000
2. **Frontend (React)**: Aplicação estática servida na porta 80

### Arquivo de Configuração: ecosystem.config.js

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
      }
    }
  ]
}
```

## Comandos Básicos do PM2

### Iniciar Aplicações

```bash
# Iniciar todas as aplicações definidas no ecosystem.config.js
pm2 start ecosystem.config.js

# Iniciar apenas uma aplicação específica
pm2 start ecosystem.config.js --only chatfood-backend
pm2 start ecosystem.config.js --only chatfood-frontend
```

### Parar Aplicações

```bash
# Parar todas as aplicações
pm2 stop all

# Parar uma aplicação específica
pm2 stop chatfood-backend
pm2 stop chatfood-frontend
```

### Reiniciar Aplicações

```bash
# Reiniciar todas as aplicações
pm2 restart all

# Reiniciar uma aplicação específica
pm2 restart chatfood-backend
pm2 restart chatfood-frontend
```

### Visualizar Status

```bash
pm2 status
```

Exemplo de saída:
```
┌─────┬─────────────────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┬──────────┬──────────┐
│ id  │ name                │ namespace   │ version │ mode    │ pid      │ uptime │ ↺    │ status    │ cpu      │ mem      │ user     │ watching │
├─────┼─────────────────────┼─────────────┼─────────┼─────────┼──────────┼────────┼──────┼───────────┼──────────┼──────────┼──────────┼──────────┤
│ 0   │ chatfood-backend    │ default     │ N/A     │ fork    │ 12345    │ 2D     │ 0    │ online    │ 0.5%     │ 50.0mb   │ root     │ disabled │
│ 1   │ chatfood-frontend   │ default     │ N/A     │ fork    │ 12346    │ 2D     │ 0    │ online    │ 0.1%     │ 30.0mb   │ root     │ disabled │
└─────┴─────────────────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴──────────┴──────────┴──────────┴──────────┘
```

### Visualizar Logs

```bash
# Visualizar logs de todas as aplicações
pm2 logs

# Visualizar logs de uma aplicação específica
pm2 logs chatfood-backend
pm2 logs chatfood-frontend

# Visualizar apenas os últimos 200 linhas de log
pm2 logs --lines 200
```

### Monitoramento em Tempo Real

```bash
pm2 monit
```

Este comando abre uma interface interativa no terminal que mostra:
- Uso de CPU
- Uso de memória
- Logs em tempo real
- Métricas de desempenho

### Configurar Inicialização Automática

```bash
# Configurar PM2 para iniciar automaticamente após reboot
pm2 startup

# Salvar a configuração atual para ser restaurada após reboot
pm2 save
```

## Gerenciamento de Logs

### Rotação de Logs

O PM2 gerencia automaticamente a rotação de logs, mas você pode configurar manualmente:

```bash
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7
```

### Localização dos Logs

Os logs do PM2 são armazenados em:

```
~/.pm2/logs/
```

Você encontrará arquivos como:
- `chatfood-backend-out.log` - Saída padrão (stdout)
- `chatfood-backend-error.log` - Saída de erro (stderr)
- `chatfood-frontend-out.log` - Saída padrão (stdout)
- `chatfood-frontend-error.log` - Saída de erro (stderr)

## Atualização de Aplicações

### Atualização com Zero Downtime

Para atualizar o backend sem downtime:

```bash
# Após fazer as alterações no código
pm2 reload chatfood-backend
```

Para atualizar o frontend:

```bash
# Compilar o novo build
cd /root/chat-food/frontend
npm run build

# Reiniciar o serviço do frontend
pm2 restart chatfood-frontend
```

Ou use o script automatizado:

```bash
./dev-mode.sh build
```

## Monitoramento Avançado

### Dashboard Web

PM2 oferece um dashboard web chamado PM2 Plus:

```bash
pm2 plus
```

### Métricas de Desempenho

Para visualizar métricas de desempenho:

```bash
pm2 show chatfood-backend
pm2 show chatfood-frontend
```

## Troubleshooting

### Reiniciar PM2

Se o PM2 apresentar comportamento inesperado:

```bash
# Parar todos os processos
pm2 kill

# Iniciar novamente
pm2 start ecosystem.config.js
```

### Limpar Logs

Se os logs estiverem ocupando muito espaço:

```bash
pm2 flush
```

### Verificar Erros

```bash
pm2 logs --err
```

### Verificar Uso de Memória

```bash
pm2 status
```

Se alguma aplicação estiver usando muita memória, considere reiniciá-la:

```bash
pm2 restart chatfood-backend
```

## Integração com Scripts Personalizados

O projeto ChatFood inclui scripts personalizados que facilitam a alternância entre desenvolvimento e produção:

- `./dev-mode.sh dev` - Inicia o modo de desenvolvimento
- `./dev-mode.sh prod` - Alterna para o modo de produção (usando PM2)
- `./dev-mode.sh build` - Atualiza o build do frontend
- `./start-pm2.sh` - Inicia todos os serviços com PM2

## Recursos Adicionais

- [Documentação Oficial do PM2](https://pm2.keymetrics.io/docs/usage/quick-start/)
- [PM2 GitHub](https://github.com/Unitech/pm2)
- [PM2 Plus (Monitoramento Avançado)](https://pm2.io/docs/plus/overview/)

---

Documentação criada em: 04/03/2025
