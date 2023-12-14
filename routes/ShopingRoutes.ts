import express from 'express';
import { GetFoodAvailability, GetFoodIn30Min, GetRestaurantById, GetTopRestaurants, SearchFoods } from '../controllers';

const router = express.Router();

// TODO: food availability 
router.route('/:pincode').get(GetFoodAvailability);

// TODO: top restaurants
router.route('/top-restaurants/:pincode').get(GetTopRestaurants);


// TODO: food available in 30 minutes
router.route('/food-in-30-min/:pincode').get(GetFoodIn30Min);


// TODO: search foods
router.route('/search/:pincode').get(SearchFoods)

// TODO: find restaurant by ID
router.route('/restaurant/:id').get(GetRestaurantById);
export { router as ShopingRoutes }