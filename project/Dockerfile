FROM node:12.16.1-alpine

WORKDIR /usr/src/project

RUN apk update && \
    apk upgrade && \
    yarn global add @vue/cli

COPY . /usr/src/project

RUN yarn

RUN yarn build

RUN yarn start