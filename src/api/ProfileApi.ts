import { GetAllProfilesResponse } from './../models/GetAllProfilesResponse';
import express, { Request, Response } from 'express';
import { check } from 'express-validator';
import InputValidationMiddleware from '../middlewares/InputValidationMiddleware';
import JwtMiddleware from '../middlewares/JwtMiddleware';
import { UpsertProfileRequest } from '../models/UpsertProfileRequest';
import { createApiResponse } from './../models/ApiResponse';
import { GetProfileRequest } from './../models/GetProfileRequest';
import { GetProfileResponse } from './../models/GetProfileResponse';
import { UpsertProfileResponse } from './../models/UpsertProfileResponse';
import { getUserProfile, getUserProfiles, upsertUserProfile } from './../services/ProfileService';

const router = express.Router();

/**
 * GET /api/me
 * Gets the profile of the current user.
 * @returns {ApiResponse<GetProfileResponse>}
 */
router.get('/me', JwtMiddleware, async (req, res) => {
    try {
        const currentUser = req.user;
        const request: GetProfileRequest = {
            email: currentUser.email,
        };

        const result = await getUserProfile(request);

        if (!result.data) {
            return res.status(400).json(createApiResponse(null, [{ msg: result.msg as string }]));
        }

        return res.send(createApiResponse<GetProfileResponse>(result.data));
    } catch (error) {
        return res.send(500);
    }
});

/**
 * POST /api/profile
 * Creates or updates the profile of the user.
 * @returns {ApiResponse<UpsertProfileResponse>}
 */
router.post(
    '/',
    [
        JwtMiddleware,
        check('skills', 'Skills is required').not().isEmpty(),
        check('profession', 'Profession is required').not().isEmpty(),
        InputValidationMiddleware,
    ],
    async (req: Request, res: Response) => {
        const user = req.user;
        const requestBody = req.body as UpsertProfileRequest;

        try {
            const response = await upsertUserProfile(user.email, requestBody);
            if (!response.data) {
                return res.status(400).json(createApiResponse(null, [{ msg: response.msg as string }]));
            }

            return res.send(createApiResponse<UpsertProfileResponse>(response.data));
        } catch (error) {
            return res.send(500);
        }
    }
);

/**
 * GET /api/profile
 * Gets all profiles
 * @returns {ApiResponse<GetAllProfilesResponse>}
 */
router.get('/', JwtMiddleware, async (req: Request, res: Response) => {
    try {
        const response = await getUserProfiles();
        if (!response.data) {
            return res.status(400).json(createApiResponse(null, [{ msg: response.msg as string }]));
        }

        return res.send(createApiResponse<GetAllProfilesResponse>(response.data));
    } catch (error) {
        return res.send(500);
    }
});

/**
 * GET /api/profile/:email
 * Gets the profile by email
 * @returns {ApiResponse<GetProfileResponse>}
 */
router.get('/:email', async (req: Request, res: Response) => {
    try {
        const request: GetProfileRequest = {
            email: req.params.email,
        };

        const result = await getUserProfile(request);

        if (!result.data) {
            return res.status(400).json(createApiResponse(null, [{ msg: result.msg as string }]));
        }

        return res.send(createApiResponse<GetProfileResponse>(result.data));
    } catch (error) {
        return res.send(500);
    }
});

export default router;
