import config from 'config';

export const get = <T>(key: string): T => {
    return config.get<T>(key);
};
