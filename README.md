# ChatFood - Automatize seus Atendimentos

Um sistema completo para automatização de atendimentos em restaurantes e estabelecimentos de alimentação, desenvolvido com Node.js (Backend) e React (Frontend).

## Estrutura do Projeto

O projeto está organizado em duas partes principais:

### Backend (Node.js + Express)

- **Diretório**: `/backend`
- **Tecnologias**: Node.js, Express, MongoDB, JWT
- **Funcionalidades**: API REST, autenticação, gerenciamento de usuários

### Frontend (React)

- **Diretório**: `/frontend`
- **Tecnologias**: React, React Router, Context API
- **Funcionalidades**: Interface de usuário responsiva e moderna

## Instalação e Execução

### Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn
- MongoDB

### Backend

```bash
# Entrar no diretório do backend
cd backend

# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env
# Edite o arquivo .env com suas configurações

# Iniciar o servidor em modo de desenvolvimento
npm run dev
```

### Frontend

```bash
# Entrar no diretório do frontend
cd frontend

# Instalar dependências
npm install

# Iniciar o servidor de desenvolvimento
npm start
```

## Recursos Principais

- **Autenticação Segura**: Sistema completo de login e registro
- **Dashboard Administrativo**: Gerenciamento de estabelecimentos
- **Chat Automático**: Atendimento via IA
- **Gestão de Cardápios**: Cadastro e gerenciamento de itens
- **Relatórios e Análises**: Insights sobre o desempenho do negócio

## Páginas Principais

1. **Home**: Página inicial com informações sobre o sistema
2. **Login**: Autenticação de usuários
3. **Cadastro**: Registro de novos usuários/estabelecimentos
4. **Dashboard**: Painel de controle do estabelecimento

## Em Desenvolvimento

Este projeto está em desenvolvimento contínuo, com novas funcionalidades sendo adicionadas regularmente.

## Execução com PM2

Para ambientes de produção, recomendamos o uso do PM2 para gerenciar tanto o backend quanto o frontend:

```bash
# Iniciar o projeto completo com PM2
./start-pm2.sh

# Verificar status das aplicações
pm2 status

# Visualizar logs
pm2 logs

# Visualizar logs específicos
pm2 logs chatfood-backend
pm2 logs chatfood-frontend-prod
pm2 logs chatfood-frontend-dev

# Parar as aplicações
pm2 stop all

# Reiniciar as aplicações
pm2 restart all
```

O arquivo `ecosystem.config.js` contém as configurações do PM2 para o backend e frontend, permitindo:

- Inicialização automática na inicialização do sistema
- Reinicialização automática em caso de falhas
- Gerenciamento de logs
- Monitoramento de uso de memória e CPU

## Gerenciando Ambientes de Desenvolvimento e Produção

O projeto inclui um script para facilitar o gerenciamento dos ambientes de desenvolvimento e produção, permitindo inclusive que ambos rodem simultaneamente:

```bash
./dev-mode.sh [opção]
```

Opções disponíveis:

- **dev**: Inicia o ambiente de desenvolvimento (backend na porta 5000, frontend na porta 3000 com hot-reload)
- **stop**: Para o ambiente de desenvolvimento
- **prod**: Compila o frontend e inicia o ambiente de produção com PM2 (backend na porta 5000, frontend na porta 80)
- **both**: Inicia ambos os ambientes (desenvolvimento e produção) simultaneamente
- **build**: Compila o frontend e atualiza a versão de produção

### Fluxo de Trabalho Recomendado

1. Para desenvolver e fazer alterações: `./dev-mode.sh dev`
2. Para testar em produção enquanto desenvolve: `./dev-mode.sh both`
3. Após concluir as alterações: `./dev-mode.sh prod`
4. Para atualizar apenas o frontend em produção: `./dev-mode.sh build`

### Acessando as Aplicações

Ambiente de produção:

- **Backend API**: http://localhost:5000/api/status
- **Frontend de produção**: http://localhost:80 ou simplesmente http://localhost
- **Acesso externo**: http://sistemachatfood.appbr.io

Ambiente de desenvolvimento:

- **Backend API**: http://localhost:5000/api/status (compartilhado com produção)
- **Frontend de desenvolvimento**: http://localhost:3000 (com hot-reload para atualizações automáticas)

Quando ambos os ambientes estão rodando simultaneamente, o mesmo backend é compartilhado, mas você pode acessar o frontend de desenvolvimento na porta 3000 e o frontend de produção na porta 80.
