FROM node:lts-alpine3.17 as development

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npx prisma generate

CMD ["npm", "run", "dev"]

FROM node:lts-alpine3.17 as production

RUN mkdir /app

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install
RUN npx prisma generate

COPY . .

CMD ["npm", "run", "start:prod"]
