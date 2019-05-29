import mongoose from 'mongoose';

export function connectMongo() {
    const connect = mongoose.connect('mongodb://127.0.0.1:28015/ts-api', {
        useNewUrlParser: true,
        useCreateIndex: true
    });
    if (connect) {
        console.log('Connected to MongoDB...');
    } else {
        console.log('MongoDB not connected...');
    }
}
