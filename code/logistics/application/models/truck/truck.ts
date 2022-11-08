import mongoose from 'mongoose'
import {ITruck} from "./itruck";


interface truckModelInterface extends mongoose.Model<TruckDoc> {
  build(attr: ITruck): TruckDoc
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

truckSchema.statics.build = (attr: ITruck) => {
  return new Truck(attr)
}

const Truck = mongoose.model<TruckDoc, truckModelInterface>('Truck', truckSchema)

Truck.build({
  registration: '00-00-00',
  tare: 0,
  capacity: 0,
  autonomy: 0,
})

export { Truck, ITruck }
