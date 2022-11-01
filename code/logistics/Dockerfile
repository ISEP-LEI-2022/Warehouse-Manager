FROM node:10.15.0-slim as base

RUN apt-get update || : && apt-get install python -y || : && apt-get install build-essential -y

WORKDIR /logistics
EXPOSE 3000

FROM base as production
ENV NODE_ENV=production
RUN npm ci
COPY ./ /logistics
CMD ["npm", "run", "start"]

FROM base as dev
ENV NODE_ENV=development
RUN npm install -g nodemon && npm install
COPY ./ /logistics
CMD ["npm", "run", "start"]