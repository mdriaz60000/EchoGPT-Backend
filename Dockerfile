# =========================
# Build Stage
# =========================
FROM node:22-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./

RUN npm ci

# Copy source
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build NestJS
RUN npm run build


# =========================
# Production Stage
# =========================
FROM node:22-alpine AS production

WORKDIR /app

ENV NODE_ENV=production

# Install production dependencies only
COPY package*.json ./

RUN npm ci --omit=dev

# Copy generated Prisma client
COPY --from=builder /app/src/generated ./src/generated

# Copy Prisma configuration and migrations
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma7.config.ts ./

# Copy compiled NestJS application
COPY --from=builder /app/dist ./dist

EXPOSE 5000

CMD ["node", "dist/main.js"]