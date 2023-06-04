FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3333

RUN npm run build

CMD [ "node", "dist/src/shared/infra/http/server.js" ]