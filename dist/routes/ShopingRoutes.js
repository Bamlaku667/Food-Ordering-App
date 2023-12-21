"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const router = express_1.default.Router();
exports.ShopingRoutes = router;
// TODO: food availability 
router.route('/:pincode').get(controllers_1.GetFoodAvailability);
// TODO: top restaurants
router.route('/top-restaurants/:pincode').get(controllers_1.GetTopRestaurants);
// TODO: food available in 30 minutes
router.route('/food-in-30-min/:pincode').get(controllers_1.GetFoodIn30Min);
// TODO: search foods
router.route('/search/:pincode').get(controllers_1.SearchFoods);
// TODO: find restaurant by ID
router.route('/restaurant/:id').get(controllers_1.GetRestaurantById);
//# sourceMappingURL=ShopingRoutes.js.map