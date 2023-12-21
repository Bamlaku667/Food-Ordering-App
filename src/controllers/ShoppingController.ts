
import { Request, Response } from "express"
import { findVandor } from "./AdminController";
import { Food, FoodDoc } from "../models/Food";
import { Vandor } from "../models/Vandor";

const GetFoodAvailability = async (req: Request, res: Response) => {
    const { pincode } = req.params;
    // res.json({pincode});
    const vandor = await Vandor.find({ pincode: pincode, serviceAvailable: true }).sort({ rating: -1 }).populate({ path: "foods", model: Food });
    if (vandor.length > 0) {
        return res.json(vandor);
    }
    return res.json({ msg: 'no data available' });
}

const GetTopRestaurants = async (req: Request, res: Response) => {
    const { pincode } = req.params
    const vandor = await Vandor.find({ pincode: pincode, serviceAvailable: true }).sort({ rating: -1 }).limit(1);
    if (vandor.length > 0) {
        return res.json(vandor);
    }
    return res.json({ msg: 'no data available' });
}

const GetFoodIn30Min = async (req: Request, res: Response) => {
    const { pincode } = req.params;
    const results = await Vandor.find({ pincode: pincode, serviceAvailable: true }).populate({ path: "foods", model: Food });
    if (results.length > 0) {
        let foodIn30Mins: any = [];
        results.map(vandor => {
            const food = vandor.foods as [FoodDoc]
            foodIn30Mins.push(...food.filter(food => food.readyTime <= 30));
            return res.json(foodIn30Mins);
        })
    } else {
        return res.json({ msg: 'no foods are availabe in 30 minutes' });
    }

}

const SearchFoods = async (req: Request, res: Response) => {
    const { pincode } = req.params;
    const results = await Vandor.find({ pincode: pincode, serviceAvailable: true }).populate({ path: "foods", model: Food })
    if (results.length > 0) {
        let searchedFoods: any = [];
        results.map(vandor => {
            searchedFoods.push(...vandor.foods);
            console.log(searchedFoods);
            return res.json(searchedFoods);
        })
    } else {
        return res.json({ msg: 'No Data available :(' })
    }
}
const GetRestaurantById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await Vandor.findById(id);
    if (result) {
        res.json(result);
    }
    else {
        res.json({ msg: `No restaurant found with id ${id}` })
    }
}

export {
    GetFoodAvailability, GetTopRestaurants, GetFoodIn30Min,
    SearchFoods, GetRestaurantById
}