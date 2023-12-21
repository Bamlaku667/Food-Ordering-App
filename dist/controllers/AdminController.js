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
exports.findVandor = exports.Getvandors = exports.GetvandorById = exports.Createvandor = void 0;
const Vandor_1 = require("../models/Vandor");
const utility_1 = require("../utility");
const findVandor = (condition) => __awaiter(void 0, void 0, void 0, function* () {
    const vandor = yield Vandor_1.Vandor.findOne(condition);
    return vandor;
});
exports.findVandor = findVandor;
const Createvandor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, ownerName, foodTypes, pincode, address, phone, email, password, } = req.body;
    const existingVandor = yield findVandor({ email });
    if (existingVandor) {
        return res.json({ msg: `vendor with email ${email} already exists` });
    }
    // generate salt
    const salt = yield (0, utility_1.GenerateSalt)();
    const hashedPassword = yield (0, utility_1.GeneratePassword)(password, salt);
    const createVandor = yield Vandor_1.Vandor.create({
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
});
exports.Createvandor = Createvandor;
const Getvandors = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const vendors = yield Vandor_1.Vandor.find({});
    if (!vendors) {
        return res.json({ msg: "vendors are not available" });
    }
    res.send({ vendors });
});
exports.Getvandors = Getvandors;
const GetvandorById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const vandor = yield findVandor({ _id: id });
    res.send({ vandor });
});
exports.GetvandorById = GetvandorById;
//# sourceMappingURL=AdminController.js.map