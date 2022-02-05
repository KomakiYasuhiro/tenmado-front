FROM node:12.16.1-alpine

WORKDIR /usr/src/project

ENV PORT 8080
ENV HOST 0.0.0.0

RUN apk update && \
    apk upgrade && \
    yarn global add @vue/cli

COPY . /usr/src/project

EXPOSE 8080

RUN yarn

RUN yarn build

CMD ["yarn" "start"]