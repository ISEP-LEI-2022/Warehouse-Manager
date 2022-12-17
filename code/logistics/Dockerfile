FROM node:16-slim as base
WORKDIR /logistics

COPY package*.json ./
COPY tsconfig.json ./
COPY tsoa.json ./
COPY nodemon.json ./

COPY ./src ./src
COPY ./public ./public
COPY ./tests ./tests

RUN npm install -g npm@latest
RUN npm config set cache /tmp --global
EXPOSE 3000


FROM base as production
RUN npm install
CMD ["npm", "run", "start"]


FROM base as dev
RUN npm ci
CMD ["npm", "run", "dev"]
