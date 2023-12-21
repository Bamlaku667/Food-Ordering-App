import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { TOKEN_EXPIRY, TOKEN_KEY } from '../config';
import { Request, Response } from 'express';
import { AuthPayload } from '../dto';

const GenerateSalt = async () => {
    return await bcrypt.genSalt();
}

const GeneratePassword = async (password: string, salt: string) => {
    return bcrypt.hash(password, salt);
}

const ValidatePassword = async (hashedPassword: string, unHashedPassword: string, salt: string) => {
    return await GeneratePassword(unHashedPassword, salt) == hashedPassword;

}

const GenerateSignature = async (payload: AuthPayload) => {
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
            const payload = jwt.verify(token, TOKEN_KEY) as AuthPayload;
            return payload
        }
        catch (err) {
            throw new Error('Not Authorized')
        }
    }
    throw new Error('No token')
}


export { GenerateSalt, GeneratePassword, ValidatePassword, GenerateSignature, ValidateSignature }