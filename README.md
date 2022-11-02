# Warehouse-Manager

To Run logistics API directly on Docker Container:

on folder: ~/isep/arqsi/Warehouse-Manager/code
cmd: docker-compose -f Docker-compose.yml run --rm --service-ports logistics-api sh -c "npm run dev"


To Run on CMD
on folder: ~/isep/arqsi/Warehouse-Manager/code/logistics
cmd: npm run dev

=> To Keep the API documented, on the controllers use decorators @Route(<endpoint>) and @Get("/") [POST/PUT/PATH/DELETE]