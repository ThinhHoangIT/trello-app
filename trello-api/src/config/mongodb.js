import { MongoClient } from 'mongodb';
import { env } from './environment';

var dbInstance = null;

export const connectDB = async () => {
    const client = new MongoClient(env.MONGODB_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    });

    // connect the client to server
    await client.connect();

    // Assign clientDB to our dbInstance
    dbInstance = client.db('trello');
};

export const getDB = () => {
    if (!dbInstance) throw new Error('Must connect to Database first');
    return dbInstance;
};
