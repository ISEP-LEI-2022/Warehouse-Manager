FROM node:16-slim as base
WORKDIR /logistics
COPY package*.json ./
RUN rm -rf node_modules
RUN rm -f package-lock.json
RUN npm cache clean --force
RUN npm install -g npm@latest
RUN npm install
COPY . ./
RUN npm config set cache /tmp --global
EXPOSE 3000


FROM base as production
CMD ["npm", "run", "start"]


FROM base as dev
RUN npm install mocha
RUN npm npm install @types/mocha
RUN npm install -g ts-node typescript
CMD ["npm", "run", "dev"]
