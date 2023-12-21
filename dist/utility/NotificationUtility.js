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
exports.generateOTP = exports.onRequestOTP = void 0;
const config_1 = require("../config");
const config_2 = require("../config");
const twilio_1 = __importDefault(require("twilio"));
const generateOTP = () => {
    const otpLength = 6;
    // Generate a random 6-digit number as a string
    const otpString = Math.floor(100000 + Math.random() * 900000).toString();
    // Parse the string as an integer
    const otpNumber = parseInt(otpString, 10);
    // Set OTP expiry to 5 minutes (adjust as needed)
    const otpExpiry = new Date();
    otpExpiry.setMinutes(otpExpiry.getMinutes() + 120);
    return { otp: otpNumber, otpExpiry };
};
exports.generateOTP = generateOTP;
const onRequestOTP = (otp, toPhoneNumber) => __awaiter(void 0, void 0, void 0, function* () {
    // Download the helper library from https://www.twilio.com/docs/node/install
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    const client = (0, twilio_1.default)(config_1.TWILIO_ACCOUNT_SID, config_2.TWILIO_AUTH_TOKEN);
    const response = yield client.messages.create({
        body: `Your otp is ${otp}`,
        from: '251946461157',
        to: toPhoneNumber,
    });
    return response;
});
exports.onRequestOTP = onRequestOTP;
//# sourceMappingURL=NotificationUtility.js.map