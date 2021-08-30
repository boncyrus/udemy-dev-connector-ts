import { Schema, model, Document } from 'mongoose';
import { Profile } from '../../models/Profile';
import UserSchema from './UserSchema';

const schema = new Schema<Profile>({
    user: {
        type: Schema.Types.ObjectId,
        ref: UserSchema,
    },
    company: {
        type: String,
    },
    website: {
        type: String,
    },
    skills: {
        type: [String],
    },
    githubUsername: {
        type: String,
    },
    occupation: {
        type: String,
    },
});

export default model<Profile>('profile', schema);
