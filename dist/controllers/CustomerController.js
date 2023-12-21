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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCustomerProfile = exports.EditCustomerProfile = exports.RequestOtp = exports.CustomerVerify = exports.CustomerLogin = exports.CustomerRegister = void 0;
const class_transformer_1 = require("class-transformer");
const Customer_dto_1 = require("../dto/Customer.dto");
const class_validator_1 = require("class-validator");
const utility_1 = require("../utility");
const Customer_1 = require("../models/Customer");
const NotificationUtility_1 = require("../utility/NotificationUtility");
const mongoose_1 = __importDefault(require("mongoose"));
const CustomerRegister = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const newCustomerInstance = (0, class_transformer_1.plainToClass)(Customer_dto_1.CustomerRegisterInputs, req.body);
    // console.log(newCustomerInstance);
    const inputErrors = yield (0, class_validator_1.validate)(newCustomerInstance);
    // console.log(inputErrors);
    if (inputErrors.length == 0) {
        const { phone, email, password } = newCustomerInstance;
        // console.log({name, email, password});
        const salt = yield (0, utility_1.GenerateSalt)();
        const customerPassword = yield (0, utility_1.GeneratePassword)(password, salt);
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
        const existingCustomer = yield Customer_1.Customer.findOne({ email });
        if (existingCustomer !== null) {
            return res.json({ msg: 'customer already exists' });
        }
        const { otp, otpExpiry } = (0, NotificationUtility_1.generateOTP)();
        const result = yield Customer_1.Customer.create({
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
            };
            const signature = yield (0, utility_1.GenerateSignature)(tokenData);
            res.status(200).json({ signature: signature, verified: result.verified, email, otp });
        }
        // res.status(200).json({ msg: 'customer registered successfully', newCustomerInstance })
    }
    else {
        res.status(400).json({ errors: inputErrors });
    }
});
exports.CustomerRegister = CustomerRegister;
const CustomerLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const newLoginInstance = (0, class_transformer_1.plainToClass)(Customer_dto_1.CustomerLoginInputs, req.body);
    // check for errors 
    const validationOptions = {
        targe: false
    };
    const loginErrors = yield (0, class_validator_1.validate)(newLoginInstance);
    if (loginErrors.length > 0) {
        return res.status(400).json(loginErrors);
    }
    const { email, password } = newLoginInstance;
    const customer = yield Customer_1.Customer.findOne({ email: email });
    if (customer) {
        // validate password
        const isMatch = yield (0, utility_1.ValidatePassword)(customer.password, password, customer.salt);
        if (isMatch) {
            // generate jwt on login 
            const signature = yield (0, utility_1.GenerateSignature)({
                _id: customer._id,
                email: customer.email,
                verified: customer.verified
            });
            res.status(200).json({ signature: signature, verified: customer.verified, email: customer.email });
        }
    }
    else {
        res.status(404).json({ msg: `no customer found with email ${email}` });
    }
});
exports.CustomerLogin = CustomerLogin;
const CustomerVerify = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const { otp } = req.body;
    const customer = req.user;
    if (customer) {
        const profile = yield Customer_1.Customer.findOne({ _id: new mongoose_1.default.Types.ObjectId(customer._id) });
        if (profile && (profile === null || profile === void 0 ? void 0 : profile.otp) === otp && new Date(profile.otp_expiry) >= new Date()) {
            profile.verified = true;
            const updatedCustomer = yield profile.save();
            // generate new signature since verified property is updated 
            const signature = yield (0, utility_1.GenerateSignature)({
                _id: updatedCustomer._id,
                email: updatedCustomer.email,
                verified: updatedCustomer.verified
            });
            return res.status(200).json({
                signature: signature, verified: updatedCustomer.verified, email: updatedCustomer.email
            });
        }
        else {
            console.log(customer);
            console.log(profile);
            console.log('OTP:', profile === null || profile === void 0 ? void 0 : profile.otp, 'Input OTP:', parseInt(otp));
            console.log('OTP Expiry:', profile === null || profile === void 0 ? void 0 : profile.otp_expiry, 'Current Date:', new Date());
            res.status(400).json({ msg: 'error sign in' });
        }
    }
});
exports.CustomerVerify = CustomerVerify;
const RequestOtp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const customer = req.user;
    if (customer) {
        const profile = yield Customer_1.Customer.findById(customer._id);
        console.log(profile);
        if (profile) {
            const { otp, otpExpiry } = (0, NotificationUtility_1.generateOTP)();
            profile.otp = otp;
            profile.otp_expiry = otpExpiry;
        }
    }
});
exports.RequestOtp = RequestOtp;
const GetCustomerProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const customer = req.user;
    if (customer) {
        const profile = yield Customer_1.Customer.findById(customer._id);
        if (profile) {
            return res.status(200).json(profile);
        }
    }
    return res.status(404).json({ msg: 'no customer exist ' });
});
exports.GetCustomerProfile = GetCustomerProfile;
const EditCustomerProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const customer = req.user;
    const profileInputs = (0, class_transformer_1.plainToClass)(Customer_dto_1.EditProfileInputs, req.body);
    const editInputValidation = yield (0, class_validator_1.validate)(profileInputs);
    if (editInputValidation.length > 0) {
        return res.status(400).json(editInputValidation);
    }
    if (customer) {
        const profile = yield Customer_1.Customer.findById(customer._id);
        if (profile) {
            const { firstName, lastName, address } = profileInputs;
            profile.firstName = firstName;
            profile.lastName = lastName;
            profile.address = address;
            const updatedProfile = yield profile.save();
            return res.status(200).json(updatedProfile);
        }
    }
});
exports.EditCustomerProfile = EditCustomerProfile;
//# sourceMappingURL=CustomerController.js.map