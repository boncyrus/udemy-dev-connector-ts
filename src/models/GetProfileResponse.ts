import { User } from './User';

export interface GetProfileResponse {
    userId: any;
    company?: string;
    website?: string;
    skills: Array<string>;
    bio?: string;
    githubUsername?: string;
    profession: string;
}
