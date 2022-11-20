# Warehouse-Manager

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
