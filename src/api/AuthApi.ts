import express, { Request, Response } from 'express';
import JwtMiddleware from '../middlewares/JwtMiddleware';

const router = express.Router();

router.get('/', JwtMiddleware, (req: Request, res: Response) => res.send('Auth'));

export default router;
