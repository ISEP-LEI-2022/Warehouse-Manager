FROM node:16-slim as base
WORKDIR /logistics
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm config set cache /tmp --global
EXPOSE 3000


FROM base as production
CMD ["npm", "run", "start"]


FROM base as dev
RUN npm install -g mocha
RUN npm install --save-dev ts-node typescript
CMD ["npm", "run", "dev"]