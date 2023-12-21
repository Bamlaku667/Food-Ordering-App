import mongoose, { Schema, Model, Document } from 'mongoose';

interface CustomeDoc extends Document {
    email: string
    firstName: string,
    lastName: string,
    address: string,
    phone: string,
    password: string,
    salt: string,
    verified: boolean
    otp: number
    otp_expiry: Date
    lat: number
    lng: number
}

const customerSchema = new Schema({
    email: {type: String, required: true},
    firstName: {type: String},
    lastName: {type: String},
    address: {type: String, },
    phone: {type: String,  required: true},
    password: {type: String},
    salt: {type: String,  required: true},
    verified: {type: Boolean,  required: true},
    otp: {type: Number,  required: true},
    otp_expiry: {type: Date,  required: true},
    lat: {type: Number},
    lng: {type: Number}
}, {
    timestamps: true, toJSON: {
        transform(doc, ret) {
            delete ret.password,
                delete ret.salt,
                delete ret.createdAt,
                delete ret.updatedAt,
                delete ret.__v

        }
    }
})


const Customer = mongoose.model<CustomeDoc>('Customer', customerSchema);
export { Customer };