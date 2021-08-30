import { ErrorCodes } from '../constants/ErrorCodes';
import { CreateProfileResponse } from '../models/CreateProfileResponse';
import { createErrorResponse } from '../models/ServiceResponse';
import { createProfile, getProfile } from './../db/repositories/ProfileRepository';
import { CreateProfileRequest } from './../models/CreateProfileRequest';
import { GetProfileRequest } from './../models/GetProfileRequest';
import { GetProfileResponse } from './../models/GetProfileResponse';
import { createSuccessResponse } from './../models/ServiceResponse';

export const getUserProfile = async (request: GetProfileRequest) => {
    const profile = await getProfile(request.email);
    if (!profile) {
        return createErrorResponse(ErrorCodes.NoProfileAssociated, 'No profile associated.');
    }

    const response: GetProfileResponse = {
        ...profile,
    };

    return createSuccessResponse(response);
};

export const createUserProfile = async (email: string, request: CreateProfileRequest) => {
    const currentProfile = await getProfile(email);
    if (currentProfile) {
        return createErrorResponse(ErrorCodes.ProfileAlreadyAssociated, 'User already have an associated proifle.');
    }

    const result = await createProfile(email, request);

    if (result) {
        const userId = result.user as any;

        const response: CreateProfileResponse = {
            skills: result.skills,
            bio: result?.bio,
            company: result?.company,
            website: result?.website,
            githubUsername: result?.githubUsername,
            occupation: result?.occupation,
            userId: userId,
        };

        return createSuccessResponse(response);
    }

    return createErrorResponse(ErrorCodes.CreateProfileFailed, 'Unable to create profile');
};
