<div align="center">
    <img src="https://raw.githubusercontent.com/Vitryne/.github/main/assets/logotipoGradiente.png" width="280" />
    <h1>Portal web da plataforma Vitryne</h1>
    <p>Catálogo, compras e acompanhamento de pedidos para consumidores — painel de gestão exclusivo para lojistas.</p>
    <br>

[![Web](https://skillicons.dev/icons?i=react,nextjs,ts,tailwind,docker)](https://skillicons.dev)
</div>

---

## Sobre

O `vitryne-web` é a interface web da plataforma Vitryne. Serve dois públicos distintos com experiências separadas:

- **Consumidor** — navegação no catálogo, busca por proximidade, carrinho, checkout, acompanhamento de pedidos e perfil.
- **Lojista** — painel exclusivo de gestão de produtos, pedidos em tempo real (Kanban), histórico de vendas e dados financeiros.

A interface consome a API REST do [`vitryne-backend`](https://github.com/Vitryne/vitryne-backend) e se comunica via WebSocket para atualizações em tempo real.

---

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 14+ (App Router) |
| Linguagem | TypeScript |
| Estilização | Tailwind CSS |
| Requisições HTTP | Axios |
| Tempo real | WebSocket (nativo) |
| Containerização | Docker + Docker Compose |

---

## Pré-requisitos

- [Node.js 20+](https://nodejs.org/)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [Docker e Docker Compose](https://www.docker.com/) *(opcional)*
- [`vitryne-backend`](https://github.com/Vitryne/vitryne-backend) rodando localmente ou em staging

---

## Instalação

### Com Docker *(recomendado)*

```bash
# Clone o repositório
git clone https://github.com/Vitryne/vitryne-web.git
cd vitryne-web

# Suba o container
docker-compose up --build
```

### Sem Docker

```bash
# Clone o repositório
git clone https://github.com/Vitryne/vitryne-web.git
cd vitryne-web

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env.local

# Inicie o servidor de desenvolvimento
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`.

---

## Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto com base no `.env.example`:

```env
# URL base da API
NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1

# URL do WebSocket
NEXT_PUBLIC_WS_URL=ws://localhost:8080/ws

# Gateway de pagamento (chave pública — segura para o cliente)
NEXT_PUBLIC_PAYMENT_GATEWAY_KEY=sua_chave_publica
```

> **Nunca versione o arquivo `.env.local` com credenciais reais.** O `.gitignore` já exclui este arquivo por padrão. Variáveis sem o prefixo `NEXT_PUBLIC_` ficam restritas ao servidor e nunca são expostas ao browser.

---

## Estrutura do Projeto

```
src/
├── app/                  # App Router do Next.js — rotas e layouts
│   ├── (consumer)/       # Grupo de rotas do consumidor (catálogo, pedidos, perfil)
│   ├── (store)/          # Grupo de rotas do lojista (painel, produtos, pedidos)
│   └── layout.tsx        # Layout raiz da aplicação
├── components/
│   └── ui/               # Componentes reutilizáveis (botões, inputs, cards, modais)
├── features/             # Módulos por funcionalidade
│   ├── auth/             # Login, registro e recuperação de senha
│   ├── catalog/          # Catálogo de produtos, busca e filtros
│   ├── cart/             # Carrinho e checkout
│   ├── orders/           # Pedidos, histórico e timeline de status
│   ├── store/            # Painel do lojista — produtos, pedidos e financeiro
│   └── profile/          # Perfil e configurações do usuário
├── hooks/                # Custom hooks
├── services/             # Instâncias Axios e chamadas à API
├── types/                # Tipos e interfaces TypeScript globais
├── utils/                # Funções utilitárias
└── styles/               # Estilos globais e configuração do Tailwind
```

---

## Perfis de Acesso

A aplicação adapta a interface e as rotas disponíveis conforme o perfil autenticado:

| Perfil | Acesso |
|---|---|
| `CONSUMER` | Catálogo, busca, carrinho, pedidos e perfil |
| `STORE` | Painel de gestão, produtos, pedidos (Kanban) e financeiro |

Rotas protegidas por perfil retornam redirect para login quando acessadas sem autenticação ou com perfil incorreto.

---

## Scripts Disponíveis

```bash
npm run dev        # Servidor de desenvolvimento com hot reload
npm run build      # Build de produção
npm run start      # Inicia o servidor em modo produção
npm run lint       # Verifica o código com ESLint
npm run type-check # Verifica tipagem com tsc --noEmit
```

---
