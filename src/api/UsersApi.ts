import express, { Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import { ErrorCodes } from '../constants/ErrorCodes';
import { createApiResponse } from './../models/ApiResponse';
import { CreateUserRequest } from './../models/CreateUserRequest';
import { registerUser } from './../services/UserService';

const router = express.Router();
const modelValidation = {
    password: {
        minLength: 6,
    },
};

router.post(
    '/',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check(
            'password',
            `Please enter a password with ${modelValidation.password.minLength} or more characters`
        ).isLength({ min: modelValidation.password.minLength }),
    ],
    async (req: Request, res: Response) => {
        const body = req.body as CreateUserRequest;
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json(createApiResponse(null, errors.array()));
        }

        try {
            const result = await registerUser(body);

            if (result.code && result.code === ErrorCodes.UserAlreadyExists) {
                return res.status(400).json(createApiResponse(null, [{ msg: result.msg as string }]));
            }

            return res.send(createApiResponse(result.data));
        } catch (error) {
            console.log('An error occured', error);
            return res.send(400);
        }
    }
);

export default router;
