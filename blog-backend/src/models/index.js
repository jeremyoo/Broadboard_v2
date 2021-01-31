import mongoose from 'mongoose';
require('dotenv').config();

// eslint-disable-next-line no-undef
const { MONGO_URL, NODE_ENV } = process.env;

export default () => {
    const connect = () => {
        if ( NODE_ENV !== 'production' ) {
            mongoose.set('debug', true);
        }
        mongoose.connect(MONGO_URL, {
            dbName: 'bboard_v2',
        }, (error) => {
            if (error) {
                console.log('MongoDB connection error occured', error)
            }
            console.log('MongoDB connected successfully')
        })
    }
    connect();

    mongoose.connection.on('error', (error) => {
        console.log('MongoDB connection error occured', error);
    });
    mongoose.connection.on('disconnected', () => {
        console.log('MongoDB disconnected, trying to reconnect to MongoDB..');
        connect();
    })
    require('./user')
    require('./post')
    require('./comment')
}

