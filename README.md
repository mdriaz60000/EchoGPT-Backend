# 🚀 EchoGPT Backend

> A modular AI-powered REST API built with **NestJS, PostgreSQL, Prisma, JWT Authentication, Swagger, and OpenAI**.

EchoGPT Backend is a secure and modular backend API for an AI-powered chat platform. It provides authentication, user management, subscriptions, AI provider management, conversational AI, web search, usage tracking, and admin management.

---

## ✨ Features

### 🔐 Authentication

* User registration
* User login
* Password hashing with bcrypt
* JWT access token
* Refresh token
* Session management
* Secure logout
* Protected routes
* JWT authentication guard
* Role-based access control
* USER and ADMIN roles

### 👤 User Management

* Get authenticated user profile
* Update profile
* Change password
* Delete account
* Session invalidation after password change
* Account active/inactive status

### 💳 Subscription Management

* FREE subscription
* PREMIUM subscription
* Subscription status
* Request limits
* Request usage tracking
* Upgrade/Downgrade plan
* Remaining request calculation

### 🤖 AI Provider Management

Supported providers:

* OpenAI
* Anthropic
* Gemini

Admin capabilities:

* Create AI provider
* Update provider
* Enable/disable provider
* Set default provider
* Delete provider
* View provider status

### 💬 AI Chat

* Send AI messages
* Create conversations
* Conversation history
* Message history
* AI provider selection
* Subscription usage validation
* AI response storage
* API usage logging

### 🔎 Web Search

* Search endpoint
* Search history
* Recent search records
* User-specific search data

### 📊 API Usage Logs

Tracks:

* User
* Provider
* Model
* Endpoint
* Success/failure
* HTTP status
* Request tokens
* Response tokens
* Total tokens
* Error messages
* Request timestamp

### 🛠️ Admin Management

Admin-only features:

* Dashboard statistics
* User management
* User activation/deactivation
* Subscription overview
* Usage analytics
* Provider overview
* System health monitoring

### 🧪 Developer Experience

* Swagger/OpenAPI documentation
* DTO validation
* Global validation pipe
* Global exception filter
* Modular NestJS architecture
* Prisma migrations
* Database seeding
* Docker support

---

# 🧰 Tech Stack

| Technology            | Purpose                 |
| --------------------- | ----------------------- |
| **NestJS**            | Backend framework       |
| **TypeScript**        | Programming language    |
| **PostgreSQL**        | Relational database     |
| **Prisma 7**          | ORM                     |
| **JWT**               | Authentication          |
| **Passport.js**       | Authentication strategy |
| **bcrypt**            | Password hashing        |
| **OpenAI SDK**        | AI integration          |
| **class-validator**   | DTO validation          |
| **Swagger / OpenAPI** | API documentation       |
| **Docker**            | Containerization        |

---

# 🏗️ Architecture

EchoGPT follows a **modular architecture** using NestJS.

The application is organized around business domains. Each feature is isolated inside `src/modules`, making the codebase easier to maintain, test, extend, and scale.

```text
src/
│
├── modules/
│   │
│   ├── auth/
│   │   ├── dto/
│   │   ├── guards/
│   │   ├── strategies/
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   └── auth.module.ts
│   │
│   ├── users/
│   │   ├── dto/
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   └── users.module.ts
│   │
│   ├── subscriptions/
│   │   ├── dto/
│   │   ├── subscriptions.controller.ts
│   │   ├── subscriptions.service.ts
│   │   └── subscriptions.module.ts
│   │
│   ├── providers/
│   │   ├── dto/
│   │   ├── aiProvider.service.ts
│   │   ├── providers.controller.ts
│   │   ├── providers.service.ts
│   │   └── providers.module.ts
│   │
│   ├── chat/
│   │   ├── dto/
│   │   ├── chat.controller.ts
│   │   ├── chat.service.ts
│   │   └── chat.module.ts
│   │
│   ├── web-search/
│   │   ├── dto/
│   │   ├── web-search.controller.ts
│   │   ├── web-search.service.ts
│   │   └── web-search.module.ts
│   │
│   ├── usage-logs/
│   │   ├── usage-logs.controller.ts
│   │   ├── usage-logs.service.ts
│   │   └── usage-logs.module.ts
│   │
│   └── admin/
│       ├── admin.controller.ts
│       ├── admin.service.ts
│       └── admin.module.ts
│
├── common/
│   ├── decorators/
│   ├── guards/
│   └── filters/
│
├── config/
│   └── env.config.ts
│
├── lib/
│   └── prisma.ts
│
├── generated/
│   └── prisma/
│
├── app.module.ts
└── main.ts
```

