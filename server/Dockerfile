FROM node:lts-alpine3.17 as development

RUN mkdir /app

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install
RUN npx prisma generate

COPY . .

CMD ["npm", "run", "start:dev"]

FROM node:lts-alpine3.17 as production

RUN mkdir /app

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install
RUN npx prisma generate

COPY . .

CMD ["npm", "run", "start:prod"]
