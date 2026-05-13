# Teste Docket - Gerenciador de Documentos

Uma Aplicação React para gerenciamento de documentos com interface responsiva, validação de formulários, integração com a API ViaCEP e gerenciamento de estado utilizando Context API.

## Funcionalidades

- Cadastro de documentos
- Listagem paginada
- Exclusão de documentos
- Busca automática por CEP
- Feedback visual com notificações
- Gerenciamento global de estado com Context API

##  Tecnologias Utilizadas

### Frontend
- **React 19** - Biblioteca para construção da interface
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework CSS utilitário
- **React Hook Form** - Gerenciamento de formulários
- **Lucide React** - Biblioteca de ícones
- **React Hot Toast** - Notificações

### Backend (Mock)
- **JSON Server** - API REST mock para desenvolvimento

### Ferramentas de Desenvolvimento
- **ESLint** - Linting de código
- **Concurrently** - Execução simultânea de scripts


## Estrutura do Projeto

```
src/
├── components/
│   ├── layout/
│   │   ├── AppLayout.tsx
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   └── ui/
│       ├── Loader.tsx
│       ├── RequiredField.tsx
│       └── ShowToast.tsx
├── context/
│   ├── documents-context.ts
│   └── DocumentsProvider.tsx
├── hooks/
│   └── useDocuments.tsx
├── pages/
│   └── home/
│       ├── Home.tsx
│       └── components/
│           ├── DocumentForm.tsx
│           ├── DocumentsList.tsx
│           ├── DocumentCard.tsx
│           ├── DeleteDocumentDialog.tsx
│           ├── EmptyState.tsx
│           ├── LeadDescription.tsx
│           ├── Pagination.tsx
│           └── ResponsiveTabs.tsx
├── schemas/
│   └── document-schema.ts
├── services/
│   ├── api.ts
│   ├── createDocument.ts
│   ├── deleteDocument.ts
│   ├── getAddressByCep.ts
│   └── getDocuments.ts 
│ 
├── types/
│   ├── address.ts
│   ├── document.ts
│   └── form.ts
└── utils/
    └── document-formatter.ts
```

## Context API

Foi utilizado Context API para compartilhamento de estado global:

- **DocumentsContext**: Gerencia o estado dos documentos
- **DocumentsProvider**: Wrapper que fornece o contexto para a aplicação
- **useDocuments**: Hook customizado para acesso aos documentos

## Integrações

- **ViaCEP API**: para preenchimento automático de endereço
- **JSON Server**: para mock da API REST
  



---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



## Instalação e Execução

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm ou yarn

### Passos para Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/AronNascimento2/teste_docket.git
   cd teste_docket
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Execute o projeto**
   ```bash
   npm run dev
   ```

   Este comando iniciará simultaneamente:
   - **Cliente** (Vite dev server) na porta 5173
   - **Servidor** (JSON Server) na porta 3000
     
## Acessando a aplicação

Após iniciar o projeto, abra o navegador e acesse: http://localhost:5173

### Comandos Alternativos

Se `npm run dev` não funcionar, execute separadamente:

```bash
# Terminal 1 - Servidor (porta 3000)
npm run server

# Terminal 2 - Cliente (porta 5173)
npm run client
```

**Obs**: Antes de executar os comandos acima, garanta que ambos os terminais estejam abertos na pasta raiz do projeto (teste_docket).
