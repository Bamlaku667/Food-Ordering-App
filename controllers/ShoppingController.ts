
import { Request, Response } from "express"
import { findVandor } from "./AdminController";
import { Food } from "../models/Food";
import { Vandor } from "../models/Vandor";
const GetFoodAvailability = async (req: Request, res: Response) => {
    const { pincode } = req.params;
    // res.json({pincode});
    const vandor = await Vandor.find({ pincode: pincode, serviceAvailable: true }).sort({ rating: -1 }).populate({ path: "foods", model: Food });
    if (vandor.length > 0) {
        return res.json(vandor);
    }
    return res.json({ msg: 'no food available' });
}

const GetTopRestaurants = async (req: Request, res: Response) => {
    const { pincode } = req.params
    const vandor = await Vandor.find({ pincode: pincode, serviceAvailable: true }).sort({ rating: -1 }).limit(1).lean();
    if (vandor.length > 0) {
        return res.json(vandor);
    }
    return res.json({ msg: 'no data available' });
}

const GetFoodIn30Min = async (req: Request, res: Response) => {

}

const SearchFoods = async (req: Request, res: Response) => {

}

const GetRestaurantById = async (req: Request, res: Response) => {

}

export {
    GetFoodAvailability, GetTopRestaurants, GetFoodIn30Min,
    SearchFoods, GetRestaurantById
}