---

# 📦 Module Responsibilities

| Module                | Responsibility                                     |
| --------------------- | -------------------------------------------------- |
| `AuthModule`          | Registration, login, JWT, refresh token and logout |
| `UsersModule`         | Profile, password and account management           |
| `SubscriptionsModule` | FREE/PREMIUM plans and usage limits                |
| `ProvidersModule`     | AI provider configuration and management           |
| `ChatModule`          | AI chat, conversations and messages                |
| `WebSearchModule`     | Web search and search history                      |
| `UsageLogsModule`     | AI/API request usage tracking                      |
| `AdminModule`         | Dashboard, users, providers and system management  |

---

# 🔗 Module Architecture

```text
                    ┌─────────────────┐
                    │    AppModule    │
                    └────────┬────────┘
                             │
          ┌──────────────────┼──────────────────┐
          │                  │                  │
          ▼                  ▼                  ▼
     AuthModule         UsersModule       AdminModule
          │                  │                  │
          ▼                  ▼                  ▼
 SubscriptionsModule   UsageLogsModule   ProvidersModule
          │                                     │
          └────────────────┬────────────────────┘
                           │
                           ▼
                       ChatModule
                           │
                           ▼
                 AI Provider Service
                           │
                           ▼
                    OpenAI / AI APIs


                  WebSearchModule
                         │
                         ▼
                    Search Service
```

---

# 🧱 Application Layers

Each feature module generally follows:

```text
Controller
    │
    ▼
Service
    │
    ▼
Prisma Client
    │
    ▼
PostgreSQL
```

Shared infrastructure is kept outside feature modules:

```text
common/
├── decorators/
├── guards/
└── filters/

config/
└── env.config.ts

lib/
└── prisma.ts
```

---

# 🗄️ Database Architecture

EchoGPT uses **PostgreSQL** with **Prisma 7**.

```text
NestJS Modules
       │
       ▼
 Prisma Client
       │
       ▼
 PostgreSQL
```

### Main entities

```text
User
 │
 ├── Session
 ├── Subscription
 ├── Conversation
 │      └── Message
 │
 ├── WebSearch
 └── ApiUsageLog

AiProvider
```

### Relationships

```text
User 1 ──── N Session

User 1 ──── 1 Subscription

User 1 ──── N Conversation

Conversation 1 ──── N Message

User 1 ──── N WebSearch

User 1 ──── N ApiUsageLog
```

---

# 🧬 Prisma Structure

```text
prisma/
│
├── schema.prisma
│
├── models/
│   ├── user.prisma
│   ├── session.prisma
│   ├── subscription.prisma
│   ├── ai-provider.prisma
│   ├── conversation.prisma
│   ├── message.prisma
│   ├── web-search.prisma
│   └── api-usage-log.prisma
│
├── enums/
│   ├── role.prisma
│   ├── subscription-status.prisma
│   └── provider-type.prisma
│
├── migrations/
└── seed.ts
```

Prisma Client is generated into:

```text
src/generated/prisma/
```

---

# 🔐 Authentication Flow

EchoGPT uses JWT access tokens and refresh tokens.

```text
Register
   │
   ▼
Hash Password
   │
   ▼
Create User
   │
   ▼
Login
   │
   ├───────────────┐
   ▼               ▼
Access Token    Refresh Token
                   │
                   ▼
                Session
```

Protected requests use:

```http
Authorization: Bearer <access-token>
```

JWT payload contains:

```text
sub
email
role
```

---

# 👮 Role-Based Access Control

EchoGPT supports:

```text
USER
ADMIN
```

Admin endpoints use:

```text
JwtAuthGuard
      +
RolesGuard
      +
ADMIN role
```

Example:

```ts
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
```

This prevents regular users from accessing administrative resources.

---

# 📚 Swagger / OpenAPI

EchoGPT uses Swagger/OpenAPI for interactive API documentation.

After starting the application:

```text
http://localhost:5000/docs
```

Swagger provides:

* Endpoint documentation
* Request/response schemas
* DTO validation information
* JWT Bearer authentication
* Protected endpoint testing
* Interactive API testing

### Swagger Authentication

1. Login through:

```text
POST /auth/login
```

2. Copy the returned access token.

3. Click **Authorize** in Swagger.

4. Enter:

```text
Bearer <your-access-token>
```

5. Click **Authorize**.

