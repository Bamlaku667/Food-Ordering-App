import { Request, Response, NextFunction } from "express";
import { SignaturePayload } from '../dto';
import { ValidateSignature } from '../utility';

declare global {
    namespace Express {
        interface Request {
            user: SignaturePayload
        }
    }
}

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const payload = await ValidateSignature(req) as SignaturePayload;
        req.user = payload;
        next()
    } catch (error) {
        return res.json({msg: (error as Error).message})
    }

}

export { verifyToken as auth };