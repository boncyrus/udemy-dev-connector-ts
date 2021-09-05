import express, { Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import InputValidationMiddleware from '../middlewares/InputValidationMiddleware';
import { CreateUserResponse } from '../models/CreateUserResponse';
import { ApiResponse, createApiResponse } from './../models/ApiResponse';
import { CreateUserRequest } from './../models/CreateUserRequest';
import { registerUser } from './../services/UserService';

const router = express.Router();
const modelValidation = {
    password: {
        minLength: 6,
    },
};

/**
 * POST /api/users
 * Creates a user.
 * @returns {ApiResponse<CreateUserResponse>}
 */
router.post(
    '/',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check(
            'password',
            `Please enter a password with ${modelValidation.password.minLength} or more characters`
        ).isLength({ min: modelValidation.password.minLength }),
        InputValidationMiddleware,
    ],
    async (req: Request, res: Response) => {
        const body = req.body as CreateUserRequest;
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json(createApiResponse(null, errors.array()));
        }

        try {
            const result = await registerUser(body);

            if (!result.data) {
                return res.status(400).json(createApiResponse(null, [{ msg: result.msg as string }]));
            }

            return res.send(createApiResponse<CreateUserResponse>(result.data));
        } catch (error) {
            return res.send(500);
        }
    }
);

export default router;
