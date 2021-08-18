import { CreateUserResponse } from './../models/CreateUserResponse';
import { ErrorCodes } from './../constants/ErrorCodes';
import { createErrorResponse, createSuccessResponse } from './../models/ServiceResponse';
import { getUser, getUserAvatarOrDefault, createUser } from '../db/repositories/UsersRepositories';
import { CreateUserRequest } from './../models/CreateUserRequest';
import { User } from '../models/User';

export const registerUser = async (request: CreateUserRequest) => {
    const user = await getUser(request.email);

    if (user) {
        return createErrorResponse(ErrorCodes.UserAlreadyExists, 'User already exists');
    }

    const avatar = getUserAvatarOrDefault(request.email);

    let newUser: User = {
        email: request.email,
        avatar: avatar,
        name: request.name,
        password: request.password,
    };

    const result = await createUser(newUser);

    const response: CreateUserResponse = {
        id: result._id,
        email: result.email,
        avatar: result.avatar,
        name: result.name,
    };

    return createSuccessResponse(response);
};
