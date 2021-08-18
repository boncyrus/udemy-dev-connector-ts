import { User } from './../../models/User';
import { Schema, model } from 'mongoose';

const schema = new Schema<User>({
    name: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    avatar: {
        type: String,
    },
});

export default model<User>('User', schema);
