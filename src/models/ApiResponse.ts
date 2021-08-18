export interface ApiResponse {
    data: any;
    errors: ErrorItem[];
}

interface ErrorItem {
    msg: string;
    param?: string;
    location?: string;
}

export const createApiResponse = (data: any, errors: ErrorItem[] = []): ApiResponse => {
    return {
        data,
        errors,
    };
};
