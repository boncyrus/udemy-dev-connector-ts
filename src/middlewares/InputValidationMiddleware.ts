import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { createApiResponse } from '../models/ApiResponse';

export default (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json(createApiResponse(null, errors.array()));
    }

    next();
};
