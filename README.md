 # MentisTech — Backend

API REST para plataforma de saúde mental corporativa, conectando colaboradores e psicólogos. Desenvolvida com NestJS, Prisma ORM e PostgreSQL.

---

## Tecnologias

| Categoria | Tecnologia |
|---|---|
| Framework | NestJS 11 |
| Linguagem | TypeScript 5.7 |
| ORM | Prisma 7.8 |
| Banco de dados | PostgreSQL |
| Validação | class-validator / class-transformer |
| Hashing | bcrypt |
| Testes | Jest 30 + ts-jest |

---

## Pré-requisitos

- Node.js >= 20
- npm >= 10
- PostgreSQL em execução

---

## Instalação

```bash
# 1. Clone o repositório
git clone <url-do-repositorio>
cd Topicos_Especiais_I_Backend/backend

# 2. Instale as dependências
npm install

# 3. Configure as variáveis de ambiente
cp .env.example .env
# Edite o .env com sua DATABASE_URL

# 4. Execute as migrations e gere o cliente Prisma
npx prisma migrate deploy
npx prisma generate
```

---

## Variáveis de Ambiente

Crie um arquivo `.env` na pasta `backend/` com:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/mentistech"
PORT=3000
```

---

## Scripts Disponíveis

```bash
# Desenvolvimento (hot reload)
npm run start:dev

# Produção
npm run build
npm run start:prod

# Testes unitários
npm test

# Testes com cobertura
npm run test:cov

# Testes e2e
npm run test:e2e

# Lint e formatação
npm run lint
npm run format
```

O servidor sobe por padrão em `http://localhost:3000`.

---

## Arquitetura

O projeto segue a arquitetura modular do NestJS. Cada recurso de domínio possui seu próprio módulo com controller, service e DTOs.

```
backend/src/
├── main.ts                    # Bootstrap da aplicação
├── app.module.ts              # Módulo raiz
├── database/
│   ├── prisma.module.ts
│   └── prisma.service.ts      # Cliente Prisma injetável
├── usuario/                   # Autenticação e cadastro
├── perfil_colaborador/        # Perfil do colaborador
├── perfil_psicologo/          # Perfil do psicólogo
├── checkin_emocional/         # Registro de humor diário
├── analise_ia/                # Análises geradas por IA
├── consulta/                  # Agendamento de consultas
└── disponibilidade/           # Agenda do psicólogo
```

---

## Modelo de Dados

### Diagrama de Entidades

```
Usuario (1) ──── (0..1) PerfilColaborador ──── (N) CheckinEmocional ──── (0..1) AnaliseIa
                                          ──── (N) Consulta
         (1) ──── (0..1) PerfilPsicologo  ──── (N) Consulta
                                          ──── (N) Disponibilidade

Consulta ──── (0..1) AnaliseIa
```

### Modelos

#### `Usuario`
| Campo | Tipo | Descrição |
|---|---|---|
| id | UUID | Chave primária |
| nome | String | Nome completo |
| email | String (unique) | E-mail de acesso |
| senhaHash | String | Senha em hash bcrypt |
| papel | Enum | `COLABORADOR` ou `PSICOLOGO` |
| criadoEm | DateTime | Data de criação |

#### `PerfilColaborador`
| Campo | Tipo | Descrição |
|---|---|---|
| id | UUID | Chave primária |
| usuarioId | UUID (FK) | Referência ao usuário |
| departamento | String | Departamento na empresa |
| cargo | String | Cargo ocupado |

#### `PerfilPsicologo`
| Campo | Tipo | Descrição |
|---|---|---|
| id | UUID | Chave primária |
| usuarioId | UUID (FK) | Referência ao usuário |
| crp | String | Número do CRP |
| especialidade | String | Área de especialização |

#### `CheckinEmocional`
| Campo | Tipo | Descrição |
|---|---|---|
| id | UUID | Chave primária |
| colaboradorId | UUID (FK) | Referência ao colaborador |
| humor | Enum | `MUITO_BEM`, `BEM`, `NEUTRO`, `MAL`, `MUITO_MAL` |
| nivelEstresse | Int | Nível de estresse (numérico) |
| realizadoEm | DateTime | Data e hora do check-in |

#### `AnaliseIa`
| Campo | Tipo | Descrição |
|---|---|---|
| id | UUID | Chave primária |
| checkinId | UUID (FK) | Referência ao check-in |
| respostaIa | String | Resposta gerada pela IA |
| conteudoPsicologico | String | Interpretação psicológica |
| geradoEm | DateTime | Data de geração |

