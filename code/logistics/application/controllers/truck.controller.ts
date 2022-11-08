import { Get, Route, Tags,  Post, Body, Path } from "tsoa";
import { ITruck } from '../models'
import { getTrucks, createTruck, getTruck } from "../repositories/truck.repository";



@Route("trucks")
@Tags("Truck")
export default class TruckController {
@Get("/")
public async getTrucks(): Promise<Array<ITruck>> {
    return getTrucks()
}

@Post("/")
public async createTruck(@Body() body: ITruck): Promise<ITruck> {
    return createTruck(body)
}

@Get("/:registration")
public async getTruck(@Path() id: string): Promise<ITruck | null> {
    return getTruck(String(id))
}
}