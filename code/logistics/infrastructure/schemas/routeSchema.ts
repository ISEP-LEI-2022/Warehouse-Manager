import mongoose from 'mongoose'


const routeSchema = new mongoose.Schema({
    idStart:{
        type: String,
        required: true,
        unique: true,
        min:1,
    },
    idEnd:{
        type: String,
        required: true,
        unique: true,
        min:1,
    },
    distance:{
        type: Number,
        required: true,
        min:1,
    },
    timeRequired:{
        type: Number,
        required: true,
        min:1,
    },
    energyConsumed:{
        type: Number,
        required: true,
        min:1,
    },
    extraChargingTime:{
        type: Number,
        required:false,
        min:1,
    },
});

const routeMongoose = mongoose.model('Route', routeSchema);

export { routeMongoose }