#### `Consulta`
| Campo | Tipo | Descrição |
|---|---|---|
| id | UUID | Chave primária |
| colaboradorId | UUID (FK) | Referência ao colaborador |
| psicologoId | UUID (FK) | Referência ao psicólogo |
| analiseId | UUID (FK, opcional) | Análise de IA associada |
| dataHora | DateTime | Data e hora da consulta |
| status | Enum | `AGENDADA`, `REALIZADA`, `CANCELADA` |
| observacoes | String (opcional) | Observações adicionais |

#### `Disponibilidade`
| Campo | Tipo | Descrição |
|---|---|---|
| id | UUID | Chave primária |
| psicologoId | UUID (FK) | Referência ao psicólogo |
| diaSemana | Enum | `SEGUNDA` … `DOMINGO` |
| horaInicio | String | Hora de início (ex: `08:00`) |
| horaFim | String | Hora de fim (ex: `12:00`) |

---

## Endpoints

Todos os endpoints seguem o padrão REST. A porta padrão é `3000`.

| Método | Rota | Descrição |
|---|---|---|
| POST | `/usuario` | Criar usuário |
| GET | `/usuario` | Listar usuários |
| GET | `/usuario/:id` | Buscar usuário por ID |
| PATCH | `/usuario/:id` | Atualizar usuário |
| DELETE | `/usuario/:id` | Remover usuário |
| POST | `/perfil-colaborador` | Criar perfil de colaborador |
| GET | `/perfil-colaborador` | Listar perfis de colaboradores |
| GET | `/perfil-colaborador/:id` | Buscar perfil por ID |
| PATCH | `/perfil-colaborador/:id` | Atualizar perfil |
| DELETE | `/perfil-colaborador/:id` | Remover perfil |
| POST | `/perfil-psicologo` | Criar perfil de psicólogo |
| GET | `/perfil-psicologo` | Listar perfis de psicólogos |
| GET | `/perfil-psicologo/:id` | Buscar perfil por ID |
| PATCH | `/perfil-psicologo/:id` | Atualizar perfil |
| DELETE | `/perfil-psicologo/:id` | Remover perfil |
| POST | `/checkin-emocional` | Registrar check-in emocional |
| GET | `/checkin-emocional` | Listar check-ins |
| GET | `/checkin-emocional/:id` | Buscar check-in por ID |
| PATCH | `/checkin-emocional/:id` | Atualizar check-in |
| DELETE | `/checkin-emocional/:id` | Remover check-in |
| POST | `/analise-ia` | Criar análise de IA |
| GET | `/analise-ia` | Listar análises |
| GET | `/analise-ia/:id` | Buscar análise por ID |
| PATCH | `/analise-ia/:id` | Atualizar análise |
| DELETE | `/analise-ia/:id` | Remover análise |
| POST | `/consulta` | Agendar consulta |
| GET | `/consulta` | Listar consultas |
| GET | `/consulta/:id` | Buscar consulta por ID |
| PATCH | `/consulta/:id` | Atualizar consulta |
| DELETE | `/consulta/:id` | Remover consulta |
| POST | `/disponibilidade` | Cadastrar disponibilidade |
| GET | `/disponibilidade` | Listar disponibilidades |
| GET | `/disponibilidade/:id` | Buscar disponibilidade por ID |
| PATCH | `/disponibilidade/:id` | Atualizar disponibilidade |
| DELETE | `/disponibilidade/:id` | Remover disponibilidade |

---

## Testes

Os testes unitários ficam em `test/usuario/` e os stubs de smoke test em `src/*/`.

```bash
# Rodar todos os testes
npm test

# Rodar apenas os testes do módulo Usuario
npx jest --testPathPatterns="test/usuario" --no-coverage

# Cobertura completa
npm run test:cov
```

### Estrutura de testes

```
test/
├── __mocks__/
│   └── prisma-client.mock.ts   # Mock do PrismaClient (evita conexão real)
├── usuario/
│   ├── usuario.service.spec.ts  # 9 testes unitários do UsuarioService
│   └── usuario.controller.spec.ts # 5 testes unitários do UsuarioController
└── jest-e2e.json
```

---

## Validação

A validação de entrada é feita globalmente via `ValidationPipe` com `whitelist: true` — campos não declarados nos DTOs são automaticamente descartados.

Exemplo de payload para criação de usuário:

```json
{
  "nome": "João Silva",
  "email": "joao@empresa.com",
  "senha": "minimo6chars",
  "papel": "COLABORADOR"
}
```

---

## Licença

Projeto acadêmico — Tópicos Especiais I.
