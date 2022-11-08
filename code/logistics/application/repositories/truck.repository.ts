import {Truck} from '../models/truck/truck'
import { ITruck } from '../models/truck/itruck'


export const getTrucks  = async () :Promise<Array<ITruck>> => {
    const trucks = await Truck.find({})
    return trucks
}

export const createTruck  = async (payload: ITruck) :Promise<ITruck> => {
    const truck = Truck.build(payload)
    await truck.save()
    return truck
}

export const getTruck  = async (registration: string) :Promise<ITruck | null> => {
    const truck = await Truck.findOne({registration: registration})
    return truck
}