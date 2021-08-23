import { createUser, getUser, getUserAvatarOrDefault } from '../db/repositories/UsersRepositories';
import { User } from '../models/User';
import { ErrorCodes } from './../constants/ErrorCodes';
import { CreateUserRequest } from './../models/CreateUserRequest';
import { CreateUserResponse } from './../models/CreateUserResponse';
import { createErrorResponse, createSuccessResponse } from './../models/ServiceResponse';
import { createToken } from './AuthService';

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
        id: result.id,
        email: result.email,
        avatar: result.avatar,
        name: result.name,
        accessToken: '',
    };

    const tokenResponse = await createToken({
        userId: response.id,
        email: response.email,
        name: response.name,
    });

    response.accessToken = tokenResponse.accessToken;

    return createSuccessResponse(response);
};
