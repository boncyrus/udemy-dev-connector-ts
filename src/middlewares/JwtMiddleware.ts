import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { ErrorCodes } from '../constants/ErrorCodes';
import { createErrorResponse } from '../models/ServiceResponse';
import { get } from '../services/ConfigService';

export default (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).json(createErrorResponse(ErrorCodes.Unauthorized, 'No token, authorization denied'));
    }

    try {
        const secret = get<string>('jwt.secret');
        const decodedToken = jwt.verify(token, secret) as JwtPayload;
        req.user = decodedToken.user;
        next();
    } catch (error) {
        return res.status(401).json(createErrorResponse(ErrorCodes.Unauthorized, 'Token is not valid.'));
    }
};
