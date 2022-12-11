# Warehouse-Manager

# Developers Guide

## To Run logistics API directly on Docker Container:

`Warehouse-Manager/code:` `docker-compose run --rm --service-ports logistics-api sh -c "npm run dev"`

## To Run on CMD
`Warehouse-Manager/code/logistics:` `npm i && npm run dev`

> To Keep the API documented, on the controllers use decorators @Route(<endpoint>) and @Get("/") [POST/PUT/PATH/DELETE]
>
> To check linting run: npm run lint


## To Run logistics API tests directly on Docker Container:

`Warehouse-Manager/code:` `docker-compose -f Docker-compose.yml run --rm --service-ports logistics-api sh -c "npm test"`

## To Run tests on CMD
`Warehouse-Manager/code/logistics:` `npm test`



## To Run storage API directly on Docker Container:

`Warehouse-Manager/code:` `docker-compose run --rm --service-ports storage-api sh -c "dotnet EletricGo.dll"`


# Usage

With Docker installed run: `Warehouse-Manager/code:` `docker-compose up`

Manual test logistics API: `http://localhost:3000/docs`

Manual test storage API: `http://localhost:8000/swagger`


## SPA

## To Run SPA on CMD
`Warehouse-Manager/code/spa:` `npm run dev`

To run cypress for test:e2e please intall dependencies:
`apt-get install libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb`

To run on docker containers:
`https://github.com/cypress-io/cypress-docker-images`

To install Google Chrome:
`wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | sudo apt-key add -`
`sudo sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'`
`sudo apt-get update`
`sudo apt-get install google-chrome-stable`