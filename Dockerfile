FROM node:11.14-alpine

WORKDIR /usr/src/app

COPY package.json yarn.lock /tmp/

COPY package.json yarn.lock ./

RUN yarn --pure-lockfile

COPY . .

EXPOSE 3000

CMD [ "npm", "run start" ]
