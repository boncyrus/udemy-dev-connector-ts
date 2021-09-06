import { UserSlim } from './UserSlim';
export interface GetProfileResponse {
    company?: string;
    website?: string;
    skills: Array<string>;
    bio?: string;
    githubUsername?: string;
    profession: string;
    user: UserSlim;
}
