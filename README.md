# 🚀 EchoGPT Backend

> A production-oriented REST API for an AI-powered chat platform, built with **NestJS, PostgreSQL, Prisma, JWT Authentication, and OpenAI**.

EchoGPT Backend provides secure authentication, user management, subscription and usage control, AI provider management, conversational AI, web-search history, API usage logging, and admin management.

---

## ✨ Features

### 🔐 Authentication & Security

* User registration and login
* Password hashing with `bcrypt`
* JWT access tokens
* Refresh token authentication
* Secure logout
* Protected routes
* Role-based access control
* Admin/User roles
* Account activation/deactivation
* Global request validation
* Centralized exception handling

### 👤 User Management

* View authenticated user profile
* Update profile
* Change password
* Delete account
* Session invalidation after password change

### 💳 Subscription Management

* Free and Premium plans
* Subscription status
* Request limits
* Usage tracking
* Upgrade/Downgrade subscription
* Remaining request calculation
* Automatic usage reset on plan change

### 🤖 AI Provider Management

Supported providers:

* OpenAI
* Anthropic
* Gemini

Admin capabilities:

* Add provider
* Update provider
* Enable/disable provider
* Set default provider
* Delete provider
* Provider health monitoring

### 💬 AI Chat

* Send AI prompts
* Conversation creation
* Conversation history
* Message history
* Provider selection
* Subscription usage validation
* AI request usage logging

### 🔎 Web Search

* Search endpoint
* Search history
* Recent searches
* User-specific search records

### 📊 API Usage Logs

Tracks:

* User
* Provider
* Model
* Endpoint
* Success/failure
* HTTP status
* Token usage
* Error messages
* Request timestamp

### 🛠️ Admin Dashboard

Admin-only endpoints for:

* System statistics
* User management
* Subscription statistics
* Provider monitoring
* Usage analytics
* API usage logs
* System health

---

# 🧰 Tech Stack

| Technology          | Purpose                 |
| ------------------- | ----------------------- |
| **NestJS**          | Backend framework       |
| **TypeScript**      | Programming language    |
| **PostgreSQL**      | Relational database     |
| **Prisma 7**        | ORM                     |
| **JWT**             | Authentication          |
| **Passport.js**     | Authentication strategy |
| **bcrypt**          | Password hashing        |
| **OpenAI SDK**      | AI integration          |
| **class-validator** | DTO validation          |
| **Swagger**         | API documentation       |
| **Docker**          | Containerization        |

---

# 🏗️ Architecture

The project follows a modular NestJS architecture.

```text
src/
├── auth/
├── users/
├── subscriptions/
├── providers/
├── chat/
├── web-search/
├── usage-logs/
├── admin/
│
├── common/
│   ├── decorators/
│   ├── guards/
│   └── filters/
│
├── config/
├── lib/
│   └── prisma.ts
│
├── generated/
│   └── prisma/
│
├── app.module.ts
└── main.ts
```

### Prisma

```text
prisma/
├── schema.prisma
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

---

# 🗄️ Database Design

The application uses PostgreSQL with Prisma.

### Core entities

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

### Main relationships

```text
User 1 ──── N Session

User 1 ──── 1 Subscription

User 1 ──── N Conversation

Conversation 1 ──── N Message

User 1 ──── N WebSearch

User 1 ──── N ApiUsageLog
```

---

# 🔐 Authentication Flow

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
   ├── Access Token
   │
   └── Refresh Token
          │
          ▼
       Session
```

Protected requests use:

```http
Authorization: Bearer <access_token>
```

JWT payload contains the authenticated user's:

```text
user id
email
role
```

---

# 👮 Role-Based Access Control

EchoGPT currently supports:

```text
USER
ADMIN
```

Example:

```text
JWT Authentication
        │
        ▼
    RolesGuard
        │
        ▼
    ADMIN endpoint
```

Admin routes require:

```text
JwtAuthGuard
+
RolesGuard
+
ADMIN role
```

---

# ⚙️ Environment Variables

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

> Never commit `.env` or real API keys to GitHub.

Use `.env.example` for public configuration documentation.

---

# 🚀 Local Development

## 1. Clone

```bash
git clone https://github.com/your-username/echogpt-backend.git
```

```bash
cd echogpt-backend
```

## 2. Install dependencies

```bash
npm install
```

## 3. Configure environment

Create:

```text
.env
```

and add the required environment variables.

## 4. Generate Prisma Client

```bash
npx prisma generate
```

## 5. Run migrations

```bash
npx prisma migrate dev
```

## 6. Create admin account

```bash
npx tsx prisma/seed.ts
```

## 7. Start development server

```bash
npm run start:dev
```

Server:

```text
http://localhost:5000
```

API documentation:

```text
http://localhost:5000/docs
```

---

# 🐳 Docker

The project includes Docker support for PostgreSQL and the NestJS application.

### Start containers

```bash
docker compose up -d
```

### Check running containers

```bash
docker ps
```

### Stop containers

```bash
docker compose down
```

### Stop and remove database volume

```bash
docker compose down -v
```

> `docker compose down -v` permanently removes the PostgreSQL Docker volume and its stored database data.

---

# 🧪 Testing the API

You can use:

* Swagger UI
* Postman
* Insomnia
* REST Client
* cURL

Example:

```http
POST /auth/login
Content-Type: application/json
```

