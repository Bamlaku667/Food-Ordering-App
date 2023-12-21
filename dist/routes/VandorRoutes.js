"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VandorRoutes = void 0;
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers/");
const middlewares_1 = require("../middlewares/");
const multer_1 = __importDefault(require("multer"));
const imageStorage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + '-' + file.originalname);
    }
});
const images = (0, multer_1.default)({ storage: imageStorage }).array("files", 10);
const router = express_1.default.Router();
exports.VandorRoutes = router;
router.route('/login').post(controllers_1.VandorLogin);
router.use(middlewares_1.auth);
router.route('/profile').get(controllers_1.GetVandorProfile).patch(controllers_1.UpdateVandorProfile);
router.route('/service').patch(controllers_1.UpdateVandorService);
router.route('/food').post(images, controllers_1.AddFood);
router.route('/coverImage').patch(images, controllers_1.updateVendorCoverImages);
router.route('/foods').get(controllers_1.GetFoods);
//# sourceMappingURL=VandorRoutes.js.map