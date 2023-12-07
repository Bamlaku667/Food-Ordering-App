import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { SignaturePayload } from '../dto';
import { TOKEN_EXPIRY, TOKEN_KEY } from '../config';
import { Request, Response } from 'express';

const GenerateSalt = async () => {
    return await bcrypt.genSalt();
}

const GeneratePassword = async (password: string, salt: string) => {
    return bcrypt.hash(password, salt);
}

const ValidatePassword = async (hashedPassword: string, unHashedPassword: string, salt: string) => {
    return await GeneratePassword(unHashedPassword, salt) == hashedPassword;

}

const GenerateSignature = async (payload: SignaturePayload) => {
    try {
        const token = jwt.sign(payload, TOKEN_KEY, { expiresIn: TOKEN_EXPIRY })
        return token
    } catch (err) {
        throw err;
    }
}

const ValidateSignature = async (req: Request) => {
    const authHeader = req.get('authorization');
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        try {
            const payload = jwt.verify(token, TOKEN_KEY) as SignaturePayload;
            req.user = payload;
            return true;
        }
        catch (err) {
            return false
        }
    }
    return false
}


export { GenerateSalt, GeneratePassword, ValidatePassword, GenerateSignature, ValidateSignature }