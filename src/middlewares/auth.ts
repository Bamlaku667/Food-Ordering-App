import { Request, Response, NextFunction } from "express";
import { ValidateSignature } from '../utility';
import { AuthPayload } from "../dto";

declare global {
    namespace Express {
        interface Request {
            user: AuthPayload
        }
    }
}

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const payload = await ValidateSignature(req) as AuthPayload;
        req.user = payload;
        next()
    } catch (error) {
        return res.json({ msg: (error as Error).message })
    }

}

export { verifyToken as auth };