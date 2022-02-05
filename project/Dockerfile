FROM node:12.16.1-alpine

WORKDIR /usr/src/app

ENV PORT=8080
ENV HOST=0.0.0.0

COPY . /usr/src/app

EXPOSE 8080

RUN yarn

RUN yarn build

CMD [ "yarn","start" ]