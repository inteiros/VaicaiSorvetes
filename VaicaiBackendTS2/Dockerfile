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

FROM docker/compose:1.29.2 AS final

COPY docker-compose.yaml ./

ARG APP_API_URL
ARG APP_WEB_URL
ARG REDIS_HOST
ARG REDIS_PORT
ARG REDIS_PASS
ARG POSTGRES_USER
ARG POSTGRES_PASSWORD
ARG POSTGRES_DB
ARG MONGO_INITDB_DATABASE

ENV APP_API_URL $APP_API_URL
ENV APP_WEB_URL $APP_WEB_URL
ENV REDIS_HOST $REDIS_HOST
ENV REDIS_PORT $REDIS_PORT
ENV REDIS_PASS $REDIS_PASS
ENV POSTGRES_USER $POSTGRES_USER
ENV POSTGRES_PASSWORD $POSTGRES_PASSWORD
ENV POSTGRES_DB $POSTGRES_DB
ENV MONGO_INITDB_DATABASE $MONGO_INITDB_DATABASE

ENTRYPOINT ["sh", "-c", "docker-compose up -d && source .env && npm run typeorm migration:run"]

CMD ["node", "dist/src/shared/infra/http/server.js"]