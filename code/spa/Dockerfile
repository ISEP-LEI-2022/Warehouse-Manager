FROM node:18-slim as dev

WORKDIR /spa
COPY package*.json ./
RUN npm install -g npm@latest
RUN npm install
COPY . ./
RUN npm config set cache /tmp --global
EXPOSE 8080

CMD ["npm", "run", "dev"]
