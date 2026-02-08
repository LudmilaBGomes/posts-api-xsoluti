# Gerenciamento de Posts - Next.js

Aplicação full-stack para gerenciamento de posts com arquitetura moderna em Next.js, Redux Saga e integração entre SSR/CSR.

## 📋 Instalação e Execução

### Pré-requisitos

- Node.js 18+ instalado
- npm ou yarn como gerenciador de pacotes

### Instalação

```bash
# Acesse o diretório do projeto
cd posts-api-xsoluti

# Instale as dependências
npm install
```

### Scripts Disponíveis

| Script          | Descrição                                         |
| --------------- | ------------------------------------------------- |
| `npm run dev`   | Inicia o servidor de desenvolvimento (porta 3000) |
| `npm run build` | Compila a aplicação para produção                 |
| `npm start`     | Inicia o servidor em modo produção                |
| `npm run lint`  | Executa o linter ESLint                           |

### Executando a Aplicação

**Desenvolvimento:**

```bash
npm run dev
```

Acesse em `http://localhost:3000`

**Produção:**

```bash
npm run build
npm start
```

## 🏗️ Explicação da Arquitetura

A aplicação segue a seguinte arquitetura:

### Estrutura de Diretórios

```
├── app/                      # App Router do Next.js 13+
│   ├── api/posts/           # Rotas API (Backend)
│   │   ├── route.ts         # GET/POST posts
│   │   └── [id]/            # Operações por ID
│   │       ├── cache.ts     # Gerenciamento de cache
│   │       └── route.ts     # GET/PUT/DELETE específicos
│   ├── posts/               # Páginas do aplicativo (Frontend)
│   │   ├── page.tsx         # Lista de posts (CSR)
│   │   ├── new/             # Criar novo post
│   │   ├── [id]/edit/       # Editar post
│   │   └── [id]/details/    # Detalhes do post
│   └── layout.tsx           # Layout raiz
├── components/              # Componentes React reutilizáveis
│   ├── PostCard/           # Card de exibição
│   └── PostForm/           # Formulário CRUD
├── services/               # Camada de serviços (API client)
│   ├── httpClient.ts      # Cliente HTTP com Axios
│   └── postsApi.ts        # Funções da API de posts
├── store/                 # Redux Store e Saga
│   ├── index.ts          # Configuração da store
│   ├── provider.tsx      # Provider Redux
│   ├── hooks.ts          # Custom hooks (useAppDispatch, useAppSelector)
│   └── posts/
│       ├── types.ts      # Tipos e enums de ações
│       ├── actions.ts    # Action creators
│       ├── reducer.ts    # Reducer Redux
│       └── saga.ts       # Side effects com Redux-Saga
└── types/                # Tipos TypeScript compartilhados
    └── posts.ts          # Interface de Post
```

### Fluxo de Dados

```
┌─────────────────────────────────────────────────────────────┐
│                    APLICAÇÃO NEXT.JS                         │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐         ┌─────────────────┐               │
│  │ Components   │────────→│  Redux Store    │               │
│  │ (React UI)   │         │  + Redux-Saga   │               │
│  └──────────────┘         └────────┬────────┘               │
│         ▲                          │                         │
│         │                          ▼                         │
│         │                  ┌──────────────────┐              │
│         │                  │ Services/API     │              │
│         │                  │ (postsApi.ts)    │              │
│         │                  └────────┬─────────┘              │
│         │                           │                        │
│         └───────────────────────────┼────────────────────────┤
│                                     │                        │
│                    ┌────────────────▼────────────────┐       │
│                    │  API Routes (/api/posts)       │       │
│                    │  - GET: Listar posts           │       │
│                    │  - POST: Criar post            │       │
│                    │  - PUT/DELETE: Atualizar      │       │
│                    └────────────────┬────────────────┘       │
│                                     │                        │
│                                     ▼                        │
│                          ┌──────────────────┐               │
│                          │  In-Memory Cache │               │
│                          │  (cache.ts)      │               │
│                          └──────────────────┘               │
└─────────────────────────────────────────────────────────────┘
```

