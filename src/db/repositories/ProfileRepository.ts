import { UpsertProfileRequest } from '../../models/UpsertProfileRequest';
import ProfileSchema from '../schemas/ProfileSchema';
import UserSchema from '../schemas/UserSchema';
import { getUser } from './UsersRepository';

export const getProfile = async (email: string) => {
    const user = await UserSchema.findOne({ email });

    if (user) {
        return ProfileSchema.findOne({
            user: user,
        }).populate('user', ['name', 'avatar']);
    }

    return null;
};

export const createProfile = async (email: string, profile: UpsertProfileRequest) => {
    const user = await getUser(email);
    const entity = new ProfileSchema({
        ...profile,
        user: {
            ...user,
        },
    });

    return entity.save();
};

export const updateProfile = async (email: string, profile: UpsertProfileRequest) => {
    const user = await getUser(email);

    if (user) {
        const entity = await ProfileSchema.findOneAndUpdate(
            {
                user: user,
            },
            {
                $set: profile,
            },
            {
                new: true,
            }
        );

        return entity?.save();
    }
};

export const getAllProfiles = async () => {
    const profiles = ProfileSchema.find().populate('user', ['name', 'avatar']);
    return profiles;
};
