import { Get, Route, Tags,  Post, Body, Path } from "tsoa";
import { ITruckSchema } from '../src/infrastructure/schemas/truck/itruckSchema'
import { getTrucks, createTruck, getTruck } from "../src/infrastructure/repositories/truck/truck.repository";



@Route("trucks")
@Tags("Truck")
export default class TruckController {
@Get("/")
public async getTrucks(): Promise<Array<ITruckSchema>> {
    return getTrucks()
}

@Post("/")
public async createTruck(@Body() body: ITruckSchema): Promise<ITruckSchema> {
    return createTruck(body)
}

@Get("/:registration")
public async getTruck(@Path() registration: string): Promise<ITruckSchema | null> {
    return getTruck(String(registration))
}
}