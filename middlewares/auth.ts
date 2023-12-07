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
    const isValid = await ValidateSignature(req);
    if (isValid) {
        next();
    }
    else {
        return res.json({ msg: 'Not authorized' });
    }
}

export { verifyToken as auth };