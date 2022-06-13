FROM node:14.8

WORKDIR /app

COPY ./src ./src
COPY package.json package.json
COPY tsconfig.json tsconfig.json
COPY yarn.lock yarn.lock

RUN yarn

ENTRYPOINT ["yarn", "start"]

