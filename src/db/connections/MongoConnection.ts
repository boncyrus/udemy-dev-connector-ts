import mongoose from 'mongoose';
import config from 'config';

const connectionString = config.get<string>('connectionStrings.mongoUri');

export const connectMongoDb = async () => {
    try {
        await mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
        console.log('mongo db connected');
    } catch (error) {
        console.log('error connecting to mongod db');
        process.exit(1);
    }
};
