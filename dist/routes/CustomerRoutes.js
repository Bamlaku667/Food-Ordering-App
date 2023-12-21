"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerRoutes = void 0;
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const router = express_1.default.Router();
exports.CustomerRoutes = router;
router.route('/register').post(controllers_1.CustomerRegister);
router.route('/login').post(controllers_1.CustomerLogin);
// todo use authentcation middleware for the rest routes 
router.use(middlewares_1.auth);
// todo 
router.patch('/verify', controllers_1.CustomerVerify);
router.get('/otp', controllers_1.RequestOtp);
router.route('/profile').get(controllers_1.GetCustomerProfile).patch(controllers_1.EditCustomerProfile);
//# sourceMappingURL=CustomerRoutes.js.map