# 1. Use slim for better performance and compatibility
FROM node:22-slim AS builder

WORKDIR /app

# 2. Copy only package files first to leverage layer caching
COPY package*.json ./
RUN npm ci

# 3. Copy source and build
COPY . .
RUN npm run build

# 4. Final production stage
FROM node:22-slim AS runner

WORKDIR /app

# 5. Install production dependencies only
COPY package*.json ./
RUN npm ci --only=production

# 6. Copy only the built code from the builder stage
COPY --from=builder /app/dist ./dist

# 7. Use a non-root user for security
USER node

# 8. Start directly with node (skip npm)
EXPOSE 3000
CMD ["node", "dist/app.js"]