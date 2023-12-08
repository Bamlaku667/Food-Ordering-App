import { Request, Response, NextFunction } from "express";
import { CreateFoodInputs, VandorLoginInputs, VandorUpdateInputs } from "../dto";
import { findVandor } from "./AdminController";
import { GenerateSignature, ValidatePassword } from "../utility";
import { Food } from "../models/Food";


const VandorLogin = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = <VandorLoginInputs>req.body;
    const existingVandor = await findVandor({ email })
    if (existingVandor) {
        //validate password
        const isMatch = await ValidatePassword(existingVandor.password, password, existingVandor.salt);
        if (isMatch) {
            const tokenData = {
                _id: existingVandor._id,
                email: existingVandor.email,
                name: existingVandor.name,
                foodTypes: existingVandor.foodTypes

            }
            const token = await GenerateSignature(tokenData);
            return res.json({ existingVandor, token });
        }
        else {
            return res.json({ msg: 'password not correct' })
        }
    }

    return res.status(400).json({ msg: 'invalid credentials' })

}

const GetVandorProfile = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (user) {
        const existingUser = await findVandor({ _id: user._id });
        return res.json(existingUser);
    }
    res.json({ msg: 'No user profile found' })
}

const UpdateVandorProfile = async (req: Request, res: Response, next: NextFunction) => {
    const { name, address, phone, foodTypes } = req.body as VandorUpdateInputs;
    const user = req.user;
    console.log(user)
    if (user) {
        const existingUser = await findVandor({ _id: user._id })
        if (existingUser) {
            existingUser.name = name;
            existingUser.address = address;
            existingUser.phone = phone;
            existingUser.foodTypes = foodTypes
        }
        await existingUser?.save();
        console.log(existingUser)
        return res.json(existingUser);
    }
    res.json({ msg: 'No user profile found' })
}



const UpdateVandorService = async (req: Request, res: Response, next: NextFunction) => {

    const user = req.user;
    console.log(user)
    if (user) {
        const existingUser = await findVandor({ _id: user._id })
        if (existingUser) {
            existingUser.serviceAvailable = !existingUser.serviceAvailable;
        }
        await existingUser?.save();
        console.log(existingUser)
        return res.json(existingUser);
    }
    res.json({ msg: 'No user profile found' })
}

const AddFood = async (req: Request, res: Response) => {
    const user = req.user;
    if (user) {
        const { name, description, category, foodType, readyTime, price } = req.body as CreateFoodInputs;
        const vandor = await findVandor({ _id: user._id });

        if (vandor) {
            const files  =  req.files as Express.Multer.File[]
            const images = files.map((file: Express.Multer.File) => file.filename);
            const createFood = await Food.create({
                VandorId: vandor._id, images: images, name, description, category, foodType, readyTime, price
            })
            vandor.foods.push(createFood);
            const result = await vandor.save()
            return res.json(result);

        }
    }
    res.json(user);
}

const GetFoods = async (req: Request, res: Response) => {
    const user = req.user;
    if (user) {
        const foods = await Food.find({ VandorId: user._id })
        if (foods) {
            return res.json({foods});
        }
    }
    return res.json({ msg: 'No food found for this user' });

}
export { VandorLogin, GetVandorProfile, UpdateVandorProfile, UpdateVandorService, AddFood, GetFoods };