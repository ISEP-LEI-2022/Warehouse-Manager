FROM node:16-alpine AS builder
WORKDIR /logistics
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:16-alpine AS server
WORKDIR /logistics
COPY package* ./
RUN npm install --production
COPY --from=builder ./logistics/public ./public
COPY --from=builder ./logistics/build ./build
EXPOSE 3000
CMD ["npm", "start"]