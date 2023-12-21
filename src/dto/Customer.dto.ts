import { IsEmail, IsEmpty, Length } from "class-validator";
class CustomerRegisterInputs {

    @IsEmail()
    email: string;

    @Length(4, 20)
    phone: string;

    @Length(6, 12)
    password: string

    // constructor() {

    // }
}

interface CustomerPayload {
    _id: string,
    email: string,
    verified: boolean
}

class CustomerLoginInputs {
    @IsEmail()
    email: string;

    @Length(6, 12)
    password: string

}

class EditProfileInputs {
    @Length(3, 20)
    firstName: string;
    @Length(3, 20)
    lastName: string;
    @Length(3, 20)
    address: string

}


export { CustomerRegisterInputs, CustomerPayload, CustomerLoginInputs , EditProfileInputs}