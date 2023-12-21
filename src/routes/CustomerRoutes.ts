import express from 'express'
import { CustomerLogin, CustomerRegister, CustomerVerify, EditCustomerProfile, GetCustomerProfile, RequestOtp, } from '../controllers';
import { auth } from '../middlewares';
const router = express.Router();

router.route('/register').post(CustomerRegister)

router.route('/login').post(CustomerLogin);

// todo use authentcation middleware for the rest routes 
router.use(auth)

// todo 
router.patch('/verify', CustomerVerify);

router.get('/otp', RequestOtp)

router.route('/profile').get(GetCustomerProfile).patch(EditCustomerProfile)

//todo 







export { router as CustomerRoutes }