## 🎯 Decisões Técnicas

### 1. Renderização: SSR vs CSR

**Abordagem Híbrida Adotada:**

- **Server Components (Padrão do Next.js)**:
  - Usados para layouts e estrutura base
  - Melhor performance e SEO
- **Client Components (`"use client"`)**:
  - Páginas de posts (`posts/page.tsx`, `[id]/details/page.tsx`)
  - Necessários para interatividade com Redux
  - Lidam com carregamento de dados assíncrono no navegador

**Por quê?**

- Next.js integra Server Components por padrão
- Redux requer Client Components (state management no cliente)
- Melhor performance: server components reduzem JS no cliente
- Melhor SEO: conteúdo servido pelo servidor quando possível

### 2. State Management: Redux + Redux-Saga

**Arquitetura Escolhida:**

```
├─ Redux (ReduxJS Toolkit)
│  ├─ Store centralizada com state de posts
│  └─ Reducer puro para atualizar estado
│
└─ Redux-Saga
   ├─ Middleware para side effects
   ├─ Chamadas assíncronas isoladas
   └─ Lógica de negócio descentralizada
```

**Por quê?**

- **Redux**: Gerenciar estado global consistente (lista de posts, carregamento, erros)
- **Redux-Saga**: Lidar com operações assíncronas de forma elegante
  - Separação clara entre lógica síncrona (reducer) e assíncrona (saga)
  - Fácil de testar e debugar
  - Melhor que Thunk para lógica complexa

**Estados Gerenciados:**

```typescript
{
  posts: {
    list: Post[],           // Lista de todos os posts
    currentPost: Post | null, // Post sendo editado
    loading: boolean,       // Status de carregamento
    error: string | null    // Mensagens de erro
  }
}
```

### 3. API Interna (Backend com Next.js)

**Implementação:**

- **Arquivo**: `app/api/posts/route.ts` e `app/api/posts/[id]/route.ts`
- **Método**: Route Handlers do Next.js 13+
- **Protocol**: REST com JSON

**Endpoints:**

| Método | Rota              | Descrição             |
| ------ | ----------------- | --------------------- |
| GET    | `/api/posts`      | Listar todos os posts |
| POST   | `/api/posts`      | Criar novo post       |
| GET    | `/api/posts/[id]` | Obter post por ID     |
| PUT    | `/api/posts/[id]` | Atualizar post        |
| DELETE | `/api/posts/[id]` | Deletar post          |

**Cache In-Memory:**

```typescript
// cache.ts
- loadPostsIfNeeded(): Carrega posts na primeira vez
- getPostsCache(): Retorna posts em memória
- setPostsCache(): Atualiza cache
```

**Por quê?**

- Sem dependência de banco de dados externo
- Cache em memória rápido e simples

### 4. Stack Tecnológico

| Camada          | Tecnologia                       | Motivo                           |
| --------------- | -------------------------------- | -------------------------------- |
| **Framework**   | Next.js 16                       | SSR/SSG, API routes, performance |
| **UI Library**  | React 19                         | Componentes interativos, hooks   |
| **State**       | Redux + ReduxJS Toolkit          | State global escalável           |
| **Async**       | Redux-Saga                       | Side effects gerenciados         |
| **HTTP Client** | Fetch                            | Requisições HTTP                 |
| **Styling**     | Tailwind CSS + Styled Components | Flexibilidade de estilos         |
| **Tipagem**     | TypeScript                       | Type safety e melhor DX          |

## 📚 Tecnologias e Versões

```json
{
  "next": "16.1.6",
  "react": "19.2.3",
  "@reduxjs/toolkit": "^2.11.2",
  "redux-saga": "^1.4.2",
  "typescript": "^5"
}
```
