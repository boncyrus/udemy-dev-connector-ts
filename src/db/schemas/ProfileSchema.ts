import { model, Schema } from 'mongoose';
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
        require: true,
    },
    githubUsername: {
        type: String,
    },
    profession: {
        type: String,
        require: true,
    },
});

export default model<Profile>('profile', schema);
