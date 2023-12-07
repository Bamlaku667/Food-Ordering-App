import express from 'express';
import { AddFood, GetFoods, GetVandorProfile, UpdateVandorProfile, UpdateVandorService, VandorLogin, } from '../controllers/VandorContoller';
import { auth } from '../middlewares/'
const router = express.Router()

router.route('/login').post(VandorLogin)
router.use(auth);
router.route('/profile').get(GetVandorProfile).patch(UpdateVandorProfile)
router.route('/service').patch(UpdateVandorService);
router.route('/food').post(AddFood).get(GetFoods);
// router.get('/', (req: Request, res: Response, next: NextFunction) => {
//     res.send('vandor routes');
// })

export { router as VandorRoutes }
