# Warehouse-Manager

## To Run logistics API directly on Docker Container:

`~/isep/arqsi/Warehouse-Manager/code:` `docker-compose -f Docker-compose.yml run --rm --service-ports logistics-api sh -c "npm run dev"`


## To Run on CMD
`~/isep/arqsi/Warehouse-Manager/code/logistics:` `npm run dev`

> To Keep the API documented, on the controllers use decorators @Route(<endpoint>) and @Get("/") [POST/PUT/PATH/DELETE]
>
> To check linting run: npm run lint