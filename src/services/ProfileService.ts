import { ErrorCodes } from '../constants/ErrorCodes';
import { createErrorResponse } from '../models/ServiceResponse';
import { UpsertProfileRequest } from '../models/UpsertProfileRequest';
import { UpsertProfileResponse } from '../models/UpsertProfileResponse';
import { createProfile, getAllProfiles, getProfile, updateProfile } from './../db/repositories/ProfileRepository';
import { GetAllProfilesResponse } from './../models/GetAllProfilesResponse';
import { GetProfileRequest } from './../models/GetProfileRequest';
import { GetProfileResponse } from './../models/GetProfileResponse';
import { Profile } from './../models/Profile';
import { createSuccessResponse } from './../models/ServiceResponse';

export const getUserProfile = async (request: GetProfileRequest) => {
    const profile = await getProfile(request.email);
    if (!profile) {
        return createErrorResponse(ErrorCodes.NoProfileAssociated, 'No profile associated.');
    }

    const user = profile.user as any;
    const response: GetProfileResponse = {
        skills: profile.skills,
        bio: profile.bio,
        company: profile.company,
        githubUsername: profile.githubUsername,
        website: profile.website,
        profession: profile.profession,
        userId: user.id,
    };

    return createSuccessResponse(response);
};

export const upsertUserProfile = async (email: string, request: UpsertProfileRequest) => {
    const currentProfile = await getProfile(email);
    let result: Profile | undefined;

    if (currentProfile) {
        result = await updateProfile(email, {
            profession: request.profession ? request.profession : currentProfile.profession,
            skills: Array.from(new Set([...currentProfile.skills, ...request.skills])),
            company: request.company ? request.company : currentProfile?.company,
            bio: request.bio ? request.bio : currentProfile?.bio,
            githubUsername: request.githubUsername ? request.githubUsername : currentProfile?.githubUsername,
            website: request.website ? request.website : currentProfile?.website,
        });
    } else {
        result = await createProfile(email, request);
    }

    if (result) {
        const userId = result.user as any;

        const response: UpsertProfileResponse = {
            skills: result.skills,
            bio: result?.bio,
            company: result?.company,
            website: result?.website,
            githubUsername: result?.githubUsername,
            profession: result.profession,
            userId: userId,
        };

        return createSuccessResponse(response);
    }

    return createErrorResponse(ErrorCodes.CreateProfileFailed, 'Unable to create profile.');
};

export const getUserProfiles = async () => {
    const profiles = await getAllProfiles();
    let result: GetAllProfilesResponse = {
        profiles: [],
    };

    if (profiles) {
        const items: typeof result.profiles = profiles.map((item) => {
            return {
                profession: item.profession,
                skills: item.skills,
                userId: item.id,
                bio: item?.bio,
                company: item?.company,
                githubUsername: item?.githubUsername,
                website: item?.website,
            };
        });

        result.profiles.push(...items);
        return createSuccessResponse(result);
    } else {
        return createErrorResponse(ErrorCodes.UnableToGetProfiles, 'Unable to load profiles.');
    }
};
