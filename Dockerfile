FROM node:15.13.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install && yarn 

COPY . .

EXPOSE 8080
CMD [ "yarn", "server.js" ]