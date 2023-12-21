import mongoose, { Schema, Model, Document } from "mongoose";


export interface FoodDoc extends Document {
    VandorId: string
    name: string,
    description: string
    foodType: string,
    readyTime: number
    price: number
    rating: number
    images: [string]
}

const foodSchema = new Schema({
    VandorId: { type: String },
    name: { type: String },
    description: { type: String },
    category: { type: String },
    foodType: { type: String },
    readyTime: { type: Number },
    price: { type: Number },
    rating: { type: Number },
    images: { type: [String] }

}, {
    timestamps: true, toJSON: {
        transform(doc, ret) {
            delete ret.__v,
                delete ret.createdAt,
                delete ret.updatedAt
        }
    }

})

const Food = mongoose.model<FoodDoc>('Food', foodSchema);

export { Food }