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
exports.updateVendorCoverImages = exports.GetFoods = exports.AddFood = exports.UpdateVandorService = exports.UpdateVandorProfile = exports.GetVandorProfile = exports.VandorLogin = void 0;
const AdminController_1 = require("./AdminController");
const utility_1 = require("../utility");
const Food_1 = require("../models/Food");
const VandorLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const existingVandor = yield (0, AdminController_1.findVandor)({ email });
    if (existingVandor) {
        //validate password
        const isMatch = yield (0, utility_1.ValidatePassword)(existingVandor.password, password, existingVandor.salt);
        if (isMatch) {
            const tokenData = {
                _id: existingVandor._id,
                email: existingVandor.email,
                name: existingVandor.name,
                foodTypes: existingVandor.foodTypes
            };
            const token = yield (0, utility_1.GenerateSignature)(tokenData);
            return res.json({ existingVandor, token });
        }
        else {
            return res.json({ msg: 'password not correct' });
        }
    }
    return res.status(400).json({ msg: 'invalid credentials' });
});
exports.VandorLogin = VandorLogin;
const GetVandorProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (user) {
        const vandor = yield (0, AdminController_1.findVandor)({ _id: user._id });
        return res.json(vandor);
    }
    res.json({ msg: 'No user profile found' });
});
exports.GetVandorProfile = GetVandorProfile;
const UpdateVandorProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, address, phone, foodTypes } = req.body;
    const user = req.user;
    if (user) {
        const vandor = yield (0, AdminController_1.findVandor)({ _id: user._id });
        if (vandor) {
            vandor.name = name;
            vandor.address = address;
            vandor.phone = phone;
            vandor.foodTypes = foodTypes;
        }
        yield (vandor === null || vandor === void 0 ? void 0 : vandor.save());
        return res.json(vandor);
    }
    res.json({ msg: 'No user profile found' });
});
exports.UpdateVandorProfile = UpdateVandorProfile;
const updateVendorCoverImages = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (user) {
        const vandor = yield (0, AdminController_1.findVandor)({ _id: user._id });
        if (vandor) {
            const files = req.files;
            const images = files.map((file) => file.filename);
            vandor.coverImages.push(...images);
            const result = yield vandor.save();
            return res.json(result);
        }
    }
});
exports.updateVendorCoverImages = updateVendorCoverImages;
const UpdateVandorService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (user) {
        const existingUser = yield (0, AdminController_1.findVandor)({ _id: user._id });
        if (existingUser) {
            existingUser.serviceAvailable = !existingUser.serviceAvailable;
        }
        yield (existingUser === null || existingUser === void 0 ? void 0 : existingUser.save());
        return res.json(existingUser);
    }
    res.json({ msg: 'No user profile found' });
});
exports.UpdateVandorService = UpdateVandorService;
const AddFood = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (user) {
        const { name, description, category, foodType, readyTime, price } = req.body;
        const vandor = yield (0, AdminController_1.findVandor)({ _id: user._id });
        if (vandor) {
            const files = req.files;
            const images = files.map((file) => file.filename);
            const createFood = yield Food_1.Food.create({
                VandorId: vandor._id, images: images, name, description, category, foodType, readyTime, price
            });
            vandor.foods.push(createFood);
            const result = yield vandor.save();
            return res.json(result);
        }
    }
    return res.json(user);
});
exports.AddFood = AddFood;
const GetFoods = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (user) {
        const foods = yield Food_1.Food.find({ VandorId: user._id });
        if (foods) {
            return res.json({ foods });
        }
    }
    return res.json({ msg: 'No food found for this user' });
});
exports.GetFoods = GetFoods;
//# sourceMappingURL=VandorContoller.js.map