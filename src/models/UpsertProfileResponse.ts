import { UserSlim } from './UserSlim';

export interface UpsertProfileResponse {
    user: UserSlim;
    company?: string;
    website?: string;
    skills: Array<string>;
    bio?: string;
    githubUsername?: string;
    profession: string;
}
