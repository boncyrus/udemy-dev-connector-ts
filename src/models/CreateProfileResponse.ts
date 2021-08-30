export interface CreateProfileResponse {
    userId: any;
    company?: string;
    website?: string;
    skills: Array<string>;
    bio?: string;
    githubUsername?: string;
    occupation?: string;
}
