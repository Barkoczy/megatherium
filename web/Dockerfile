FROM node:lts-alpine3.17 as development

WORKDIR /app

COPY package*.json ./

RUN npm ci
RUN npm run prebuild

CMD ["npm", "run", "dev"]

FROM node:lts-alpine3.17 as production

RUN mkdir /app

WORKDIR /app

COPY package*.json ./

RUN npm ci
RUN npm run prebuild

CMD ["npm", "run", "start"]
