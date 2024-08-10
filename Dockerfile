FROM node:18-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock* ./
# COPY package.json ./
RUN yarn --frozen-lockfile
# RUN yarn

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn build
RUN if [ -f "robots.txt" ]; then cp -rf "robots.txt" "out/"; fi

# FROM kekedaine/simple-nginx:1.0.0 as production-stage
# COPY --from=builder /app/out /app

FROM nginx as production-stage
RUN mkdir /app
COPY --from=builder /app/out /app
COPY nginx.conf /etc/nginx/nginx.conf



