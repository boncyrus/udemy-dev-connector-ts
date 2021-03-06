import { ErrorCodes } from './../constants/ErrorCodes';
export const createSuccessResponse = <TResponse = unknown>(data: TResponse): ServiceResponse<TResponse> => {
    return {
        data: data,
    };
};

export const createErrorResponse = (code: ErrorCodes, msg: string): ServiceResponse<null> => {
    return {
        code,
        msg,
        data: null,
    };
};

export interface ServiceResponse<T> {
    code?: ErrorCodes;
    msg?: string;
    data: T;
}
