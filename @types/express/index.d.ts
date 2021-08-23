import { AuthenticatedUser } from './../../src/models/AuthenticatedUser';

declare global {
    namespace Express {
        interface Request {
            user: AuthenticatedUser;
        }
    }
}
