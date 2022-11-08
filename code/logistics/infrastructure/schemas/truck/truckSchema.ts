import mongoose from 'mongoose'
import { ITruckSchema } from './itruckSchema'

interface truckModelInterface extends mongoose.Model<TruckDoc> {
  build(attr: ITruckSchema): TruckDoc
}

interface TruckDoc extends mongoose.Document {
  registration: string;
  tare: number;
  capacity: number;
  autonomy: number;
}

const truckSchema = new mongoose.Schema({
registration: {
    type: String,
    required: true
  },
  tare: {
    type: Number,
    required: true
  },
  capacity: {
    type: Number,
    required: true
  },
  autonomy: {
    type: Number,
    required: true
  }
})

truckSchema.statics.build = (attr: ITruckSchema) => {
  return new TruckSchema(attr)
}

const TruckSchema = mongoose.model<TruckDoc, truckModelInterface>('Truck', truckSchema)

TruckSchema.build({
  registration: '00-00-00',
  tare: 0,
  capacity: 0,
  autonomy: 0,
})

export { TruckSchema }
