export interface AppConfig {
    jwt: JwtConfig;
    connectionStrings: ConnectionStringsConfig;
}

export interface JwtConfig {
    issuer: string;
    expiresIn: number;
    secret: string;
}

export interface ConnectionStringsConfig {
    mongoUri: string;
}
