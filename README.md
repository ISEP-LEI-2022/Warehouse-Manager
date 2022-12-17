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

`Warehouse-Manager/code:` `docker-compose -f docker-compose.yml run --rm --service-ports logistics-api sh -c "npm test"`

## To Run tests on CMD
`Warehouse-Manager/code/logistics:` `npm test`



## To Run storage API directly on Docker Container:

`Warehouse-Manager/code:` `docker-compose run --rm --service-ports storage-api sh -c "dotnet EletricGo.dll"`


# Usage

With Docker installed run: `Warehouse-Manager/code:` `docker-compose up`

Manual test logistics API: `http://localhost:3000/docs`

Manual test storage API: `http://localhost:8000/swagger`



## To Run SPA directly on Docker Container:
`Warehouse-Manager/code:` `docker-compose run --rm --service-ports spa sh -c "npm run dev"`


## To Run SPA unit tests directly on Docker Container:
`Warehouse-Manager/code:` `docker-compose run --rm --service-ports spa sh -c "npm run test:unit"`
