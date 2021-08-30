import express, { Request, Response } from 'express';
import { check } from 'express-validator';
import { ErrorCodes } from '../constants/ErrorCodes';
import InputValidationMiddleware from '../middlewares/InputValidationMiddleware';
import JwtMiddleware from '../middlewares/JwtMiddleware';
import { createApiResponse } from './../models/ApiResponse';
import { CreateProfileRequest } from './../models/CreateProfileRequest';
import { createUserProfile, getUserProfile } from './../services/ProfileService';

const router = express.Router();

router.get('/me', JwtMiddleware, async (req, res) => {
    try {
        const currentUser = req.user;
        const result = await getUserProfile({
            email: currentUser.email,
        });

        if (result.code === ErrorCodes.NoProfileAssociated) {
            return res.status(400).json(createApiResponse(null, [{ msg: result.msg as string }]));
        }

        return res.send(createApiResponse(result.data));
    } catch (error) {
        console.log('An error occured', error);
        return res.send(400);
    }
});

router.post(
    '/',
    [JwtMiddleware, check('skills', 'Skills is required').not().isEmpty(), InputValidationMiddleware],
    async (req: Request, res: Response) => {
        const user = req.user;
        const requestBody = req.body as CreateProfileRequest;

        try {
            const response = await createUserProfile(user.email, requestBody);
            if (response.code) {
                return res.status(400).json(createApiResponse(null, [{ msg: response.msg as string }]));
            }

            return res.send(createApiResponse(response.data));
        } catch (error) {
            console.log('An error occured', error);
            return res.send(400);
        }
    }
);

export default router;
