# API Backend +A Educação

<p align="center">
  <img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB" alt="Express.js" />
  <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" alt="Prisma" />
  <img src="https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens" alt="JWT" />
</p>

## 📋 Índice

- [Visão Geral](#-visão-geral)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Modelos de Dados](#-modelos-de-dados)
- [Endpoints da API](#-endpoints-da-api)
- [Instalação e Configuração](#-instalação-e-configuração)
- [Scripts Disponíveis](#-scripts-disponíveis)
- [Validação de Dados](#-validação-de-dados)
- [Segurança](#-segurança)
- [Boas Práticas](#-boas-práticas)
- [Próximos Passos](#-próximos-passos)

## 🚀 Visão Geral

Este projeto é uma API RESTful desenvolvida para o desafio +A Educação - Full Stack Web Developer. A API fornece funcionalidades de autenticação, gerenciamento de usuários e estudantes, utilizando tecnologias modernas como Node.js, Express, TypeScript e Prisma ORM.

## 📁 Estrutura do Projeto

```
├── prisma/                  # Configuração do Prisma ORM
│   ├── migrations/          # Migrações do banco de dados
│   └── schema.prisma        # Schema do banco de dados
├── src/                     # Código fonte da aplicação
│   ├── config/              # Configurações da aplicação
│   ├── controller/          # Controladores da API
│   │   ├── auth/            # Controladores de autenticação
│   │   ├── student/         # Controladores de estudantes
│   │   └── user/            # Controladores de usuários
│   ├── middlewares/         # Middlewares da aplicação
│   │   └── auth/            # Middlewares de autenticação
│   ├── models/              # Modelos de dados
│   │   ├── auth/            # Modelos de autenticação
│   │   ├── student/         # Modelos de estudantes
│   │   └── user/            # Modelos de usuários
│   ├── routes/              # Rotas da API
│   ├── services/            # Serviços da aplicação
│   ├── types/               # Tipos TypeScript
│   ├── utils/               # Utilitários
│   │   └── jwt/             # Utilitários JWT
│   ├── validates/           # Validação de dados
│   └── server.ts            # Ponto de entrada da aplicação
├── .env.example             # Exemplo de variáveis de ambiente
├── .gitignore               # Arquivos ignorados pelo Git
├── .prettierrc              # Configuração do Prettier
├── eslint.config.mjs        # Configuração do ESLint
├── package.json             # Dependências e scripts
├── tsconfig.json            # Configuração do TypeScript
└── README.md                # Documentação do projeto
```

## 🛠️ Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript server-side
- **Express**: Framework web para Node.js
- **TypeScript**: Superset tipado de JavaScript
- **Prisma ORM**: ORM (Object-Relational Mapping) para Node.js e TypeScript
- **SQLite**: Banco de dados relacional leve
- **JWT (JSON Web Tokens)**: Para autenticação e autorização
- **Bcrypt**: Para hash de senhas
- **Zod**: Para validação de dados
- **Nodemon**: Para reinicialização automática do servidor durante o desenvolvimento
- **ESLint & Prettier**: Para linting e formatação de código

## 📊 Modelos de Dados

### User

```typescript
model User {
  id        Int      @id @default(autoincrement())
  nameUser  String   @unique
  email     String   @unique
  password  String
  isActive  Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("users")
}
```

### Student

```typescript
model Student {
  id        Int      @id @default(autoincrement())
  name      String   @unique
  email     String   @unique
  RA        String   @unique
  CPF       String   @unique
}
```

## 🔗 Endpoints da API

### Autenticação

- **POST /api/auth/register**: Registra um novo usuário
  ```json
  {
    "nameUser": "exemplo",
    "email": "exemplo@email.com",
    "password": "senha123",
    "isActive": true
  }
  ```

- **POST /api/auth/login**: Autentica um usuário
  ```json
  {
    "email": "exemplo@email.com",
    "password": "senha123"
  }
  ```
  Resposta:
  ```json
  {
    "success": true,
    "data": {
      "name": "exemplo",
      "email": "exemplo@email.com",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
  }
  ```

### Usuários

- **GET /api/auth/users**: Lista todos os usuários

- **PUT /api/auth/user**: Atualiza informações do usuário (requer autenticação)
  ```json
  {
    "id": 1,
    "newEmail": "novo@email.com",
    "newNameUser": "novoNome",
    "newPassword": "novaSenha123"
  }
  ```

- **PUT /api/auth/user/deactivate**: Desativa um usuário (requer autenticação)
  ```json
  {
    "userId": 1
  }
  ```

- **PUT /api/auth/user/activate**: Ativa um usuário (requer autenticação)
  ```json
  {
    "userId": 1
  }
  ```

### Estudantes

- **POST /api/student/create**: Cria um novo estudante
  ```json
  {
    "name": "Nome do Estudante",
    "email": "estudante@email.com",
    "CPF": "12345678900"
  }
  ```
  Resposta:
  ```json
  {
    "id": 1,
    "name": "Nome do Estudante",
    "email": "estudante@email.com",
    "RA": "1234567",
    "CPF": "12345678900"
  }
  ```

## 🔧 Instalação e Configuração

### Pré-requisitos

- Node.js (v14 ou superior)
- npm ou yarn

### Passos para Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/grupo-a/challenge-full-stack-web.git
   cd Backend
   ```

2. Instale as dependências:
   ```bash
   npm install
   # ou
   yarn
   ```

3. Configure as variáveis de ambiente:
   ```bash
   cp .env.example .env
   # Edite o arquivo .env com suas configurações
   ```

4. Execute as migrações do banco de dados:
   ```bash
   npm run migrate
   # ou
   yarn migrate
   ```

5. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

## 📜 Scripts Disponíveis

- **build**: Compila o projeto TypeScript
  ```bash
  npm run build
  ```

- **start**: Inicia o servidor em modo produção
  ```bash
  npm start
  ```

- **dev**: Inicia o servidor em modo desenvolvimento com hot-reload
  ```bash
  npm run dev
  ```

- **lint**: Executa o linter no código
  ```bash
  npm run lint
  ```

- **lint:fix**: Corrige automaticamente problemas de linting
  ```bash
  npm run lint:fix
  ```

- **format**: Formata o código usando Prettier
  ```bash
  npm run format
  ```

- **type-check**: Verifica tipos TypeScript sem gerar arquivos
  ```bash
  npm run type-check
  ```

- **generate**: Gera o cliente Prisma
  ```bash
  npm run generate
  ```

- **migrate**: Executa migrações do banco de dados
  ```bash
  npm run migrate
  ```

- **studio**: Inicia o Prisma Studio para visualização do banco de dados
  ```bash
  npm run studio
  ```

## 🔍 Validação de Dados

O projeto utiliza a biblioteca Zod para validação de dados de entrada. Exemplos de validação:

```typescript
// Validação de login
export const loginUserSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

// Validação de atualização de usuário
export const updateUserControllerSchema = z.object({
  id: z.number().int("ID deve ser um número inteiro"),
  newEmail: z.string().email("Email inválido").optional(),
  newNameUser: z
    .string()
    .min(2, "Nome deve ter no mínimo 2 caracteres")
    .optional(),
  newPassword: z
    .string()
    .min(6, "Senha deve ter no mínimo 6 caracteres")
    .optional(),
});
```

## 🔒 Segurança

### Autenticação JWT

O projeto utiliza JSON Web Tokens (JWT) para autenticação. O middleware `authenticateJWT` verifica a validade do token em rotas protegidas:

```typescript
export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token não fornecido" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const secret = process.env.JWT_SECRET || "seu_jwt_secret";
    const decoded = jwt.verify(token, secret) as JwtPayload;
    (req as Request & { user: JwtPayload }).user = decoded;
    next();
  } catch (error) {
    console.error("Erro ao verificar o token:", error);
    return res.status(401).json({ error: "Token inválido ou expirado" });
  }
};
```

### Hash de Senhas

As senhas são armazenadas de forma segura utilizando bcrypt para hash:

```typescript
// Exemplo de verificação de senha no login
const isPasswordValid = await bcrypt.compare(password, user.password);
```

## 🌟 Boas Práticas

### Arquitetura MVC

O projeto segue uma arquitetura MVC (Model-View-Controller) adaptada para APIs:
- **Models**: Lógica de negócios e interação com o banco de dados
- **Controllers**: Manipulação de requisições e respostas
- **Routes**: Definição de endpoints da API

### Tratamento de Erros

O projeto implementa tratamento de erros consistente em todos os controllers:

```typescript
try {
  // Lógica do controller
} catch (error) {
  console.error("Erro:", error);
  
  // Tratamento específico de erros conhecidos
  if (error instanceof Error) {
    if (error.message === "Usuário não encontrado") {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
  }
  
  // Erro genérico
  return res.status(500).json({ error: "Erro interno do servidor" });
}
```

### Validação de Dados

Toda entrada de dados é validada usando Zod antes de ser processada:

```typescript
const validationResult = loginUserSchema.safeParse(req.body);

if (!validationResult.success) {
  res.status(400).json({
    errors: validationResult.error.errors.map(err => ({
      field: err.path.join("."),
      message: err.message,
    })),
  });
  return;
}
```

### Código Limpo

- Nomes de variáveis e funções descritivos
- Funções pequenas e com responsabilidade única
- Separação de preocupações (separation of concerns)
- Uso de interfaces TypeScript para tipagem

## 🔮 Próximos Passos

- Implementar testes unitários e de integração
- Adicionar documentação da API com Swagger/OpenAPI
- Implementar sistema de logs mais robusto
- Adicionar paginação nas rotas de listagem
- Implementar cache para melhorar performance
- Adicionar monitoramento e métricas
- Expandir funcionalidades de estudantes
- Implementar sistema de recuperação de senha

---

Desenvolvido para o desafio +A Educação - Full Stack Web Developer.