Protected endpoints can now be tested directly from Swagger UI.

---

# 📡 API Endpoints

## 🔐 Authentication

```text
POST /auth/register
POST /auth/login
POST /auth/refresh
POST /auth/logout
```

### Register

```http
POST /auth/register
Content-Type: application/json
```

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password123"
}
```

### Login

```http
POST /auth/login
Content-Type: application/json
```

```json
{
  "email": "john@example.com",
  "password": "Password123"
}
```

---

# 👤 Users

All user endpoints require authentication.

```text
GET    /users/me
PATCH  /users/me
PATCH  /users/me/password
DELETE /users/me
```

### Get Profile

```http
GET /users/me
Authorization: Bearer <access-token>
```

### Update Profile

```http
PATCH /users/me
```

### Change Password

```http
PATCH /users/me/password
```

### Delete Account

```http
DELETE /users/me
```

User self-service resources are resolved from the authenticated JWT.

---

# 💳 Subscriptions

```text
GET   /subscriptions
PATCH /subscriptions/plan
GET   /subscriptions/usage
```

Supported plans:

```text
FREE
PREMIUM
```

Example usage response:

```json
{
  "plan": "FREE",
  "requestLimit": 50,
  "usedRequests": 10,
  "remainingRequests": 40
}
```

---

# 🤖 AI Providers

AI provider management is restricted to administrators.

```text
POST   /providers
GET    /providers
GET    /providers/:id
PATCH  /providers/:id
DELETE /providers/:id
PATCH  /providers/:id/toggle
PATCH  /providers/:id/default
```

Supported providers:

```text
OPENAI
ANTHROPIC
GEMINI
```

Provider management supports:

* Provider creation
* Provider update
* Enable/disable
* Default provider
* Provider deletion

---

# 💬 Chat

Authenticated users can interact with the configured AI provider.

```text
POST   /chat
GET    /chat/conversations
GET    /chat/conversations/:id
DELETE /chat/conversations/:id
```

Example:

```http
POST /chat
Authorization: Bearer <access-token>
Content-Type: application/json
```

```json
{
  "message": "Explain REST API in simple terms",
  "provider": "OPENAI"
}
```

### Chat Flow

```text
User Request
     │
     ▼
Authentication
     │
     ▼
Subscription Check
     │
     ▼
Usage Limit Check
     │
     ▼
Provider Selection
     │
     ▼
AI Provider Service
     │
     ▼
AI Response
     │
     ▼
Save Messages
     │
     ▼
Usage Log
     │
     ▼
Return Response
```

---

# 🔎 Web Search

```text
POST /web-search
GET  /web-search/history
```

Example:

```json
{
  "query": "NestJS authentication"
}
```

Search records are associated with the authenticated user.

---

# 📊 API Usage Logs

```text
GET /usage-logs
```

Usage logs can contain:

```text
User
Provider
Model
Endpoint
Success
Status Code
Request Tokens
Response Tokens
Total Tokens
Error Message
Created At
```

---

# 🛠️ Admin API

All admin endpoints require JWT authentication and the `ADMIN` role.

```text
GET   /admin/dashboard

GET   /admin/users

PATCH /admin/users/:id/status

GET   /admin/subscriptions

GET   /admin/usage

GET   /admin/providers

GET   /admin/system-health
```

### Dashboard statistics

The dashboard provides information such as:

* Total users
* Active users
* Inactive users
* Premium users
* Free users
* Enabled providers
* Disabled providers
* Conversations
* Messages
* Web searches
* API usage logs

---

# ❤️ System Health

```text
GET /admin/system-health
```

The system health endpoint checks important application dependencies such as:

```text
Database
AI Providers
Application status
```

---

# 🛡️ Error Handling

EchoGPT uses a global exception filter.

Example response:

```json
{
  "success": false,
  "statusCode": 404,
  "message": "User not found",
  "path": "/users/me",
  "method": "GET",
  "timestamp": "2026-09-28T10:00:00.000Z"
}
```

Common status codes:

```text
400  Bad Request
401  Unauthorized
403  Forbidden
404  Not Found
409  Conflict
500  Internal Server Error
```

---

# ✅ Request Validation

Global validation is configured in `main.ts`.

```ts
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
    transform: true,
  }),
);
```

This provides:

* DTO validation
* Automatic type transformation
* Removal of unexpected properties
* Consistent validation errors

---

# 🔑 Environment Variables

Create a `.env` file in the project root.

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/echogpt?schema=public"

PORT=5000

JWT_ACCESS_SECRET="your-access-secret"
JWT_REFRESH_SECRET="your-refresh-secret"

ADMIN_EMAIL="admin@echogpt.com"
ADMIN_PASSWORD="your-admin-password"

OPENAI_API_KEY="your-openai-api-key"
```

