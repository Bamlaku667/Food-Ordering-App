import { TWILIO_ACCOUNT_SID } from "../config";
import { TWILIO_AUTH_TOKEN } from "../config";
import twilio from 'twilio';

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

const onRequestOTP = async (otp: Number, toPhoneNumber: string) => {
    // Download the helper library from https://www.twilio.com/docs/node/install
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure

    const client = twilio(TWILIO_ACCOUNT_SID,TWILIO_AUTH_TOKEN)

    const response = await client.messages.create({
        body: `Your otp is ${otp}`,
        from: '251946461157',
        to: toPhoneNumber,

    })

    return response;

}

export { onRequestOTP, generateOTP }