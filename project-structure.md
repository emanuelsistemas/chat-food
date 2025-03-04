# Estrutura do Projeto ChatFood

## Backend (Node.js + Express)

### Principais Arquivos e Diretórios
- `backend/src/server.js` - Ponto de entrada do servidor
- `backend/src/config/database.js` - Configuração da conexão com MongoDB
- `backend/src/controllers/auth.controller.js` - Controladores para autenticação
- `backend/src/models/User.js` - Modelo de usuário
- `backend/src/routes/auth.routes.js` - Rotas de autenticação
- `backend/src/middleware/auth.middleware.js` - Middleware de autenticação

### Status
- Servidor rodando na porta 5000
- Rotas de autenticação implementadas (registro, login)
- Middleware de autenticação para proteger rotas privadas

## Frontend (React)

### Principais Arquivos e Diretórios
- `frontend/src/index.js` - Ponto de entrada da aplicação
- `frontend/src/App.js` - Componente principal com rotas
- `frontend/src/context/AuthContext.js` - Contexto de autenticação
- `frontend/src/context/ThemeContext.js` - Contexto de tema (claro/escuro)
- `frontend/src/components/pages/home/Home.js` - Página inicial
- `frontend/src/components/pages/auth/Login.js` - Página de login
- `frontend/src/components/pages/auth/Register.js` - Página de registro
- `frontend/src/components/pages/auth/ForgotPassword.js` - Página de recuperação de senha
- `frontend/src/components/layout/Header.js` - Componente de cabeçalho
- `frontend/src/components/layout/Footer.js` - Componente de rodapé
- `frontend/src/services/api.js` - Configuração do Axios para API
- `frontend/src/services/auth.service.js` - Serviço de autenticação

### Páginas Implementadas
- Home - Página inicial com apresentação do produto
- Login - Autenticação de usuários existentes
- Register - Criação de novas contas
- ForgotPassword - Recuperação de senha

### Próximos Passos
1. Implementar o Dashboard do usuário
2. Criar gerenciamento de menus
3. Implementar o sistema de pedidos
4. Adicionar funcionalidades de chat com IA
5. Desenvolver relatórios e análises

## Rotas da API Backend

### Autenticação
- POST `/api/auth/register` - Registrar novo usuário
- POST `/api/auth/login` - Autenticar usuário existente

## Rotas do Frontend

### Públicas
- `/` - Página inicial
- `/login` - Página de login
- `/register` - Página de registro
- `/forgot-password` - Recuperação de senha

### Privadas (Requerem Autenticação)
- `/dashboard` - Dashboard do usuário (Em construção)

## Tecnologias Utilizadas

### Backend
- Node.js
- Express
- MongoDB (Mongoose)
- JWT (JSON Web Tokens)
- bcryptjs

### Frontend
- React
- React Router
- Context API
- Axios
- CSS Modules
