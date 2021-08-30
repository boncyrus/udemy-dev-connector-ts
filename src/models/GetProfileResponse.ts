import { User } from './User';

export interface GetProfileResponse {
    user: User;
    company?: string;
    website?: string;
    skills: Array<string>;
    bio?: string;
    githubUsername?: string;
    occupation?: string;
}