### `.env.example`

Commit only `.env.example` to GitHub:

```env
DATABASE_URL="your-postgresql-database-url"

PORT=5000

JWT_ACCESS_SECRET="your-access-secret"
JWT_REFRESH_SECRET="your-refresh-secret"

ADMIN_EMAIL="admin@echogpt.com"
ADMIN_PASSWORD="your-admin-password"

OPENAI_API_KEY="your-openai-api-key"
```

> Never commit real API keys, passwords, JWT secrets, or database credentials.

---

# 🚀 Local Development

## 1. Clone Repository

```bash
git clone https://github.com/your-username/echogpt-backend.git
```

```bash
cd echogpt-backend
```

## 2. Install Dependencies

```bash
npm install
```

## 3. Configure Environment

Create:

```text
.env
```

and configure the required environment variables.

## 4. Generate Prisma Client

```bash
npx prisma generate
```

## 5. Run Database Migration

Development:

```bash
npx prisma migrate dev
```

Production:

```bash
npx prisma migrate deploy
```

## 6. Seed Admin

```bash
npx tsx prisma/seed.ts
```

The admin email and password are loaded from environment variables.

## 7. Start Development Server

```bash
npm run start:dev
```

Application:

```text
http://localhost:5000
```

Swagger:

```text
http://localhost:5000/docs
```

---

# 🐳 Docker

The project supports Docker for containerized deployment.

### Start services

```bash
docker compose up -d
```

### Build containers

```bash
docker compose build
```

### Check containers

```bash
docker ps
```

### View logs

```bash
docker compose logs -f
```

### Stop services

```bash
docker compose down
```

### Remove containers and database volume

```bash
docker compose down -v
```

> `docker compose down -v` removes the PostgreSQL volume and permanently deletes the stored database data.

---

# 🧪 Development Commands

### Start development server

```bash
npm run start:dev
```

### Build application

```bash
npm run build
```

### Start production

```bash
npm run start:prod
```

### Generate Prisma Client

```bash
npx prisma generate
```

### Create migration

```bash
npx prisma migrate dev
```

### Migration status

```bash
npx prisma migrate status
```

### Deploy migrations

```bash
npx prisma migrate deploy
```

### Seed database

```bash
npx tsx prisma/seed.ts
```

---

# 📁 Complete Project Structure

```text
echogpt/
│
├── prisma/
│   ├── models/
│   │   ├── user.prisma
│   │   ├── session.prisma
│   │   ├── subscription.prisma
│   │   ├── ai-provider.prisma
│   │   ├── conversation.prisma
│   │   ├── message.prisma
│   │   ├── web-search.prisma
│   │   └── api-usage-log.prisma
│   │
│   ├── enums/
│   │   ├── role.prisma
│   │   ├── subscription-status.prisma
│   │   └── provider-type.prisma
│   │
│   ├── migrations/
│   ├── schema.prisma
│   └── seed.ts
│
├── src/
│   │
│   ├── modules/
│   │   │
│   │   ├── auth/
│   │   │   ├── dto/
│   │   │   ├── guards/
│   │   │   ├── strategies/
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   └── auth.module.ts
│   │   │
│   │   ├── users/
│   │   │   ├── dto/
│   │   │   ├── users.controller.ts
│   │   │   ├── users.service.ts
│   │   │   └── users.module.ts
│   │   │
│   │   ├── subscriptions/
│   │   │   ├── dto/
│   │   │   ├── subscriptions.controller.ts
│   │   │   ├── subscriptions.service.ts
│   │   │   └── subscriptions.module.ts
│   │   │
│   │   ├── providers/
│   │   │   ├── dto/
│   │   │   ├── aiProvider.service.ts
│   │   │   ├── providers.controller.ts
│   │   │   ├── providers.service.ts
│   │   │   └── providers.module.ts
│   │   │
│   │   ├── chat/
│   │   │   ├── dto/
│   │   │   ├── chat.controller.ts
│   │   │   ├── chat.service.ts
│   │   │   └── chat.module.ts
│   │   │
│   │   ├── web-search/
│   │   │   ├── dto/
│   │   │   ├── web-search.controller.ts
│   │   │   ├── web-search.service.ts
│   │   │   └── web-search.module.ts
│   │   │
│   │   ├── usage-logs/
│   │   │   ├── usage-logs.controller.ts
│   │   │   ├── usage-logs.service.ts
│   │   │   └── usage-logs.module.ts
│   │   │
│   │   └── admin/
│   │       ├── admin.controller.ts
│   │       ├── admin.service.ts
│   │       └── admin.module.ts
│   │
│   ├── common/
│   │   ├── decorators/
│   │   ├── guards/
│   │   └── filters/
│   │
│   ├── config/
│   │   └── env.config.ts
│   │
│   ├── lib/
│   │   └── prisma.ts
│   │
│   ├── generated/
│   │   └── prisma/
│   │
│   ├── app.module.ts
│   └── main.ts
│
├── .dockerignore
├── .env
├── .env.example
├── .gitignore
├── Dockerfile
├── docker-compose.yml
├── package.json
├── package-lock.json
├── prisma7.config.ts
├── tsconfig.json
└── README.md
```

