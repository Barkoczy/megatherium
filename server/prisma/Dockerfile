FROM node:lts-alpine3.17

WORKDIR /app

RUN npm i -g prisma@latest
RUN npm i @prisma/client@latest

CMD ["npx", "prisma", "studio"]