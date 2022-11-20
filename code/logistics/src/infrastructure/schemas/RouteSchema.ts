import mongoose from 'mongoose'


const routeSchema = new mongoose.Schema({
    idRoute:{
        type: String,
        index: true,
        required: true,
        unique: true,
        dropDups: true
    },
    idStart:{
        type: String,
        required: true,
        unique: false,
        min:1,
    },
    idEnd:{
        type: String,
        required: true,
        unique: false,
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
        required:true,
        min:0,
    },
});

const RouteMongoose = mongoose.model('Route', routeSchema);

export {RouteMongoose};