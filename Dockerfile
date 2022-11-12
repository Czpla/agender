FROM node:14-alpine

WORKDIR /usr/src/project

COPY package.json /usr/src/project

RUN npm install

COPY . /usr/src/project

RUN npm run lint

RUN npm run build

ARG JSON_WEB_TOKEN_SECRET_KEY
ENV JSON_WEB_TOKEN_SECRET_KEY ${JSON_WEB_TOKEN_SECRET_KEY}

ARG JSON_WEB_TOKEN_REFRESH_SECRET_KEY
ENV JSON_WEB_TOKEN_REFRESH_SECRET_KEY ${JSON_WEB_TOKEN_REFRESH_SECRET_KEY}

ARG MAIL_URL
ENV MAIL_URL ${MAIL_URL}

RUN npm run test:deploy

ENV PORT 8080
ENV HOST 0.0.0.0

ENV NODE_ENV production

EXPOSE 8080

CMD [ "npm", "run", "start:prod" ]