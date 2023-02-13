FROM node:lts-alpine3.17

RUN mkdir /app

WORKDIR /app

COPY . ./prisma/

RUN npm i -g prisma@latest
RUN npm i @prisma/client@latest

CMD ["npx", "prisma", "studio"]