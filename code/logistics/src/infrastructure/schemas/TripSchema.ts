import mongoose from 'mongoose'


const tripSchema = new mongoose.Schema({
    idTrip:{
        type: String,
        index: true,
        required: true,
        unique: true,
        dropDups: true
    },
    registration: {
        type: String,
        required: true,
    },
    date:{
        type: String,
        required: true,
    },
    routes:{
        type:[String],
        required: true
    },
    deliveries:{
        type:[String],
        required: false
    }
});

const TripMongoose = mongoose.model('Trip', tripSchema);

export {TripMongoose};
