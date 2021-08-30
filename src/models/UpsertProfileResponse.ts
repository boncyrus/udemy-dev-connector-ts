export interface UpsertProfileResponse {
    userId: any;
    company?: string;
    website?: string;
    skills: Array<string>;
    bio?: string;
    githubUsername?: string;
    profession: string;
}
