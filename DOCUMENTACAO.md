# Documentação do Projeto ChatFood

## Visão Geral

O ChatFood é um sistema completo para automatização de atendimentos em estabelecimentos de alimentação, desenvolvido com uma arquitetura moderna separando claramente o backend (Node.js) e o frontend (React).

## Estrutura do Projeto

```
chat-food/
├── backend/               # Aplicação Node.js (Express)
│   ├── public/            # Arquivos estáticos 
│   ├── src/               # Código-fonte do backend
│   │   ├── config/        # Configurações (banco de dados, etc.)
│   │   ├── controllers/   # Controladores das rotas
│   │   ├── middleware/    # Middleware de autenticação e outros
│   │   ├── models/        # Modelos de dados (Mongoose)
│   │   ├── routes/        # Definição de rotas da API
│   │   ├── services/      # Serviços de negócio
│   │   └── utils/         # Funções utilitárias
│   ├── .env.example       # Exemplo de variáveis de ambiente
│   ├── package.json       # Dependências do backend
│   └── server.js          # Ponto de entrada do backend
│
└── frontend/              # Aplicação React
    ├── public/            # Arquivos estáticos do frontend
    └── src/               # Código-fonte do frontend
        ├── assets/        # Recursos (imagens, estilos)
        │   ├── images/    # Imagens
        │   └── styles/    # Arquivos CSS
        ├── components/    # Componentes React
        │   ├── common/    # Componentes reutilizáveis
        │   ├── layout/    # Componentes de layout (Header, Footer)
        │   └── pages/     # Componentes de páginas completas
        │       ├── home/      # Página inicial
        │       ├── login/     # Página de login
        │       ├── cadastro/  # Página de cadastro
        │       └── dashboard/ # Dashboard do usuário
        ├── context/       # Context API para gerenciamento de estado
        ├── hooks/         # Hooks personalizados
        ├── services/      # Serviços para comunicação com API
        └── utils/         # Funções utilitárias do frontend
```

## Backend (Node.js + Express)

### Principais Componentes

1. **Models (src/models/)**
   - `User.js`: Modelo de usuário com autenticação
   - Outros modelos serão adicionados conforme necessário

2. **Controllers (src/controllers/)**
   - `auth.controller.js`: Controle de autenticação (registro, login)
   - `user.controller.js`: Gerenciamento de usuários

3. **Routes (src/routes/)**
   - `auth.routes.js`: Rotas de autenticação
   - `user.routes.js`: Rotas para operações de usuário

4. **Middleware (src/middleware/)**
   - `auth.middleware.js`: Middleware de proteção de rotas e verificação de JWT

5. **Config (src/config/)**
   - `database.js`: Configuração de conexão com MongoDB

### Fluxo de Dados no Backend

1. O cliente faz uma requisição HTTP para uma rota específica
2. O middleware apropriado é executado (autenticação, validação)
3. A rota direciona a requisição para o controlador adequado
4. O controlador implementa a lógica de negócio, interagindo com modelos
5. O resultado é enviado de volta ao cliente como resposta JSON

## Frontend (React)

### Principais Componentes

1. **Context (src/context/)**
   - `AuthContext.js`: Gerencia o estado de autenticação
   - `ThemeContext.js`: Gerencia o tema claro/escuro

2. **Componentes de Layout (src/components/layout/)**
   - `Header.js`: Barra de navegação superior
   - `Footer.js`: Rodapé com informações e links

3. **Páginas (src/components/pages/)**
   - `home/Home.js`: Página inicial com informações do produto
   - Outras páginas serão implementadas (login, cadastro, dashboard)

4. **Serviços (src/services/)**
   - `api.js`: Configuração do Axios para comunicação com a API
   - `auth.service.js`: Serviço para operações de autenticação

### Fluxo de Dados no Frontend

1. O usuário interage com um componente (ex: formulário de login)
2. O componente chama um serviço (ex: `auth.service.js`)
3. O serviço faz uma requisição HTTP para a API
4. Com a resposta, o estado global é atualizado via Context API
5. Os componentes são re-renderizados em resposta às mudanças de estado

## Autenticação

1. **Registro**:
   - O usuário preenche o formulário de cadastro
   - Os dados são enviados para `/api/auth/register`
   - O backend cria um usuário no banco de dados
   - Um token JWT é gerado e retornado
   - O frontend armazena o token no localStorage

2. **Login**:
   - O usuário preenche o formulário de login
   - Os dados são enviados para `/api/auth/login`
   - O backend verifica as credenciais
   - Um token JWT é gerado e retornado
   - O frontend armazena o token no localStorage

3. **Proteção de Rotas**:
   - O frontend verifica a existência do token antes de renderizar rotas protegidas
   - O backend verifica o token em requisições para endpoints protegidos

## Tecnologias Utilizadas

### Backend
- **Node.js**: Ambiente de execução JavaScript
- **Express**: Framework web para Node.js
- **MongoDB**: Banco de dados NoSQL
- **Mongoose**: ODM para MongoDB
- **JWT**: JSON Web Tokens para autenticação
- **bcryptjs**: Biblioteca para hash de senhas

### Frontend
- **React**: Biblioteca JavaScript para interfaces de usuário
- **React Router**: Roteamento no lado do cliente
- **Context API**: Gerenciamento de estado global
- **Axios**: Cliente HTTP para comunicação com a API
- **CSS Modules**: Estilização modular por componente

## Páginas Implementadas

1. **Home**:
   - Apresentação do produto
   - Recursos principais
   - Depoimentos de clientes
   - Chamadas para ação (cadastro, demonstração)

2. **Login** (a ser implementada):
   - Formulário de autenticação
   - Opções de login social
   - Recuperação de senha

3. **Cadastro** (a ser implementada):
   - Formulário para novos usuários
   - Validação de campos
   - Seleção de plano

4. **Dashboard** (a ser implementada):
   - Visão geral do estabelecimento
   - Configurações de atendimento
   - Relatórios e análises

## Próximos Passos

1. Implementar páginas de login e cadastro
2. Desenvolver o dashboard do usuário
3. Integrar funcionalidades de IA para automação de atendimento
4. Adicionar sistema de gerenciamento de cardápio
5. Implementar recursos de marketing e fidelização

## Conclusão

O projeto ChatFood segue uma arquitetura moderna e bem estruturada, separando claramente as responsabilidades entre backend e frontend. A organização de arquivos facilita a manutenção e escalabilidade do sistema, permitindo adicionar novas funcionalidades de forma organizada.
