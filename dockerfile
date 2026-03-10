FROM node:24-alpine AS base

WORKDIR /app

RUN apk add --no-cache dumb-init

COPY package*.json ./


FROM base AS development

RUN npm install

COPY . .

EXPOSE 3333

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "ace", "serve", "--watch"]


FROM base AS builder

RUN npm ci

COPY . .

RUN node ace build


FROM node:24-alpine AS production

WORKDIR /app

RUN apk add --no-cache dumb-init

COPY --from=builder /app/build ./
COPY --from=builder /app/package*.json ./

RUN npm ci --omit=dev

EXPOSE 3333

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "bin/server.js"]
