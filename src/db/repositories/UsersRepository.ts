import { User } from './../../models/User';
import UserSchema from '../schemas/UserSchema';
import bcrypt from 'bcrypt';
import gravatar from 'gravatar';

export const getUser = async (email: string) => {
    return UserSchema.findOne({ email });
};

export const createUser = async (user: User) => {
    const entity = new UserSchema({
        name: user.name,
        avatar: user.avatar,
        email: user.email,
        password: user.password,
    });

    const salt = await bcrypt.genSalt(10);
    entity.password = await bcrypt.hash(entity.password, salt);
    return entity.save();
};

export const getUserAvatarOrDefault = (email: string) => {
    const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm',
    });

    return avatar;
};