```json
{
  "email": "admin@echogpt.com",
  "password": "your-admin-password"
}
```

Then use the returned access token:

```http
Authorization: Bearer <access_token>
```

---

# 📡 API Overview

## Authentication

```text
POST   /auth/register
POST   /auth/login
POST   /auth/refresh
POST   /auth/logout
```

## Users

```text
GET    /users/me
PATCH  /users/me
PATCH  /users/me/password
DELETE /users/me
```

## Subscriptions

```text
GET    /subscriptions
PATCH  /subscriptions/plan
GET    /subscriptions/usage
```

## AI Providers

```text
POST   /providers
GET    /providers
GET    /providers/:id
PATCH  /providers/:id
DELETE /providers/:id
PATCH  /providers/:id/toggle
PATCH  /providers/:id/default
```

Provider management is restricted to administrators.

## Chat

```text
POST   /chat
GET    /chat/conversations
GET    /chat/conversations/:id
DELETE /chat/conversations/:id
```

## Web Search

```text
POST   /web-search
GET    /web-search/history
```

## Usage Logs

```text
GET    /usage-logs
```

## Admin

```text
GET    /admin/dashboard
GET    /admin/users
PATCH  /admin/users/:id/status
GET    /admin/subscriptions
GET    /admin/usage
GET    /admin/providers
GET    /admin/system-health
```

---

# 🛡️ Error Handling

The API uses a global exception filter to return a consistent response format.

Example:

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

Common HTTP responses:

```text
400  Bad Request
401  Unauthorized
403  Forbidden
404  Not Found
409  Conflict
500  Internal Server Error
```

---

# 📈 Subscription Usage Flow

```text
User sends message
        │
        ▼
Check subscription
        │
        ▼
Check request limit
        │
        ├── Limit exceeded → Reject
        │
        ▼
Select AI provider
        │
        ▼
Send request to AI
        │
        ├── Failed → Log failure
        │
        ▼
Save AI response
        │
        ▼
Increment usage
        │
        ▼
Return response
```

This prevents failed AI requests from being counted as successful usage.

---

# 🔑 Security Considerations

The project implements several security practices:

* Passwords hashed using bcrypt
* JWT-based authentication
* Role-based authorization
* Protected routes
* DTO validation
* Whitelisted request properties
* Environment-based secrets
* User-specific resource access
* Session invalidation
* Admin-only provider management
* Centralized exception handling
* API usage tracking

Sensitive credentials should never be committed to source control.

---

# 🧑‍💻 Development Commands

```bash
# Development
npm run start:dev

# Production build
npm run build

# Production
npm run start:prod

# Prisma client
npx prisma generate

# Create migration
npx prisma migrate dev

# Apply production migrations
npx prisma migrate deploy

# Database status
npx prisma migrate status

# Seed admin
npx tsx prisma/seed.ts
```

---

# 📁 Project Structure

```text
echogpt/
│
├── prisma/
│   ├── models/
│   ├── enums/
│   ├── migrations/
│   ├── schema.prisma
│   └── seed.ts
│
├── src/
│   ├── auth/
│   ├── users/
│   ├── subscriptions/
│   ├── providers/
│   ├── chat/
│   ├── web-search/
│   ├── usage-logs/
│   ├── admin/
│   │
│   ├── common/
│   │   ├── decorators/
│   │   ├── guards/
│   │   └── filters/
│   │
│   ├── config/
│   ├── lib/
│   ├── generated/
│   ├── app.module.ts
│   └── main.ts
│
├── .env.example
├── .gitignore
├── Dockerfile
├── docker-compose.yml
├── prisma7.config.ts
├── package.json
└── README.md
```

---

# 🎯 Assignment Coverage

| Requirement            | Status |
| ---------------------- | ------ |
| User Registration      | ✅      |
| Login                  | ✅      |
| Password Hashing       | ✅      |
| JWT Authentication     | ✅      |
| Refresh Token          | ✅      |
| Logout                 | ✅      |
| User Profile           | ✅      |
| Change Password        | ✅      |
| Account Deletion       | ✅      |
| Role Management        | ✅      |
| Subscription           | ✅      |
| Usage Limits           | ✅      |
| AI Provider Management | ✅      |
| AI Chat                | ✅      |
| Conversation History   | ✅      |
| Web Search             | ✅      |
| API Usage Logs         | ✅      |
| Admin Dashboard        | ✅      |
| System Health          | ✅      |
| Global Validation      | ✅      |
| Global Error Handling  | ✅      |
| Docker                 | ✅      |
| PostgreSQL             | ✅      |
| Prisma                 | ✅      |
| Swagger                | ✅      |

---

# 🔮 Future Improvements

Potential next-stage improvements:

* Email verification
* Password reset
* Refresh-token hashing
* API key encryption at rest
* Streaming AI responses
* Real web-search provider integration
* Redis caching
* Rate limiting
* Background jobs
* Advanced request analytics
* Automated tests
* CI/CD pipeline
* Multi-provider model selection
* Token-based billing

---

# 👨‍💻 Author

**Mohammad Riaz**

Web Developer | NestJS | Node.js | React | Next.js | PostgreSQL

* GitHub: `https://github.com/mdriaz60000`
* Portfolio: `https://mohammad-riaz.vercel.app`
* LinkedIn: `https://linkedin.com/in/mohammadriaz60`

---

## 📄 License

This project was developed for educational and software engineering internship purposes.
