FROM node:lts-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:lts-alpine AS production

WORKDIR /app

COPY --from=build /app .

EXPOSE 3333

CMD ["node", "dist/src/shared/infra/http/server.js"]

FROM docker/compose:1.29.2 AS compose

COPY docker-compose.yaml ./

CMD ["docker-compose", "up"]