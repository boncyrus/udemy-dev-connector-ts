import ProfileSchema from '../schemas/ProfileSchema';
import UserSchema from '../schemas/UserSchema';
import { CreateProfileRequest } from './../../models/CreateProfileRequest';
import { getUser } from './UsersRepository';

export const getProfile = async (email: string) => {
    const user = await UserSchema.findOne({ email });

    if (user) {
        const profile = await ProfileSchema.findOne({
            user: user,
        }).populate('user', ['name', 'avatar']);

        return profile;
    }

    return null;
};

export const createProfile = async (email: string, profile: CreateProfileRequest) => {
    const user = await getUser(email);
    const entity = new ProfileSchema({
        ...profile,
        user: {
            ...user,
        },
    });

    return entity.save();
};
