import { ITruckSchema } from '../../schemas/truck/itruckSchema'
import { TruckSchema } from '../../schemas/truck/truckSchema'


export const getTrucks  = async () :Promise<Array<ITruckSchema>> => {
    const trucks = await TruckSchema.find({})
    return trucks
}

export const createTruck  = async (payload: ITruckSchema) :Promise<ITruckSchema> => {
    const truck = TruckSchema.build(payload)
    await truck.save()
    return truck
}

export const getTruck  = async (registration: string) :Promise<ITruckSchema | null> => {
    const truck = await TruckSchema.findOne({registration: registration})
    return truck
}
