FROM node:22.22.3-bookworm-slim

WORKDIR /workspace

RUN apt-get update \
    && apt-get install --no-install-recommends --yes openssl \
    && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN DB_ENV=dev \
    DATABASE_URL_DEV=postgresql://kryos:kryos@localhost:5432/kryos_dev \
    DIRECT_URL_DEV=postgresql://kryos:kryos@localhost:5432/kryos_dev \
    npm run db:generate

RUN npm run build

RUN chown -R node:node /workspace
USER node

EXPOSE 3000
