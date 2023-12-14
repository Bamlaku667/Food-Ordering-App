import express from 'express'
import { CustomerLogin, CustomerRegister } from '../controllers';
const router = express.Router();

//todo customer register 
router.route('/register').post(CustomerRegister)
//todo customer login 
router.route('/login').post(CustomerLogin);
//todo customer verify

//todo 







export { router as CustomerRoutes }