---

# 🔄 Request Flow

### Standard API request

```text
Client
  │
  ▼
Controller
  │
  ▼
JWT Auth Guard
  │
  ▼
Roles Guard
  │
  ▼
DTO Validation
  │
  ▼
Service
  │
  ▼
Prisma Client
  │
  ▼
PostgreSQL
```

### AI Chat request

```text
Client
  │
  ▼
ChatController
  │
  ▼
JWT Authentication
  │
  ▼
Subscription Check
  │
  ▼
Usage Limit Check
  │
  ▼
Provider Selection
  │
  ▼
AI Provider Service
  │
  ▼
OpenAI / AI Provider
  │
  ▼
Save Message
  │
  ▼
Usage Log
  │
  ▼
Response
```

---

# 🔒 Security Practices

The project implements several security practices:

* Password hashing with bcrypt
* JWT authentication
* Refresh token sessions
* Role-based authorization
* Protected admin routes
* DTO validation
* Whitelisted request properties
* Environment-based secrets
* Authenticated user resource isolation
* Session invalidation after password change
* Admin-only AI provider management
* Global exception handling
* API usage logging
* Sensitive configuration excluded from Git

---

# 📋 Assignment Coverage

| Requirement             | Status |
| ----------------------- | :----: |
| User Registration       |    ✅   |
| User Login              |    ✅   |
| Password Hashing        |    ✅   |
| JWT Authentication      |    ✅   |
| Refresh Token           |    ✅   |
| Secure Logout           |    ✅   |
| User Profile            |    ✅   |
| Update Profile          |    ✅   |
| Change Password         |    ✅   |
| Delete Account          |    ✅   |
| User/Admin Roles        |    ✅   |
| Subscription Plans      |    ✅   |
| Usage Limits            |    ✅   |
| AI Provider Management  |    ✅   |
| Provider Enable/Disable |    ✅   |
| Default Provider        |    ✅   |
| AI Chat                 |    ✅   |
| Conversation History    |    ✅   |
| Message History         |    ✅   |
| Web Search              |    ✅   |
| Search History          |    ✅   |
| API Usage Logs          |    ✅   |
| Admin Dashboard         |    ✅   |
| Usage Analytics         |    ✅   |
| System Health           |    ✅   |
| PostgreSQL              |    ✅   |
| Prisma                  |    ✅   |
| Swagger                 |    ✅   |
| DTO Validation          |    ✅   |
| Global Error Handling   |    ✅   |
| Docker Support          |    ✅   |

---

# 🔮 Future Improvements

Planned or possible improvements:

* Email verification
* Forgot/reset password
* Refresh-token hashing
* API-key encryption at rest
* Full Anthropic integration
* Full Gemini integration
* Provider-specific model selection
* Streaming AI responses
* Real web-search API integration
* Redis caching
* Rate limiting
* Request throttling
* Automated unit tests
* E2E tests
* CI/CD pipeline
* Advanced token/cost analytics
* Background job processing
* Production monitoring

---

# 👨‍💻 Author

## Mohammad Riaz

Junior Web Developer focused on modern backend and full-stack development.

### Tech Focus

```text
TypeScript
Node.js
NestJS
Express.js
React
Next.js
PostgreSQL
MongoDB
Prisma
Docker
AWS
```

### Links

* GitHub: https://github.com/mdriaz60000
* Portfolio: https://mohammad-riaz.vercel.app
* LinkedIn: https://linkedin.com/in/mohammadriaz60

---

# 📄 License

This project was developed as a software engineering internship assignment and for educational purposes.
