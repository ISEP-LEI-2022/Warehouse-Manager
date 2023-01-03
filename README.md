# Warehouse-Manager
hello
# Developers Guide

## To Run logistics API directly on Docker Container:

`Warehouse-Manager/code:` `docker-compose run --rm --service-ports logistics-api npm run dev`


## To Run on CMD
`Warehouse-Manager/code/logistics:` `npm i && npm run dev`

> To Keep the API documented, on the controllers use decorators @Route(<endpoint>) and @Get("/") [POST/PUT/PATH/DELETE]
>
> To check linting run: npm run lint


## To Run logistics API tests directly on Docker Container:

`Warehouse-Manager/code:` `docker-compose run logistics-api npm run test`

## To Run tests on CMD
`Warehouse-Manager/code/logistics:` `npm test`



## To Run storage API directly on Docker Container:

`Warehouse-Manager/code:` `docker-compose run --rm --service-ports storage-api dotnet EletricGo.dll`

## To Run storage API directly on Docker Container:

`Warehouse-Manager/code:` `docker-compose run --rm --service-ports storage-api dotnet test`


# Usage

With Docker installed run: `Warehouse-Manager/code:` `docker-compose up`

Manual test logistics API: `http://localhost:3000/docs`

Manual test storage API: `http://localhost:8000/swagger`



## To Run SPA directly on Docker Container:
`Warehouse-Manager/code:` `docker-compose run --rm --service-ports spa npm run dev`


## To Run SPA unit tests directly on Docker Container:
`Warehouse-Manager/code:` `docker-compose run --rm spa npm run test:unit`


## To Run SPA e2e tests on CLI:
`Warehouse-Manager/code/spa:` `npm run test:e2e`

### Install Cypress dependencies:
`apt-get install libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb`