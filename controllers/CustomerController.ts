
import { Request , Response, NextFunction} from "express"

const CustomerRegister = async (req: Request, res: Response, next: NextFunction) => {
    res.send('user signup')
}
const CustomerLogin = async (req: Request, res: Response, next: NextFunction) => {
    res.send('user login')
}

const CustomerVerify = async (req: Request, res: Response, next: NextFunction) => {
    res.send('user login')
}

const RequestOtp = async (req: Request, res: Response, next: NextFunction) => {
    res.send('request otp')
}

const GetCustomerProfile = async (req: Request, res: Response, next: NextFunction) => {
    res.send('get profile')
}

const EditCustomerProfile = async (req: Request, res: Response, next: NextFunction) => {
    res.send('edit profile')
}
export {CustomerRegister, CustomerLogin}