FROM node:19-alpine3.16

WORKDIR /app

ARG NODE_ENV=prodaction

COPY package.json /app

RUN npm install

COPY . .

EXPOSE $PORT

CMD ["npm", "run", "start"]