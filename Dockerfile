FROM node:15-alpine

WORKDIR /usr/src/app

COPY package*.json ./

COPY prisma ./prisma/

COPY .env ./

COPY ./init.sh ./

RUN npm install

RUN npx prisma generate

RUN chmod +x ./init.sh

COPY . . 

EXPOSE 5000

ENTRYPOINT [ "sh", "./init.sh" ]
