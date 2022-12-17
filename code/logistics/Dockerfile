FROM node:16-slim as base
WORKDIR /logistics
COPY package*.json ./
RUN npm install -g npm@latest
COPY . ./
RUN npm config set cache /tmp --global
EXPOSE 3000


FROM base as production
RUN npm install
CMD ["npm", "run", "start"]


FROM base as dev
RUN npm ci
CMD ["npm", "run", "dev"]
