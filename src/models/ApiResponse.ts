export interface ApiResponse<T> {
    data: any;
    errors: ErrorItem[];
}

interface ErrorItem {
    msg: string;
    param?: string;
    location?: string;
}

export const createApiResponse = <T = unknown>(data: any, errors: ErrorItem[] = []): ApiResponse<T> => {
    return {
        data,
        errors,
    };
};
