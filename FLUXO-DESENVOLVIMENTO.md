# Fluxo de Trabalho de Desenvolvimento - ChatFood

Este documento descreve o fluxo de trabalho recomendado para desenvolvimento no projeto ChatFood, incluindo a alternância entre os ambientes de desenvolvimento e produção.

## Índice

1. [Visão Geral](#visão-geral)
2. [Configuração Inicial](#configuração-inicial)
3. [Ciclo de Desenvolvimento](#ciclo-de-desenvolvimento)
4. [Compilação e Implantação](#compilação-e-implantação)
5. [Alternância entre Ambientes](#alternância-entre-ambientes)
6. [Melhores Práticas](#melhores-práticas)

## Visão Geral

O projeto ChatFood possui dois ambientes principais:

1. **Ambiente de Desenvolvimento**:
   - Backend: Node.js/Express com nodemon (reinicialização automática)
   - Frontend: Servidor de desenvolvimento React na porta 3000 com hot-reload
   - Gerenciamento: PM2 via `ecosystem.config.js`

2. **Ambiente de Produção**:
   - Backend: Node.js/Express gerenciado pelo PM2
   - Frontend: React compilado e servido na porta 80 pelo PM2
   - Gerenciamento: PM2 via `ecosystem.config.js`

3. **Ambiente Misto (Desenvolvimento + Produção)**:
   - Backend: Compartilhado entre ambientes
   - Frontend: Ambas as versões rodando simultaneamente (porta 3000 para desenvolvimento, porta 80 para produção)
   - Gerenciamento: PM2 via `ecosystem.config.js`

## Configuração Inicial

### Requisitos

- Node.js (v14+)
- npm (v6+)
- PM2 (instalado globalmente)
- serve (instalado globalmente)

### Instalação

```bash
# Instalar dependências globais
npm install -g pm2 serve

# Clonar o repositório (se aplicável)
git clone <repositório> chat-food
cd chat-food

# Instalar dependências do backend
cd backend
npm install

# Instalar dependências do frontend
cd ../frontend
npm install

# Voltar para a raiz do projeto
cd ..
```

## Ciclo de Desenvolvimento

### 1. Iniciar o Ambiente de Desenvolvimento

```bash
./dev-mode.sh dev
```

Este comando:
- Compila o frontend para produção (necessário para o ambiente de produção)
- Inicia o backend com nodemon na porta 5000
- Inicia o servidor de desenvolvimento do React na porta 3000 com hot-reload

### 2. Desenvolvimento do Backend

Os arquivos do backend estão localizados em `/root/chat-food/backend/src`.

Ao modificar qualquer arquivo do backend, o nodemon detectará automaticamente as alterações e reiniciará o servidor.

### 3. Desenvolvimento do Frontend

Os arquivos do frontend estão localizados em `/root/chat-food/frontend/src`.

Ao fazer alterações no frontend, o servidor de desenvolvimento do React detecta automaticamente as mudanças e atualiza a interface (hot-reload) sem necessidade de comandos adicionais.

### 4. Testar as Alterações

- Backend API: http://localhost:5000/api/status
- Frontend de desenvolvimento: http://localhost:3000 (com hot-reload)

## Compilação e Implantação

### Compilar o Frontend

```bash
./dev-mode.sh build
```

### Implantar em Produção

```bash
./dev-mode.sh prod
```

Este comando:
- Para o ambiente de desenvolvimento
- Compila o frontend
- Inicia o backend e o frontend com PM2

## Gerenciamento de Ambientes

### Iniciar Apenas o Ambiente de Desenvolvimento

```bash
./dev-mode.sh dev
```

### Iniciar Apenas o Ambiente de Produção

```bash
./dev-mode.sh prod
```

### Iniciar Ambos os Ambientes Simultaneamente

```bash
./dev-mode.sh both
```

### Parar o Ambiente de Desenvolvimento

```bash
./dev-mode.sh stop
```

### Parar Todos os Ambientes

```bash
pm2 stop all
```

## Melhores Práticas

### Desenvolvimento

1. **Sempre use o modo de desenvolvimento para alterações frequentes**:
   ```bash
   ./dev-mode.sh dev
   ```

2. **Recompile o frontend após alterações**:
   ```bash
   ./dev-mode.sh build
   ```

3. **Verifique os logs do backend para depuração**:
   - Os logs são exibidos no terminal onde você iniciou o modo de desenvolvimento

4. **Teste as alterações em ambos os ambientes simultaneamente**:
   ```bash
   # Inicie ambos os ambientes
   ./dev-mode.sh both
   
   # Acesse o frontend de desenvolvimento em http://localhost:3000
   # Acesse o frontend de produção em http://localhost
   ```

### Produção

1. **Sempre verifique o status dos serviços**:
   ```bash
   pm2 status
   ```

2. **Monitore os logs para identificar problemas**:
   ```bash
   pm2 logs
   ```

3. **Atualize apenas o frontend quando necessário**:
   ```bash
   ./dev-mode.sh build
   ```

4. **Verifique o uso de recursos**:
   ```bash
   pm2 monit
   ```

### Gerenciamento de Código

1. **Mantenha o código limpo e bem documentado**
2. **Faça commits frequentes (se estiver usando git)**
3. **Teste todas as alterações antes de implantar em produção**
4. **Mantenha as dependências atualizadas**

## Fluxograma do Processo de Desenvolvimento

```
┌─────────────────┐
│ Iniciar         │
│ Desenvolvimento │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ ./dev-mode.sh   │
│ dev             │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Modificar       │
│ Código          │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Backend?        │──Sim──┐
└────────┬────────┘       │
         │                ▼
         │         ┌─────────────────┐
         │         │ Alterações      │
         │         │ Aplicadas       │
         │         │ Automaticamente │
         │         └─────────────────┘
         │
         │
         ▼
┌─────────────────┐
│ Frontend?       │──Sim──┐
└────────┬────────┘       │
         │                ▼
         │         ┌─────────────────┐
         │         │ ./dev-mode.sh   │
         │         │ build           │
         │         └─────────────────┘
         │
         ▼
┌─────────────────┐
│ Testar          │
│ Alterações      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Pronto para     │──Não──┐
│ Produção?       │       │
└────────┬────────┘       │
         │                ▼
         │         ┌─────────────────┐
         │         │ Continuar       │
         │         │ Desenvolvimento │
         │         └─────────────────┘
         │
         ▼
┌─────────────────┐
│ ./dev-mode.sh   │
│ prod            │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Verificar em    │
│ Produção        │
└─────────────────┘
```

---

Documentação criada em: 04/03/2025
