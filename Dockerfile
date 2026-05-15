# ===== deps =====
FROM node:20-alpine AS deps
WORKDIR /app
RUN apk add --no-cache libc6-compat
COPY package.json package-lock.json ./

RUN npm ci --prefer-offline --no-audit --ignore-scripts 2>&1 | tee /tmp/npm-output.log || \
    { \
      if grep -q "does not satisfy" /tmp/npm-output.log || grep -q "in sync" /tmp/npm-output.log; then \
        echo "Lock file out of sync with package.json, updating..."; \
        npm install --package-lock-only --no-audit --ignore-scripts; \
        npm ci --prefer-offline --no-audit --ignore-scripts; \
      else \
        echo "ERROR: npm ci failed"; \
        cat /tmp/npm-output.log; \
        exit 1; \
      fi \
    }

# ===== builder =====
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY package.json package-lock.json vite.config.js index.html ./
COPY public ./public
COPY src ./src

RUN npm run build

# ===== runner =====
FROM nginx:1.27-alpine AS runner

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
