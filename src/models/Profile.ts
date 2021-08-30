import { User } from './User';

export interface Profile {
    user: User;
    profession: string;
    skills: Array<string>;
    company?: string;
    website?: string;
    bio?: string;
    githubUsername?: string;
}
