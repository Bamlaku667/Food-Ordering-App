import { NextFunction, Request, Response } from "express";
import { CreateVandorInput } from "../dto";
import { Vandor } from "../models/Vandor";
import { AdminRoutes } from "../routes";
import { GeneratePassword, GenerateSalt } from "../utility";

const findVandor = async (condition: any) => {

    const vandor = await Vandor.findOne(condition);
    return vandor

}
const Createvandor = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const {
        name,
        ownerName,
        foodTypes,
        pincode,
        address,
        phone,
        email,
        password,
    } = req.body as CreateVandorInput;

    const existingVandor = await findVandor({ email })
    if (existingVandor) {
        return res.json({ msg: `vendor with email ${email} already exists` })
    }

    // generate salt
    const salt = await GenerateSalt();
    const hashedPassword = await GeneratePassword(password, salt);


    const createVandor = await Vandor.create({
        name,
        ownerName,
        foodTypes,
        pincode,
        address,
        phone,
        email,
        password: hashedPassword,
        salt: salt,
        rating: 0,
        serviceAvailable: false,
        coverImages: []
    });



    res.json({ createVandor });
};

const Getvandors = async (req: Request, res: Response, next: NextFunction) => {
    const vendors = await Vandor.find({});
    if (!vendors) {
        return res.json({ msg: "vendors are not available" })
    }
    res.send({ vendors });
};

const GetvandorById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;
    const vandor = await findVandor({ _id: id });

    res.send({ vandor });
};



export { Createvandor, GetvandorById, Getvandors, findVandor };
