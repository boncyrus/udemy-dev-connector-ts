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
        user: {
            id: user.id,
            name: user.name,
            avatar: user.avatar,
        },
    };

    return createSuccessResponse(response);
};

export const upsertUserProfile = async (email: string, request: UpsertProfileRequest) => {
    const currentProfile = await getProfile(email);
    let result: Profile | undefined;

    if (currentProfile) {
        result = await updateProfile(email, {
            profession: request.profession,
            skills: Array.from(new Set([...currentProfile.skills, ...request.skills])),
            company: request?.company || undefined,
            bio: request?.bio || undefined,
            githubUsername: request?.githubUsername || undefined,
            website: request?.website || undefined,
        });
    } else {
        result = await createProfile(email, request);
    }

    if (result) {
        const user = result?.user as any;
        const response: UpsertProfileResponse = {
            skills: result.skills,
            bio: result?.bio || undefined,
            company: result?.company || undefined,
            website: result?.website || undefined,
            githubUsername: result?.githubUsername || undefined,
            profession: result.profession,
            user: {
                id: user.id,
                name: user.name,
                avatar: user.avatar as string,
            },
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
            const user = item.user as any;
            return {
                profession: item.profession,
                skills: item.skills,
                bio: item?.bio || undefined,
                company: item?.company || undefined,
                githubUsername: item?.githubUsername || undefined,
                website: item?.website || undefined,
                user: {
                    id: user.id,
                    name: user.name,
                    avatar: user.avatar as string,
                },
            };
        });

        result.profiles.push(...items);
        return createSuccessResponse(result);
    } else {
        return createErrorResponse(ErrorCodes.UnableToGetProfiles, 'Unable to load profiles.');
    }
};
