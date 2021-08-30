export interface CreateProfileRequest {
    userId: string;
    company?: string;
    website?: string;
    skills: Array<string>;
    bio?: string;
    githubUsername?: string;
    occupation?: string;
}
