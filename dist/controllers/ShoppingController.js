"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetRestaurantById = exports.SearchFoods = exports.GetFoodIn30Min = exports.GetTopRestaurants = exports.GetFoodAvailability = void 0;
const Food_1 = require("../models/Food");
const Vandor_1 = require("../models/Vandor");
const GetFoodAvailability = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pincode } = req.params;
    // res.json({pincode});
    const vandor = yield Vandor_1.Vandor.find({ pincode: pincode, serviceAvailable: true }).sort({ rating: -1 }).populate({ path: "foods", model: Food_1.Food });
    if (vandor.length > 0) {
        return res.json(vandor);
    }
    return res.json({ msg: 'no data available' });
});
exports.GetFoodAvailability = GetFoodAvailability;
const GetTopRestaurants = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pincode } = req.params;
    const vandor = yield Vandor_1.Vandor.find({ pincode: pincode, serviceAvailable: true }).sort({ rating: -1 }).limit(1);
    if (vandor.length > 0) {
        return res.json(vandor);
    }
    return res.json({ msg: 'no data available' });
});
exports.GetTopRestaurants = GetTopRestaurants;
const GetFoodIn30Min = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pincode } = req.params;
    const results = yield Vandor_1.Vandor.find({ pincode: pincode, serviceAvailable: true }).populate({ path: "foods", model: Food_1.Food });
    if (results.length > 0) {
        let foodIn30Mins = [];
        results.map(vandor => {
            const food = vandor.foods;
            foodIn30Mins.push(...food.filter(food => food.readyTime <= 30));
            return res.json(foodIn30Mins);
        });
    }
    else {
        return res.json({ msg: 'no foods are availabe in 30 minutes' });
    }
});
exports.GetFoodIn30Min = GetFoodIn30Min;
const SearchFoods = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pincode } = req.params;
    const results = yield Vandor_1.Vandor.find({ pincode: pincode, serviceAvailable: true }).populate({ path: "foods", model: Food_1.Food });
    if (results.length > 0) {
        let searchedFoods = [];
        results.map(vandor => {
            searchedFoods.push(...vandor.foods);
            console.log(searchedFoods);
            return res.json(searchedFoods);
        });
    }
    else {
        return res.json({ msg: 'No Data available :(' });
    }
});
exports.SearchFoods = SearchFoods;
const GetRestaurantById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield Vandor_1.Vandor.findById(id);
    if (result) {
        res.json(result);
    }
    else {
        res.json({ msg: `No restaurant found with id ${id}` });
    }
});
exports.GetRestaurantById = GetRestaurantById;
//# sourceMappingURL=ShoppingController.js.map