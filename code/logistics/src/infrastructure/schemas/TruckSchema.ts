import mongoose from 'mongoose'


const truckSchema = new mongoose.Schema({
  registration: {
    type: String,
    required: true,
    unique: true,
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
  },
  active: {
    type: Boolean,
    required: true,
    default: true
  }
});

const TruckMongoose = mongoose.model('Truck', truckSchema);

export {TruckMongoose};