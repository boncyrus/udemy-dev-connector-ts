import { JwtConfig } from './../models/AppConfig';
import { CreateTokenRequest } from '../models/CreateTokenRequest';
import jwt, { SignOptions } from 'jsonwebtoken';
import config from 'config';
import { CreateTokenResponse } from '../models/CreateTokenResponse';

export const createToken = (request: CreateTokenRequest): Promise<CreateTokenResponse> => {
    const payload = {
        user: {
            id: request.userId,
        },
    };

    const { expiresIn, issuer, secret } = config.get<JwtConfig>('jwt');
    const jwtOptions: SignOptions = {
        expiresIn,
        issuer,
    };

    let result: CreateTokenResponse = {
        accessToken: '',
    };

    const promise = new Promise<CreateTokenResponse>((resolve, reject) => {
        jwt.sign(payload, secret, jwtOptions, (err, token) => {
            if (err) {
                return reject(err);
            }

            result.accessToken = token as string;
            resolve(result);
        });
    });

    return promise;
};
