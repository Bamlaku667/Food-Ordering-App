
import { Request, Response, NextFunction } from "express"
import { plainToClass } from "class-transformer"
import { CustomerLoginInputs, CustomerRegisterInputs, EditProfileInputs } from "../dto/Customer.dto"
import { ValidationError, validate } from "class-validator";
import { GeneratePassword, GenerateSalt, GenerateSignature, ValidatePassword } from "../utility";
import { Customer } from "../models/Customer";
import { generateOTP, onRequestOTP } from "../utility/NotificationUtility";
import mongoose from "mongoose";

const CustomerRegister = async (req: Request, res: Response, next: NextFunction) => {
    const newCustomerInstance = plainToClass(CustomerRegisterInputs, req.body);
    // console.log(newCustomerInstance);

    const inputErrors: ValidationError[] = await validate(newCustomerInstance);
    // console.log(inputErrors);
    if (inputErrors.length == 0) {
        const { phone, email, password } = newCustomerInstance;
        // console.log({name, email, password});
        const salt = await GenerateSalt();
        const customerPassword = await GeneratePassword(password, salt);

        //     email: string
        // firstName: string,
        // lastName: string,
        // address: string,
        // phone: string,
        // password: string,
        // salt: string,
        // verified: boolean
        // otp: number
        // otp_expiry: number
        // lat: number
        // lng: number
        const existingCustomer = await Customer.findOne({ email });
        if (existingCustomer !== null) {
            return res.json({ msg: 'customer already exists' });
        }
        const { otp, otpExpiry } = generateOTP();
        const result = await Customer.create({

            email: email,
            firstName: "",
            lastName: "",
            address: '',
            phone: phone,
            password: customerPassword,
            salt: salt,
            verified: false,
            otp: otp,
            otp_expiry: otpExpiry,
            lat: 0,
            lng: 0
        });

        if (result) {

            // await onRequestOTP(otp, phone);

            // generating a signature 
            const tokenData = {
                _id: result._id,
                email: result.email,
                verified: result.verified
            }

            const signature = await GenerateSignature(tokenData)

            res.status(200).json({ signature: signature, verified: result.verified, email, otp })
        }

        // res.status(200).json({ msg: 'customer registered successfully', newCustomerInstance })
    }
    else {
        res.status(400).json({ errors: inputErrors });
    }
}

const CustomerLogin = async (req: Request, res: Response, next: NextFunction) => {
    const newLoginInstance = plainToClass(CustomerLoginInputs, req.body);

    // check for errors 
    const validationOptions = {
        targe: false
    }
    const loginErrors: ValidationError[] = await validate(newLoginInstance)

    if (loginErrors.length > 0) {
        return res.status(400).json(loginErrors);
    }

    const { email, password } = newLoginInstance;

    const customer = await Customer.findOne({ email: email })

    if (customer) {
        // validate password
        const isMatch = await ValidatePassword(customer.password, password, customer.salt)
        if (isMatch) {
            // generate jwt on login 
            const signature = await GenerateSignature({
                _id: customer._id,
                email: customer.email,
                verified: customer.verified
            });

            res.status(200).json({ signature: signature, verified: customer.verified, email: customer.email })

        }
    }
    else {

        res.status(404).json({ msg: `no customer found with email ${email}` })
    }

}



const CustomerVerify = async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body)
    const { otp } = req.body;
    const customer = req.user;
    if (customer) {
        const profile = await Customer.findOne({ _id: new mongoose.Types.ObjectId(customer._id) });
        if (profile && profile?.otp === otp && new Date(profile.otp_expiry) >= new Date()) {
            profile.verified = true

            const updatedCustomer = await profile.save();

            // generate new signature since verified property is updated 

            const signature = await GenerateSignature({
                _id: updatedCustomer._id,
                email: updatedCustomer.email,
                verified: updatedCustomer.verified
            })

            return res.status(200).json({
                signature: signature, verified: updatedCustomer.verified, email: updatedCustomer.email
            })
        }
        else {
            console.log(customer);
            console.log(profile)
            console.log('OTP:', profile?.otp, 'Input OTP:', parseInt(otp));
            console.log('OTP Expiry:', profile?.otp_expiry, 'Current Date:', new Date());
            res.status(400).json({ msg: 'error sign in' });
        }
    }

}

const RequestOtp = async (req: Request, res: Response, next: NextFunction) => {
    const customer = req.user;

    if (customer) {
        const profile = await Customer.findById(customer._id)
        console.log(profile)
        if (profile) {
            const { otp, otpExpiry } = generateOTP();
            profile.otp = otp;
            profile.otp_expiry = otpExpiry;
        }
    }


}

const GetCustomerProfile = async (req: Request, res: Response, next: NextFunction) => {
    const customer = req.user;

    if (customer) {
        const profile = await Customer.findById(customer._id);
        if (profile) {
            return res.status(200).json(profile)
        }
    }

    return res.status(404).json({ msg: 'no customer exist ' })


}

const EditCustomerProfile = async (req: Request, res: Response, next: NextFunction) => {
    const customer = req.user;
    const profileInputs = plainToClass(EditProfileInputs, req.body)
    const editInputValidation: ValidationError[] = await validate(profileInputs)
    if (editInputValidation.length > 0) {
        return res.status(400).json(editInputValidation)
    }
    if (customer) {
        const profile = await Customer.findById(customer._id);
        if (profile) {
            const { firstName, lastName, address } = profileInputs;
            profile.firstName = firstName
            profile.lastName = lastName
            profile.address = address

            const updatedProfile = await profile.save();

            return res.status(200).json(updatedProfile)

        }
    }

}
export { CustomerRegister, CustomerLogin, CustomerVerify, RequestOtp, EditCustomerProfile, GetCustomerProfile }