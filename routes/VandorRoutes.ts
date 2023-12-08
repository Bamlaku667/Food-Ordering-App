import express from 'express';
import { AddFood, GetFoods, GetVandorProfile, UpdateVandorProfile, UpdateVandorService, VandorLogin, } from '../controllers/VandorContoller';
import { auth } from '../middlewares/'
import multer from 'multer'

const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    }, 
    filename: (req,file, cb) => {
        cb(null, new Date().toISOString()+ '-' + file.originalname);
    }
})

const images = multer({storage: imageStorage}).array("files", 10);
const router = express.Router()

router.route('/login').post(VandorLogin)
router.use(auth);
router.route('/profile').get(GetVandorProfile).patch(UpdateVandorProfile)
router.route('/service').patch(UpdateVandorService);
router.route('/food').post(images, AddFood)
router.route('/foods').get(GetFoods)
// router.get('/', (req: Request, res: Response, next: NextFunction) => {
//     res.send('vandor routes');
// })

export { router as VandorRoutes }
