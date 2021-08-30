export interface UpsertProfileRequest {
    profession: string;
    company?: string;
    website?: string;
    skills: Array<string>;
    bio?: string;
    githubUsername?: string;
}
